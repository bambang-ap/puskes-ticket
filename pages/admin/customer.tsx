import {useRef} from 'react';

import {useForm} from 'react-hook-form';

import {TCustomer} from '@appTypes/app.zod';
import {Button, Modal, ModalRef} from '@components';
import {Fields, useTableFilterComponentV2} from '@hooks';
import {getAdminLayout} from '@layouts';
import {formParser} from '@utils';
import {trpc} from '@utils/trpc';

Customer.getLayout = getAdminLayout;

type FormValue = Fields<TCustomer>;

export default function Customer() {
	const modalRef = useRef<ModalRef>(null);

	const {control, reset, watch} = useForm<FormValue>();

	const {modalTitle /* dataForm */} = formParser(watch(), {
		pageName: 'Customer',
	});

	const {component} = useTableFilterComponentV2({
		control,
		reset,
		topComponent: (
			<Button onClick={() => console.log(123)} className="flex-1">
				Tambah Customer
			</Button>
		),
		useQuery: form => trpc.customer.list.useQuery(form),
		header: ['Nomor Registrasi', 'Nama Lengkap', 'NIK', 'Terdaftar', 'Action'],
		renderItem: ({Cell, item}) => {
			return (
				<>
					<Cell>{item.registerNumber}</Cell>
					<Cell>{item.name}</Cell>
					<Cell>{item.nik}</Cell>
					<Cell>{item.registered ? 'Ya' : 'Tidak'}</Cell>
					<Cell>
						<Button
							icon="faMagnifyingGlass"
							onClick={() => showModal({mType: 'preview'})}
						/>
					</Cell>
				</>
			);
		},
	});

	function showModal({mType, ...rest}: Partial<FormValue>) {
		reset({...rest, mType});
		modalRef.current?.show();
	}

	return (
		<>
			{component}
			<Modal title={modalTitle} ref={modalRef}>
				KJ
			</Modal>
		</>
	);
}
