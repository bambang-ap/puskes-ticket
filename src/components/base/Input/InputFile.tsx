import {FieldValues} from 'react-hook-form';

import {Button, ImageWithPreview} from '@components';
import {
	ControlledComponentProps,
	withReactFormController,
} from '@formController';
import {classNames, toBase64} from '@utils';

export type InputFileProps = {
	accept?: HTMLInputElement['accept'];
	label?: string;
	btnClassName?: string;
	imgClassName?: string;
};

export const InputFile = withReactFormController(InputFileComponent);

function InputFileComponent<F extends FieldValues>(
	props: Omit<
		ControlledComponentProps<F, InputFileProps>,
		'leftAcc' | 'rightAcc'
	>,
) {
	const {
		controller,
		className,
		btnClassName,
		imgClassName,
		label = 'Upload File',
		accept,
	} = props;

	const {
		field: {onChange, value: imgSource},
	} = controller;

	return (
		<div className={classNames('flex items-center gap-2', className)}>
			<Button className={btnClassName} component="label">
				{label}
				<input
					hidden
					type="file"
					accept={accept}
					onChange={e => {
						const selectedFile = e.target.files?.[0];

						if (!selectedFile) return;

						toBase64(selectedFile, img => {
							if (!img) return;

							onChange(img);
						});
					}}
				/>
			</Button>
			{imgSource && (
				<ImageWithPreview
					src={imgSource}
					className={classNames('w-20 max-h-20 overflow-hidden', imgClassName)}
				/>
			)}
		</div>
	);
}
