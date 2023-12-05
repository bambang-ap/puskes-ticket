import {Path} from 'react-hook-form';
import {col, Op, WhereAttributeHashValue} from 'sequelize';
import {Primitive} from 'zod';

import {TDateFilter} from './zod';

type L1<T extends {}> = Path<ObjectNonArray<T>>;
type L2<T extends {}> = `$${Path<ObjectNonArray<T>>}$`;
type L<T extends {}> = L1<T> | L2<T>;
type U<T extends {}> = ['or' | 'and', O<T>];
type O<T extends {}> = Partial<
	Record<L<T>, Primitive | WhereAttributeHashValue<any>>
>;

export function sqlGroup<T extends {}>(searchKey: L1<T>): any {
	return searchKey;
}

export function sqlOrder<T extends {}>(
	searchKey: Partial<Record<L1<T>, boolean>>,
): any {
	return entries(searchKey).map(([key, value]) => {
		return [col(key), value ? 'asc' : 'desc'];
	});
}

export function sqlWhereLike<T extends {}>(
	searchKey: L<T>[],
	search?: string | WhereAttributeHashValue<any>,
	like = true,
): any {
	if (!search) return undefined;

	return {
		[Op.or]: searchKey.map(key => {
			return {[key]: !like ? search : {[Op.iLike]: `%${search}%`}};
		}),
	};
}

export function sqlWhereOrAnd<T extends {}>(
	searchKey: O<T>,
	operator: 'or' | 'and' = 'and',
): any {
	return {
		[Op[operator]]: Object.entries(searchKey).map(keys => {
			const [key, value] = keys;
			return {[key]: value};
		}),
	};
}

export function sqlWhere<T extends {}>(...searchKeys: (U<T> | O<T>)[]): any {
	return searchKeys.reduce((ret, asd) => {
		const isArray = Array.isArray(asd);
		const [op, searchKey]: U<T> = isArray ? asd : ['and', asd];

		return {
			...ret,
			[Op[op]]: Object.entries(searchKey).map(([key, value]) => {
				return {[key]: value};
			}),
		};
	}, {});
}

export function sqlWhereDate<T extends {}>(
	field: LiteralUnion<L<T>>,
	{filterFrom, filterTo}: Partial<TDateFilter>,
): any {
	uuid;
	return {
		[field as string]: {
			[Op.and]: [{[Op.gte]: filterFrom}, {[Op.lte]: filterTo}],
		},
	};
}
