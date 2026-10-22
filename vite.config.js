import { defineConfig, createServer, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateStaticPagesPlugin() {
  return {
    name: 'generate-static-pages-html',
    closeBundle: {
      sequential: true,
      order: 'post',
      async handler() {
        const outDir = path.resolve(__dirname, 'dist');
        const assetsDir = path.join(outDir, 'assets');

        // 1. Initialize Vite SSR server to render React components to static markup
        const server = await createServer({
          configFile: false,
          plugins: [react()],
          optimizeDeps: { noDiscovery: true },
          server: { middlewareMode: true },
          appType: 'custom'
        });

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

        // Helper to write static HTML file at multiple path aliases (.html and /index.html)
        async function emitStaticHtmlPage(filenameAliases, title, bodyHtml) {
          const fullHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="icon" type="image/png" href="/assets/logo.png" />
    <link rel="stylesheet" href="${cssPath}" />
  </head>
  <body class="bg-white text-slate-800 font-sans min-h-screen flex flex-col justify-between">
    <header class="border-b border-slate-200 bg-white px-6 py-6 sm:px-10 lg:px-16 shadow-xs">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="text-2xl font-extrabold text-slate-900 tracking-tight">
          work<span class="text-green-500">azi</span>
        </a>
        <h1 class="text-lg font-bold text-slate-700">${title}</h1>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-12 w-full grow text-slate-700 leading-relaxed text-sm space-y-8">
      ${bodyHtml}
    </main>

    <footer class="border-t border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
      <p>Copyright © Workazi. All rights reserved.</p>
    </footer>
  </body>
</html>
`;

          for (const alias of filenameAliases) {
            if (alias.endsWith('.html')) {
              await fs.writeFile(path.join(outDir, alias), fullHtml, 'utf-8');
            } else {
              const folder = path.join(outDir, alias);
              await fs.mkdir(folder, { recursive: true });
              await fs.writeFile(path.join(folder, 'index.html'), fullHtml, 'utf-8');
            }
          }
        }

        try {
          // --- A. Generate Privacy Policy Static HTML Pages ---
          const privacyMod = await server.ssrLoadModule('./src/components/PrivacyPolicyContent.jsx');
          const privacyBody = renderToStaticMarkup(React.createElement(privacyMod.default));
          await emitStaticHtmlPage(
            ['privacy-policy.html', 'privacy-policy', 'privacy-policy-2.html', 'privacy-policy-2'],
            'Privacy Policy',
            privacyBody
          );
          console.log('✓ Successfully generated static Privacy Policy pages');

          // --- B. Generate Account Deletion Static HTML Pages ---
          const deletionMod = await server.ssrLoadModule('./src/components/AccountDeletionContent.jsx');
          const deletionBody = renderToStaticMarkup(React.createElement(deletionMod.default));
          await emitStaticHtmlPage(
            [
              'request-account-deletion.html',
              'request-account-deletion',
              'delete-account.html',
              'delete-account',
              'account-deletion.html',
              'account-deletion'
            ],
            'Request Workazi Account Deletion',
            deletionBody
          );
          console.log('✓ Successfully generated static Account Deletion pages');

          // --- C. Generate Static 404 Not Found Page ---
          const notFoundHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 Page Not Found - Workazi</title>
    <link rel="icon" type="image/png" href="/assets/logo.png" />
    <link rel="stylesheet" href="${cssPath}" />
  </head>
  <body class="bg-white text-slate-800 font-sans min-h-screen flex flex-col justify-between">
    <header class="border-b border-slate-200 bg-white px-6 py-6 sm:px-10 lg:px-16 shadow-xs">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="text-2xl font-extrabold text-slate-900 tracking-tight">
          work<span class="text-green-500">azi</span>
        </a>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 py-20 w-full grow text-center flex flex-col items-center justify-center space-y-6">
      <div class="inline-block bg-emerald-100 text-emerald-800 text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
        Error 404
      </div>
      
      <h1 class="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
        Page Not Found
      </h1>

      <p class="text-slate-600 max-w-lg text-base leading-relaxed">
        Sorry, the page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>

      <div class="pt-4 flex flex-wrap justify-center gap-4">
        <a href="/" class="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md text-sm">
          Back to Home
        </a>
        <a href="/privacy-policy" class="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all border border-slate-300 text-sm">
          Privacy Policy
        </a>
        <a href="/request-account-deletion" class="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all border border-slate-300 text-sm">
          Account Deletion
        </a>
      </div>
    </main>

    <footer class="border-t border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
      <p>Copyright © Workazi. All rights reserved.</p>
    </footer>
  </body>
</html>
`;
          await fs.writeFile(path.join(outDir, '404.html'), notFoundHtml, 'utf-8');
          console.log('✓ Successfully generated static dist/404.html');

        } catch (err) {
          console.error('Error rendering static pages during build:', err);
          throw err;
        } finally {
          await server.close();
        }
      }
    }
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), generateStaticPagesPlugin()],
})
