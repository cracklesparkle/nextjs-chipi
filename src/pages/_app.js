import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import {useState} from "react";
import TimeAgo from 'javascript-time-ago'

import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(ru);

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
  //return <Component {...pageProps} />
}

export default MyApp
