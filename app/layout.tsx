import type { Metadata } from 'next';
import './globals.css';
import AuthTokenBridge from '@/components/AuthTokenBridge';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'GATE BT Personal Tutor',
  description:
    'AI-powered learning platform for Biotechnology students — master GATE BT, college exams and competitive exams from basics to GATE level.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthTokenBridge />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
