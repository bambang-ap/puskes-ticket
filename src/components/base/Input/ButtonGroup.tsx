import {useContext} from 'react';

import {FieldValues} from 'react-hook-form';

import {
	ControlledComponentProps,
	withReactFormController,
} from '@formController';
import {classNames} from '@utils';

import {FormContext} from '../Form';

export const Radio = withReactFormController(SelectComponent);

type RadioProps = {
	label?: string;
	value: string;
};

type HH<T> = {
	disabled?: boolean;
	data: T[];
	renderItem: (
		value: MMapValue<T> & {Radio: (props: RadioProps) => JSX.Element},
		index: number,
	) => JSX.Element;
};

function SelectComponent<T, F extends FieldValues>({
	data = [],
	disabled,
	controller,
	renderItem,
}: ControlledComponentProps<F, HH<T>>) {
	const formContext = useContext(FormContext);

	const {
		field: {value: rootValue, onChange},
	} = controller;

	const isDisabled = formContext?.disabled || disabled;

	function RadioComponent({label, value}: RadioProps) {
		const isSelected = value === rootValue;
		return (
			<div
				className="flex gap-2 items-center"
				onClick={isDisabled ? undefined : () => onChange(value)}>
				<div className="p-2 border rounded-full">
					<div
						className={classNames('p-1 rounded-full', {'bg-black': isSelected})}
					/>
				</div>
				<div>{label ?? value}</div>
			</div>
		);
	}

	return (
		<div className="flex gap-2 flex-col">
			{data.mmap((radio, i) => {
				return (
					<>
						<div>{renderItem({...radio, Radio: RadioComponent}, i)}</div>
					</>
				);
			})}
		</div>
	);
}
