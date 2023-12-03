import {MouseEventHandler, useRef, useState} from 'react';

import {useForm} from 'react-hook-form';

import {RouterOutput} from '@appTypes/app.type';
import {TProduct} from '@appTypes/app.zod';
import {FormProps} from '@appTypes/props.type';
import {
	Button,
	Icon,
	Modal,
	ModalRef,
	Radio,
	Select,
	selectMapper,
} from '@components';
import {getLayout} from '@layouts';
import Scrollbar from '@prevComp/Scrollbar';
import {numberFormat} from '@utils';
import {trpc} from '@utils/trpc';

Penjualan.getLayout = getLayout;

export default function Penjualan() {
	const modalRef = useRef<ModalRef>(null);
	const {control, watch} = useForm();
	const {data: categoryProducts} = trpc.category.getWithProduct.useQuery();
	const {data: categories = []} = trpc.category.get.useQuery();

	const [product, setProduct] = useState<TProduct>();

	console.log(watch());

	function showModal(product: TProduct) {
		setProduct(product);
		modalRef.current?.show();
	}

	return (
		<div className="flex flex-1 flex-col">
			<Modal
				ref={modalRef}
				onVisibleChange={v => setProduct(p => (v ? p : undefined))}>
				<RenderProductModal control={control} product={product} />
			</Modal>
			<div className="flex gap-2 items-center mb-2">
				<Select
					control={control}
					className="flex-1"
					fieldName="category"
					data={selectMapper(categories, 'id', 'name')}
				/>
				<Button icon="faMagnifyingGlass" />
			</div>
			<Scrollbar>
				{categoryProducts?.map(product => {
					return (
						<RenderCategoryProduct
							key={product.id}
							product={product}
							showModal={showModal}
						/>
					);
				})}
			</Scrollbar>
		</div>
	);
}

function RenderCategoryProduct({
	product,
	showModal,
}: {
	product: RouterOutput['category']['getWithProduct'][number];
	showModal: (product: TProduct) => void;
}) {
	const {name, products, icon} = product;

	return (
		<div className="p-4 my-2 rounded-lg border">
			<div className="flex items-center gap-2">
				{name}
				<Icon name={icon} />
			</div>

			{products.map(product => (
				<RenderProduct
					onClick={() => showModal(product)}
					key={product.id}
					{...product}
				/>
			))}
		</div>
	);
}

function RenderProduct(
	product: TProduct & {onClick?: MouseEventHandler<HTMLDivElement>},
) {
	const {name, unit, variants, onClick} = product;

	const variant = variants?.[0];

	return (
		<div className="border p-2 mt-2 rounded-lg" onClick={onClick}>
			<div>{name}</div>
			<div>
				{numberFormat(variant?.price ?? 0)} / 1 {unit}
			</div>
		</div>
	);
}

function RenderProductModal({
	control,
	product,
}: FormProps<MyObject> & {product?: TProduct}) {
	const {name, unit, variants = []} = product ?? {};
	return (
		<div>
			<div>{name}</div>

			<Radio
				control={control}
				fieldName="jsdf"
				data={variants}
				renderItem={({Radio, isFirst, isLast, item}) => {
					const {name, price, id} = item;
					return (
						<div className="flex gap-2 items-center justify-between">
							<Radio value={id} label={name} />
							<div className="fldex-1">{numberFormat(price)}</div>
						</div>
					);
				}}
			/>

			{/* {variants?.map(variant => {
				const {id, name, price, visible} = variant;

return <ButtonGroup control={control} fieldName='jsdf' key={id} data={[]}/>

				return (
					<div className="flex" key={id}>
						<Input
							control={control}
							fieldName="jdf"
							type="radio"
							label={name}
						/>
					</div>
				);
			})} */}
		</div>
	);
}
