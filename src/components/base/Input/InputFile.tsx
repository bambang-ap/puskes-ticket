import {FieldValues} from 'react-hook-form';

import {Button, ImageWithPreview} from '@components';
import {
	ControlledComponentProps,
	withReactFormController,
} from '@formController';
import {toBase64} from '@utils';

export type InputFileProps = {
	accept?: HTMLInputElement['accept'];
	label?: string;
};

export const InputFile = withReactFormController(InputFileComponent);

function InputFileComponent<F extends FieldValues>(
	props: Omit<
		ControlledComponentProps<F, InputFileProps>,
		'leftAcc' | 'rightAcc'
	>,
) {
	const {controller, className, label = 'Upload File', accept} = props;

	const {
		field: {onChange, value: imgSource},
	} = controller;

	return (
		<div className="flex items-center gap-2">
			<Button className={className} component="label">
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
					className="w-20 max-h-20 overflow-hidden"
					src={imgSource}
				/>
			)}
		</div>
	);
}
