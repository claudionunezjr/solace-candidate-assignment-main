import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    description: 'Show us what you got',
    title: 'Solace: Candidate Assignment'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="max-w-[1200px] mx-auto p-4">{children}</main>
            </body>
        </html>
    );
}
