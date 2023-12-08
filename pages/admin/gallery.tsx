import {FormEventHandler, useRef} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {TGallery, tGalleryResolver} from '@appTypes/app.zod';
import {
	Button,
	Form,
	Gallery,
	ImageWithPreview,
	Input,
	InputFile,
	Modal,
	ModalRef,
} from '@components';
import {Fields, useLoader} from '@hooks';
import {getAdminLayout} from '@layouts';
import {formParser} from '@utils';
import {trpc} from '@utils/trpc';

GalleryScreen.getLayout = getAdminLayout;

type FormValue = Fields<TGallery>;

export default function GalleryScreen() {
	const modalRef = useRef<ModalRef>(null);
	const {component, mutateOpts} = useLoader();

	const {mutate: upsert} = trpc.gallery.upsert.useMutation(mutateOpts);
	const {mutate: remove} = trpc.gallery.remove.useMutation(mutateOpts);
	const {data = [], refetch} = trpc.gallery.images.useQuery();
	const {control, reset, watch, handleSubmit, clearErrors} = useForm<FormValue>(
		{
			resolver: zodResolver(tGalleryResolver),
		},
	);
	const {modalTitle, isDelete, dataForm} = formParser(watch(), {
		pageName: 'Gallery',
	});

	const submit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		clearErrors();
		handleSubmit(async values => {
			const {id, ...rest} = values;
			if (isDelete) remove({id}, {onSuccess});
			else upsert({id, ...rest}, {onSuccess});
		})();

		function onSuccess() {
			refetch();
			modalRef.current?.hide();
		}
	};

	function showModal({mType, ...rest}: Partial<FormValue>) {
		reset({...rest, mType});
		modalRef.current?.show();
	}

	return (
		<>
			{component}
			<Button onClick={() => showModal({})}>Add</Button>

			<Gallery
				columns={5}
				data={data}
				renderItem={({item}) => {
					const {id, image} = item;

					return (
						<div className="flex flex-col gap-2 p-2">
							<ImageWithPreview src={image} />
							<Button
								onClick={() => showModal({mType: 'delete', id})}
								icon="faTrash"
							/>
						</div>
					);
				}}
			/>
			<Modal title={modalTitle} ref={modalRef}>
				<Form onSubmit={submit}>
					{isDelete ? (
						<Input
							hidden
							fieldName="id"
							control={control}
							defaultValue={dataForm.id}
						/>
					) : (
						<InputFile
							label="Upload Image"
							accept="image/*"
							control={control}
							fieldName="image"
						/>
					)}
					<Button type="submit">Submit</Button>
				</Form>
			</Modal>
		</>
	);
}
