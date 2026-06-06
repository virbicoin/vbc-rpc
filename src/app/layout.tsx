import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VirBiCoin Node Information',
  description: 'VirBiCoin VBC Cryptocurrency Node Status Dashboard',
};

const currentYear = new Date().getFullYear();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-screen-lg flex-1 px-4 py-6">{children}</main>
            <footer className="footer-border mt-auto w-full">
              <div className="mx-auto max-w-screen-lg px-4 py-6 text-center">
                <p className="footer-text text-sm">
                  &copy; 2024-{currentYear} VirBiCoin Foundation. All Rights Reserved.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
