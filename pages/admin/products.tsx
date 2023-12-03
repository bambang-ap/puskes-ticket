import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';

import {TProduct} from '@appTypes/app.zod';
import {Button, Input, MultipleSelect, selectMapper} from '@components';
import {getAdminLayout} from '@layouts';
import {trpc} from '@utils/trpc';

AdminProduct.getLayout = getAdminLayout;

export default function AdminProduct() {
	const {push} = useRouter();
	const {data: products} = trpc.product.get.useQuery();
	const {data: categories} = trpc.category.get.useQuery();

	const {control, watch} = useForm<TProduct>();

	function addCategory() {
		push('/admin/categories');
	}

	return (
		<>
			<MultipleSelect
				control={control}
				fieldName="cat_id"
				data={selectMapper(categories ?? [], 'id', 'name')}
				rightAcc={<Button onClick={addCategory} icon="faPlus" />}
			/>
			<Input control={control} fieldName="name" />
			<Input
				control={control}
				fieldName="unit"
				placeholder="Contoh: Cup, Butir, dll"
			/>
		</>
	);
}
