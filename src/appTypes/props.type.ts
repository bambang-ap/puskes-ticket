import {ReactNode} from 'react';

import {NextPage} from 'next';
import {AppProps} from 'next/app';
import {FieldValues, UseFormReturn} from 'react-hook-form';

export type ErrorMessage = {message: string};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactNode) => ReactNode;
	authPage?: (page: ReactNode) => ReactNode;
};

export type FormProps<
	T extends FieldValues,
	K extends keyof UseFormReturn<T> = 'control',
> = Pick<UseFormReturn<T>, K>;
