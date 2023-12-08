import {useEffect} from 'react';

import {Pagination} from '@mui/material';
import {useForm, UseFormReturn} from 'react-hook-form';

import {PagingResult} from '@appTypes/app.type';
import {TableFormValue} from '@appTypes/app.zod';
import {
	Button,
	Cells,
	Icon,
	Input,
	Select,
	Table,
	TableProps,
} from '@components';
import {dataPerPageSelection} from '@constants';
import {sFilterExpand, sIsMobile} from '@signal';
import {classNames} from '@utils';

export type TableFilterProps<T> = Omit<
	TableProps<T, Cells>,
	'bottomComponent' | 'data'
> & {
	data?: PagingResult<T>;
	form: UseFormReturn<TableFormValue>;
	disableSearch?: boolean;
};

export function TableFilter<T>({
	data,
	form,
	className,
	topComponent,
	disableSearch,
	...props
}: TableFilterProps<T>) {
	const isMobile = sIsMobile.value;
	const expanded = sFilterExpand.value;

	const {control, watch, reset: resetForm} = form;
	const {rows = [], totalPage: pageCount = 1, page = 1} = data ?? {};

	const {
		reset,
		handleSubmit,
		control: searchControl,
	} = useForm({defaultValues: {search: ''}});

	const formValue = watch();

	const searching = formValue.search && formValue.search.length > 0;

	const doSearch = handleSubmit(({search}) => {
		resetForm(prev => ({...prev, search}));
	});

	const expandTopComponent = (
		<>
			<div
				className={classNames('flex gap-2', {
					'flex-col': isMobile,
					'w-1/2': !isMobile,
				})}>
				<Select
					className={classNames({['flex-1']: disableSearch})}
					disableClear
					topSelected={false}
					label="Data per halaman"
					data={dataPerPageSelection}
					control={control}
					fieldName="limit"
				/>
				{!disableSearch && (
					<form onSubmit={doSearch} className="flex-1">
						<Input
							label="Pencarian"
							fieldName="search"
							control={searchControl}
							rightAcc={
								<div className="flex gap-2">
									{searching && <Button icon="faClose" onClick={clearSearch} />}
									<Button icon="faSearch" onClick={doSearch} />
								</div>
							}
						/>
					</form>
				)}
			</div>
		</>
	);

	function clearSearch() {
		reset({search: ''});
		doSearch();
	}

	useEffect(() => {
		resetForm(prev => ({...prev, pageTotal: pageCount}));
		if (page > pageCount) resetForm(prev => ({...prev, page: 1}));
	}, [pageCount, page]);

	useEffect(() => {
		reset({search: formValue.search});

		return () => reset({search: ''});
	}, [formValue.search]);

	return (
		<Table
			{...props}
			data={rows}
			className={classNames('flex flex-col gap-2', className)}
			topComponent={
				<div
					className={classNames('px-2 gap-2 flex justify-between', {
						'flex-col': isMobile,
					})}>
					<div
						className={classNames('flex gap-2', {
							'flex-col': isMobile,
							'items-center': !isMobile,
						})}>
						{topComponent}
						{isMobile && (
							<Button onClick={() => sFilterExpand.toggle()}>
								<Icon name="faFilter" />
								<Icon name={expanded ? 'faChevronUp' : 'faChevronDown'} />
							</Button>
						)}
					</div>
					{!isMobile ? expandTopComponent : expanded && expandTopComponent}
				</div>
			}
			bottomComponent={
				<div className="px-2 flex justify-center">
					<Pagination
						// eslint-disable-next-line @typescript-eslint/no-shadow
						onChange={(_, page) => resetForm(prev => ({...prev, page}))}
						count={Number(formValue?.pageTotal ?? 1)}
					/>
				</div>
			}
		/>
	);
}
