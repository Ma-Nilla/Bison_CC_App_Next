import './globals.css';
import type { Metadata } from 'next';
import { ReactNode, useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Bison Car Care',
  description: 'Subscription car wash service with admin dashboard and crew app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Register the service worker for PWA functionality
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch((err) => {
        console.warn('Service worker registration failed', err);
      });
    }
  }, []);
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Simple header navigation */}
        <header className="bg-brand flex items-center p-4 text-white">
          <nav className="flex-1 flex items-center space-x-8">
            <a href="/" className="text-lg font-semibold">Bison Car Care</a>
            <a href="/#services" className="hover:text-brand-light">Services</a>
            <a href="/#pricing" className="hover:text-brand-light">Pricing</a>
            <a href="/#contact" className="hover:text-brand-light">Contact</a>
          </nav>
          <nav className="flex space-x-4">
            <a href="/admin" className="bg-brand-light px-3 py-1 rounded text-brand-dark font-semibold">Admin</a>
            <a href="/crew" className="bg-brand-light px-3 py-1 rounded text-brand-dark font-semibold">Crew</a>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-brand p-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Bison Car Care. All rights reserved.
        </footer>
      </body>
    </html>
  );
}