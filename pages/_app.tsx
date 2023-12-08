'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@total-typescript/ts-reset';
import 'global-methods';
import 'moment/locale/id';
import './globals.css';

import {ReactElement, ReactNode, StrictMode, Suspense} from 'react';

import {CacheProvider, EmotionCache} from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import type {NextPage} from 'next';
import {SessionProvider} from 'next-auth/react';
import type {AppProps as NextAppProps} from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import {ReactQueryDevtools} from 'node_modules/@tanstack/react-query-devtools/build/lib/devtools';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

import {SidebarProvider} from '@app/contexts/SidebarContext';
import ThemeProvider from '@app/theme/ThemeProvider';
import {AppDefault, isProd, queryClientConfig} from '@constants';
import {createEmotionCache} from '@hoc';
import {trpc} from '@utils/trpc';

const queryClient = new QueryClient({
	defaultOptions: {queries: queryClientConfig},
});

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

interface AppProps extends NextAppProps {
	emotionCache?: EmotionCache;
	Component: NextPageWithLayout;
}

function App(props: AppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps: {session, ...pageProps},
	} = props;
	// @ts-ignore
	const getLayout = Component.getLayout ?? (page => page);

	Router.events.on('routeChangeStart', nProgress.start);
	Router.events.on('routeChangeError', nProgress.done);
	Router.events.on('routeChangeComplete', nProgress.done);

	return (
		<Suspense>
			<StrictMode>
				<CacheProvider value={emotionCache}>
					<Head>
						<title>{AppDefault.title}</title>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1, shrink-to-fit=no"
						/>
					</Head>

					<SidebarProvider>
						<ThemeProvider>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<CssBaseline />
								<QueryClientProvider client={queryClient}>
									{!isProd && <ReactQueryDevtools />}
									<SessionProvider
										session={session}
										refetchInterval={30000}
										refetchWhenOffline={false}
										refetchOnWindowFocus={false}>
										{getLayout(<Component {...pageProps} />)}
									</SessionProvider>
								</QueryClientProvider>
							</LocalizationProvider>
						</ThemeProvider>
					</SidebarProvider>
				</CacheProvider>
			</StrictMode>
		</Suspense>
	);
}

export default trpc.withTRPC(App);
