import {Breakpoint, TextFieldProps} from '@mui/material';
import {QueryObserverOptions} from '@tanstack/react-query';

import {PaperSize} from '@appTypes/app.type';
import {SelectPropsData} from '@components';
import {Gender} from '@enum';
import {TRPCClientError} from '@trpc/client';
import {AppRouter} from '@trpc/routers';

import manifest from '../../public/manifest.json';

export {manifest};

export const defaultLimit = 10;

export const paperA4: PaperSize = [210, 297];

export const dataPerPageSelection: SelectPropsData<number>[] = [
	{value: 5},
	{value: 10},
	{value: 20},
	{value: 30},
	{value: 50},
];

export const SidebarCollapseOn: Breakpoint = 'sm';
export const isProd = process.env.NODE_ENV === 'production';

export const defaultTextFieldProps: TextFieldProps = {
	InputLabelProps: {shrink: true, sx: {paddingBottom: 1}},
	variant: 'outlined',
};

export const decimalValue = 2;
export const decimalRegex = new RegExp(
	`^(0|[1-9]\\d*)(\\.\\d{1,${decimalValue}})?$`,
);

export const formatDate = 'YYYY-MM-DD';
export const formatHour = 'HH:mm:ss';
export const formatFull = `${formatDate} - ${formatHour}`;

export const formatDateView = 'DD/MM/YYYY';
export const formatDateStringView = 'D MMMM YYYY';
export const formatFullView = `${formatDateView} - ${formatHour}`;

export const SelectionGender: SelectPropsData<Gender>[] = [
	{value: Gender.Male},
	{value: Gender.Female},
];

export const queryClientConfig: QueryObserverOptions = {
	refetchIntervalInBackground: false,
	refetchOnMount: true,
	refetchOnWindowFocus: true,
	refetchInterval: 1000 * 5 * 60,
	retry: 1,
};

export const nonRequiredRefetch: any = {
	refetchOnMount: false,
	refetchOnWindowFocus: false,
	refetchOnReconnect: false,
} as QueryObserverOptions;

export const defaultErrorMutation: {onError: any} = {
	onError: (err: TRPCClientError<AppRouter>) => {
		try {
			JSON.parse(err?.message);
			alert(
				'Mohon periksa kembali data yang Anda isi atau kolom yang belum terisi',
			);
		} catch (e) {
			alert(err?.message);
		}
	},
};

export const AppDefault = {
	title: 'Penjualan',
} as const;
