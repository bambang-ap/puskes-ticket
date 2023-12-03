import {AppRouter} from '@appTypes/app.type';
import {queryClientConfig} from '@constants';
import {httpLink} from '@trpc/client';
import {createTRPCNext} from '@trpc/next';

function getBaseUrl() {
	if (typeof window !== 'undefined')
		// browser should use relative path
		return '';

	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}`;

	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
	/**
	 * @link https://trpc.io/docs/ssr
	 **/
	ssr: false,
	config() {
		return {
			abortOnUnmount: true,
			queryClientConfig: {
				defaultOptions: {
					queries: queryClientConfig,
				},
			},
			links: [
				// httpBatchLink({
				httpLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/api`,
					// maxURLLength: 10,
				}),
			],
		};
	},
});
