import classnames from 'clsx';
import clone from 'just-clone';
import * as momentTz from 'moment-timezone';
import objectPath from 'object-path';
import {DeepPartialSkipArrayKey, FieldPath, FieldValues} from 'react-hook-form';
import * as XLSX from 'xlsx';

import {ModalTypeSelect, nikRegex} from '@appTypes/app.zod';
import {
	defaultErrorMutation,
	formatDate,
	formatDateStringView,
	formatDateView,
	formatFullView,
	formatHour,
} from '@constants';
import {Gender} from '@enum';
import {Fields, useLoader} from '@hooks';
import {
	UseTRPCMutationOptions,
	UseTRPCQueryResult,
} from '@trpc/react-query/shared';

let typingTimer: NodeJS.Timeout;

momentTz.tz.setDefault('Asia/Jakarta');

function convertDate(format: string, date?: LiteralUnion<'now'> | number) {
	const isNow = date === 'now';

	if (!isNow && !date) return null;

	return moment(isNow ? undefined : date).format(format);
}

export const dateUtils = {
	date: (date?: LiteralUnion<'now'> | number) =>
		convertDate(formatDateView, date),
	readable: (date?: LiteralUnion<'now'> | number) =>
		convertDate(formatDate, date),
	hour: (date?: LiteralUnion<'now'> | number) => convertDate(formatHour, date),
	dateS: (date?: LiteralUnion<'now'> | number) =>
		convertDate(formatDateStringView, date),
	full: (date?: LiteralUnion<'now'> | number) =>
		convertDate(formatFullView, date),
};

export {default as twColors} from 'tailwindcss/colors';

export const moment = momentTz.default;
export const classNames = classnames;

export function typingCallback(callback: () => void, timeout = 500) {
	clearTimeout(typingTimer);
	typingTimer = setTimeout(callback, timeout);
}

export function getBirthFromNik(nik: string, gender?: Gender) {
	const matches = nik.match(nikRegex);

	if (!matches) return null;
	const [, , date, month, year] = matches;
	return `${parseInt(year!) > 50 ? '19' : '20'}${year}-${month}-${
		gender === Gender.Female ? parseInt(date!) - 40 : date
	}`;
}

export function numberFormat(
	qty: number,
	currency = true,
	minimumFractionDigits = 0,
	maximumFractionDigits = 0,
) {
	const formatted = new Intl.NumberFormat('id-ID', {
		minimumFractionDigits,
		maximumFractionDigits,
		...(currency ? {style: 'currency', currency: 'IDR'} : {}),
	}).format(qty);

	return formatted;
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

export function exportData<T extends object>(
	data?: T[],
	names?: [filename?: string, sheetName?: string],
	header?: ObjKeyof<T>[],
) {
	if (!data) return;

	const [filename = 'data', sheetName = 'Sheet 1'] = names ?? [];

	const workbook = XLSX.utils.book_new();
	workbook.SheetNames.push(sheetName);
	workbook.Sheets[sheetName] = XLSX.utils.json_to_sheet(data, {header});
	XLSX.writeFile(workbook, `${filename}.xlsx`);
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

export function nullUseQuery() {
	type Ret = UseTRPCQueryResult<{}[], unknown>;

	return {
		data: [] as {}[],
		refetch: noopVoid,
		isFetching: false,
		isFetched: true,
	} as Ret;
}

export function nullRenderItem() {
	return {};
}

export function renderItemAsIs<T extends {}>(item: T) {
	const obj = Object.entries(item);

	return obj.reduce<MyObject<unknown>>((ret, [key, value]) => {
		return {...ret, [key.ucwords()]: value};
	}, {});
}

export function getIds<
	F extends Fields,
	KK extends DeepPartialSkipArrayKey<F>,
	P extends keyof KK,
>(dataForm: KK, property?: P) {
	const selectedIds = !!property ? transformIds(dataForm[property]) : [];
	return {selectedIds, property, enabled: selectedIds.length > 0};
}

export function transformIds(dataObj?: MyObject<undefined | boolean>) {
	const selectedIds = Object.entries(dataObj ?? {}).reduce<string[]>(
		(ret, [id, val]) => {
			if (val) ret.push(id);
			return ret;
		},
		[],
	);

	return selectedIds;
}

export function formParser<
	F extends Fields,
	KK extends DeepPartialSkipArrayKey<F>,
	P extends keyof KK,
>(dataForm: KK, opts?: {property?: P; pageName?: string}) {
	const {pageName, property} = opts ?? {};
	const {mType, ...restDataForm} = dataForm;

	const ids = getIds(dataForm, property);
	const modal = modalTypeParser(mType, pageName);

	return {...ids, ...modal, dataForm: restDataForm};
}
