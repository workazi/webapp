import { defineConfig, createServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generatePrivacyPolicyPlugin() {
  return {
    name: 'generate-privacy-policy-html',
    closeBundle: {
      sequential: true,
      order: 'post',
      async handler() {
        const outDir = path.resolve(__dirname, 'dist');
        const assetsDir = path.join(outDir, 'assets');

        // 1. Render PrivacyPolicyContent to static HTML string using Vite SSR server
        const server = await createServer({
          configFile: false,
          plugins: [react()],
          optimizeDeps: { noDiscovery: true },
          server: { middlewareMode: true },
          appType: 'custom'
        });

        let privacyPolicyBody = '';
        try {
          const mod = await server.ssrLoadModule('./src/components/PrivacyPolicyContent.jsx');
          const PrivacyPolicyComponent = mod.default;
          privacyPolicyBody = renderToStaticMarkup(React.createElement(PrivacyPolicyComponent));
        } catch (err) {
          console.error('Error rendering PrivacyPolicyContent during build:', err);
          throw err;
        } finally {
          await server.close();
        }

        // 2. Find built CSS file in dist/assets
        let cssPath = '/assets/index.css';
        try {
          const files = await fs.readdir(assetsDir);
          const cssFile = files.find(f => f.endsWith('.css'));
          if (cssFile) {
            cssPath = `/assets/${cssFile}`;
          }
        } catch (e) {
          console.warn('Could not list assets directory for CSS file link, using fallback path.');
        }

        // 3. Construct standalone valid static HTML document
        const fullHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Privacy Policy - Workazi</title>
    <link rel="icon" type="image/png" href="/assets/logo.png" />
    <link rel="stylesheet" href="${cssPath}" />
  </head>
  <body class="bg-white text-slate-800 font-sans min-h-screen flex flex-col justify-between">
    <header class="border-b border-slate-200 bg-white px-6 py-6 sm:px-10 lg:px-16 shadow-xs">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="text-2xl font-extrabold text-slate-900 tracking-tight">
          work<span class="text-green-500">azi</span>
        </a>
        <h1 class="text-lg font-bold text-slate-700">Privacy Policy</h1>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full grow text-slate-700 leading-relaxed text-sm space-y-8">
      ${privacyPolicyBody}
    </main>

    <footer class="border-t border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
      <p>Copyright © Workazi. All rights reserved.</p>
    </footer>
  </body>
</html>
`;

        // 4. Write dist/privacy-policy.html
        await fs.writeFile(path.join(outDir, 'privacy-policy.html'), fullHtml, 'utf-8');
        console.log('✓ Successfully generated static dist/privacy-policy.html');
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), generatePrivacyPolicyPlugin()],
})
