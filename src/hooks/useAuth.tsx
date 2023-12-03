import {useSession as useSessionNext} from 'next-auth/react';

import {TSession} from '@appTypes/app.zod';

export const useAuth = () => {
	// const {replace} = useRouter();
	// const {status, data} = useSession();
	// useEffect(() => {
	// 	if (status === 'unauthenticated') replace('/404');
	// }, [status, data]);

	console.log('auth loaded');
};

export const useSession = () => {
	const {status, data} = useSessionNext() ?? {};

	return {status, data: data as TSession} as const;
};
