import './globals.css';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/fraunces';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Aarna Study | Grade 7 Learning',
  description: 'Aarna Study: Grade 7 practice, assignments, assessments, quizzes, spelling, and progress.',
  icons: { icon: '/aarna-muse.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
