import {useForm} from 'react-hook-form';

import {TableFormValue} from '@appTypes/app.zod';
import {defaultLimit} from '@constants';

export function useTableFilter(defaultValue?: Partial<TableFormValue>) {
	const defaultValues = {
		limit: defaultLimit,
		page: 1,
		pageTotal: 1,
		search: '',
		...defaultValue,
	};

	const hookForm = useForm<TableFormValue>({defaultValues});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {pageTotal, ...formValue} = hookForm.watch();

	return {hookForm, formValue};
}
