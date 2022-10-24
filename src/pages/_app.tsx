// src/pages/_app.tsx
import '../styles/globals.css';
import '../styles/animations.css';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => (
  <ThemeProvider attribute="class">
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </ThemeProvider>
);

export default trpc.withTRPC(MyApp);
