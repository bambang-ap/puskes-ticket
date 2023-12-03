import classnames from 'clsx';
import clone from 'just-clone';
import * as momentTz from 'moment-timezone';
import objectPath from 'object-path';
import {FieldPath, FieldValues} from 'react-hook-form';

import {ModalTypeSelect} from '@appTypes/app.zod';
import {
	defaultErrorMutation,
	formatDateStringView,
	formatDateView,
	formatFullView,
	formatHour,
} from '@constants';
import {useLoader} from '@hooks';
import {UseTRPCMutationOptions} from '@trpc/react-query/shared';

let typingTimer: NodeJS.Timeout;

momentTz.tz.setDefault('Asia/Jakarta');

function convertDate(format: string, date?: LiteralUnion<'now'>) {
	const isNow = date === 'now';

	if (!isNow && !date) return null;

	return moment(isNow ? undefined : date).format(format);
}

export const dateUtils = {
	date: (date?: LiteralUnion<'now'>) => convertDate(formatDateView, date),
	hour: (date?: LiteralUnion<'now'>) => convertDate(formatHour, date),
	dateS: (date?: LiteralUnion<'now'>) =>
		convertDate(formatDateStringView, date),
	full: (date?: LiteralUnion<'now'>) => convertDate(formatFullView, date),
};

export {default as twColors} from 'tailwindcss/colors';

export const moment = momentTz.default;
export const classNames = classnames;

export function typingCallback(callback: () => void, timeout = 500) {
	clearTimeout(typingTimer);
	typingTimer = setTimeout(callback, timeout);
}

export function numberFormat(
	qty: number,
	currency = true,
	minimumFractionDigits = 0,
	maximumFractionDigits = 0,
) {
	const formated = new Intl.NumberFormat('id-ID', {
		minimumFractionDigits,
		maximumFractionDigits,
		...(currency ? {style: 'currency', currency: 'IDR'} : {}),
	}).format(qty);

	return formated;
}

export function generateId(id?: string) {
	const now = moment();
	return classNames(id, now.format('YY MM DD'), uuid().slice(-4)).replace(
		/\s/g,
		'',
	);
}

export function copyToClipboard(str: string) {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	alert('Token copied');
}

export function atLeastOneDefined(
	obj: Record<string | number | symbol, unknown>,
) {
	return Object.values(obj).some(v => v !== undefined);
}

export function modalTypeParser(type?: ModalTypeSelect, pageName = '') {
	const isAdd = type === 'add';
	const isEdit = type === 'edit';
	const isPreview = type === 'preview';
	const isDelete = type === 'delete';
	const isSelect = type === 'select';
	const isOther = type === 'other';
	const isPreviewEdit = isEdit || isPreview;

	return {
		isEdit,
		isPreview,
		isAdd,
		isOther,
		isDelete,
		isSelect,
		isPreviewEdit,
		get modalTitle() {
			switch (type) {
				case 'add':
					return `Tambah ${pageName}`;
				case 'edit':
					return `Ubah ${pageName}`;
				case 'preview':
					return `Detail ${pageName}`;
				case 'delete':
					return `Hapus ${pageName}`;
				default:
					return '';
			}
		},
	};
}

export function toBase64(
	file: File,
	callback: (result: string | null) => void,
) {
	const reader = new FileReader();

	reader.readAsDataURL(file);
	reader.onload = function () {
		if (typeof reader?.result === 'string') callback(reader.result);

		callback(null);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	reader.onerror = function (_error) {
		callback(null);
	};
}

export function formData<T extends FieldValues, P extends FieldPath<T>>(
	obj: T,
) {
	return {
		get(path: P) {
			return objectPath.get(obj, path);
		},
		set(path: P, value: T[P]) {
			const clonedObj = clone(obj);
			objectPath.set(clonedObj, path, value);
			return clonedObj;
		},
	};
}

export function sleep(timeout = 1000) {
	return new Promise<void>(resolve => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}

export function mutateCallback(
	{hide, show}: Pick<ReturnType<typeof useLoader>, 'hide' | 'show'>,
	withDefault = true,
): any {
	return {
		...(withDefault ? defaultErrorMutation : {}),
		onMutate() {
			show?.();
		},
		onSettled() {
			hide?.();
		},
	} as UseTRPCMutationOptions<any, any, any>;
}
