import {FormEventHandler, useEffect, useRef, useState} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {StateSelection, useStateData} from '@appComponent/StateSelection';
import {TCustomer, TCustomerUpsert, tCustomerUpsert} from '@appTypes/app.zod';
import {
	BorderTd,
	Button,
	Form,
	Input,
	Modal,
	ModalRef,
	Select,
} from '@components';
import {SelectionGender} from '@constants';
import {useLoader} from '@hooks';
import Scrollbar from '@prevComp/Scrollbar';
import {dateUtils, getBirthFromNik} from '@utils';
import {trpc} from '@utils/trpc';

export default function Registration() {
	const modalRef = useRef<ModalRef>(null);

	const [regCust, setRegCust] = useState<TCustomer | undefined>();

	const {component, mutateOpts} = useLoader();
	const {mutateAsync: mutate} = trpc.customer.create.useMutation(mutateOpts);
	const {control, setValue, resetField, watch, handleSubmit, clearErrors} =
		useForm<TCustomerUpsert>({
			resolver: zodResolver(tCustomerUpsert),
		});

	const {nik, gender} = watch();

	const submit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		clearErrors();
		handleSubmit(async values => {
			if (!confirm('Apakah Anda yakin data sudah benar?')) return;

			const result = await mutate(values);
			setRegCust(result.data);
		})();
	};

	function doneScreenshot() {
		if (confirm('Apakah data sudah di screenshot?')) {
			if (
				confirm(
					'Apakah anda yakin? Anda tidak akan diarahkan ke tampilan sebelumnya.',
				)
			) {
				modalRef.current?.hide();
			}
		}
	}

	useEffect(() => {
		if (!!nik && !!gender) {
			const birthDate = getBirthFromNik(nik, gender);
			if (!!birthDate) setValue('birthDate', birthDate);
		} else resetField('birthDate');
	}, [nik, gender]);

	useEffect(() => {
		if (!!regCust) {
			modalRef.current?.show();
		}
	}, [!!regCust]);

	return (
		<>
			{component}
			<Modal
				ref={modalRef}
				disableBackdropClick
				className="flex flex-col flex-1 justify-between gap-2"
				title="Selamat, Anda telah terdaftar!">
				<h5 className="text-center">
					Silahkan mengunjungi puskesmas untuk memvalidasi kepesertaan Anda.
				</h5>
				<Scrollbar className="flex-1">
					<CustomerDetail {...regCust!} />
				</Scrollbar>
				<p>*) Silahkan screenshot tampilan ini, lalu serahkan ke petugas.</p>
				<Button onClick={doneScreenshot}>Ok</Button>
			</Modal>
			<Scrollbar className="mb-4">
				<h3 className="font-bold text-lg text-center my-4">
					Form Pendaftaran Peserta Baru
				</h3>
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
		</>
	);
}

function CustomerDetail(customer: TCustomer) {
	const {
		addressDetail,
		birthDate,
		districtId,
		gender,
		name,
		nik,
		phone,
		provinceId,
		regencyId,
		registerNumber,
		villageId,
	} = customer;

	const {districts, provinces, regencies, villages} = useStateData({
		districtId,
		provinceId,
		regencyId,
		villageId,
	});

	return (
		<div className="mt-4 gap-4 flex flex-col">
			<table className="w-full">
				<tr>
					<BorderTd>Nama Lengkap</BorderTd>
					<BorderTd>{name}</BorderTd>
				</tr>
				<tr>
					<BorderTd>NIK</BorderTd>
					<BorderTd>{nik}</BorderTd>
				</tr>
				<tr>
					<BorderTd>Jenis Kelamin</BorderTd>
					<BorderTd>{gender}</BorderTd>
				</tr>
				<tr>
					<BorderTd>Tanggal Lahir</BorderTd>
					<BorderTd>{dateUtils.dateS(birthDate)}</BorderTd>
				</tr>
				<tr>
					<BorderTd>No Telp</BorderTd>
					<BorderTd>{phone}</BorderTd>
				</tr>
				<tr>
					<BorderTd>Provinsi</BorderTd>
					<BorderTd>{provinces.find(e => e.id === provinceId)?.name}</BorderTd>
				</tr>
				<tr>
					<BorderTd>Kabupaten / Kota</BorderTd>
					<BorderTd>{regencies.find(e => e.id === regencyId)?.name}</BorderTd>
				</tr>
				<tr>
					<BorderTd>Kecamatan</BorderTd>
					<BorderTd>{districts.find(e => e.id === districtId)?.name}</BorderTd>
				</tr>
				<tr>
					<BorderTd>Kelurahan</BorderTd>
					<BorderTd>{villages.find(e => e.id === villageId)?.name}</BorderTd>
				</tr>
				<tr>
					<BorderTd>Alamat Lengkap</BorderTd>
					<BorderTd>{addressDetail}</BorderTd>
				</tr>
			</table>

			<label className="text-2xl text-center">
				No. Pendaftaran <label className="font-bold">{registerNumber}</label>
			</label>
		</div>
	);
}
