import {FormEventHandler, useEffect} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {StateSelection} from '@appComponent/StateSelection';
import {TCustomerUpsert, tCustomerUpsert} from '@appTypes/app.zod';
import {Button, Form, Input, Select} from '@components';
import {defaultErrorMutation, SelectionGender} from '@constants';
import Scrollbar from '@prevComp/Scrollbar';
import {getBirthFromNik} from '@utils';
import {trpc} from '@utils/trpc';

export default function Registration() {
	const {control, setValue, resetField, watch, handleSubmit, clearErrors} =
		useForm<TCustomerUpsert>({
			resolver: zodResolver(tCustomerUpsert),
		});

	const {mutateAsync: mutate} =
		trpc.customer.upsert.useMutation(defaultErrorMutation);

	const {nik, gender} = watch();

	const submit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		clearErrors();
		handleSubmit(
			async values => {
				await mutate(values);
			},
			err => console.log(err),
		)();
	};

	useEffect(() => {
		if (!!nik && !!gender) {
			const birthDate = getBirthFromNik(nik, gender);
			if (!!birthDate) setValue('birthDate', birthDate);
		} else resetField('birthDate');
	}, [nik, gender]);

	return (
		<Scrollbar>
			<Form onSubmit={submit} className="flex h-full flex-col gap-2 p-4">
				<Input control={control} fieldName="nik" label="NIK" />
				<Input control={control} fieldName="name" label="Nama Lengkap " />
				<Select
					control={control}
					fieldName="gender"
					data={SelectionGender}
					label="Jenis Kelamin"
				/>
				<Input
					disabled
					type="date"
					control={control}
					fieldName="birthDate"
					label="Tanggal Lahir"
				/>
				<Input control={control} fieldName="phone" label="No Telp" />

				<StateSelection control={control} resetField={resetField} />
				<Input
					multiline
					control={control}
					fieldName="addressDetail"
					label="Alamat Lengkap"
				/>
				<Button type="submit">Submit</Button>
			</Form>
		</Scrollbar>
	);
}
