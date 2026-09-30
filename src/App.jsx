import { 
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
 } from "react-router-dom"
import { Suspense, lazy } from "react"
import { AuthProvider } from "./context/AuthContext"
import RootErrorBoundary from "./components/RootErrorBoundary"

// Helper function to handle dynamic import chunk failures after new deployments
function lazyWithRetry(componentImport) {
  return lazy(async () => {
    const pageHasBeenReloaded = JSON.parse(
      window.sessionStorage.getItem('page_reloaded_for_chunk_error') || 'false'
    );

    try {
      const component = await componentImport();
      window.sessionStorage.setItem('page_reloaded_for_chunk_error', 'false');
      return component;
    } catch (error) {
      if (!pageHasBeenReloaded) {
        window.sessionStorage.setItem('page_reloaded_for_chunk_error', 'true');
        window.location.reload();
        return new Promise(() => {}); // Wait for browser to reload
      }
      throw error;
    }
  });
}

const HomePage = lazyWithRetry(() => import("./pages/HomePage"))
const Contact = lazyWithRetry(() => import("./pages/Contact"))
const About = lazyWithRetry(() => import("./pages/About"))
const Registation = lazyWithRetry(() => import('./pages/Registation'))
const WorkaziLegal = lazyWithRetry(() => import('./pages/WorkaziLegal'))
const AccountDeletion = lazyWithRetry(() => import('./pages/AccountDeletion'))
const NotFound = lazyWithRetry(() => import('./pages/NotFound'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<RootErrorBoundary />}>
      <Route index element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><HomePage /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><Contact /></Suspense>} />
      <Route path="/about" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><About /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><Registation /></Suspense>} />
      
      {/* Privacy Policy routes */}
      <Route path="/privacy-policy" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><WorkaziLegal /></Suspense>} />
      <Route path="/privacy-policy.html" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><WorkaziLegal /></Suspense>} />
      <Route path="/privacy-policy-2" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><WorkaziLegal /></Suspense>} />
      <Route path="/privacy-policy-2.html" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><WorkaziLegal /></Suspense>} />

      {/* Account Deletion routes (supporting all common URL variations) */}
      <Route path="/request-account-deletion" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><AccountDeletion /></Suspense>} />
      <Route path="/request-account-deletion.html" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><AccountDeletion /></Suspense>} />
      <Route path="/delete-account" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><AccountDeletion /></Suspense>} />
      <Route path="/delete-account.html" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><AccountDeletion /></Suspense>} />
      <Route path="/account-deletion" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><AccountDeletion /></Suspense>} />
      <Route path="/account-deletion.html" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><AccountDeletion /></Suspense>} />

      {/* 404 Catch-all route */}
      <Route path="*" element={<Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}><NotFound /></Suspense>} />
    </Route>
  )
)

function App() {
  return (
    <div className="font-poppins">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  )
}

export default App
