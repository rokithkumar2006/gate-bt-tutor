import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
