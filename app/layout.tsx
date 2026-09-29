import './globals.css';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/fraunces';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aarna Study | Grade 7 Learning',
  description: 'Aarna Study: Grade 7 practice, assignments, assessments, quizzes, spelling, and progress.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
