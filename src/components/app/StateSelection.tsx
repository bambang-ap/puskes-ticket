import {useEffect} from 'react';

import {
	Control,
	FieldValues,
	UseFormResetField,
	useWatch,
} from 'react-hook-form';

import {TState} from '@appTypes/app.zod';
import {FormProps} from '@appTypes/props.type';
import {Select, selectMapper} from '@components';
import {trpc} from '@utils/trpc';

export function useStateData(ids: Partial<TState>) {
	const {provinceId, regencyId, districtId} = ids;

	const {data: provinces = []} = trpc.state.provinces.useQuery();
	const {data: regencies = []} = trpc.state.regencies.useQuery(
		{id: provinceId!},
		{enabled: !!provinceId},
	);
	const {data: districts = []} = trpc.state.districts.useQuery(
		{id: regencyId!},
		{enabled: !!regencyId},
	);
	const {data: villages = []} = trpc.state.villages.useQuery(
		{id: districtId!},
		{enabled: !!districtId},
	);

	return {provinces, regencies, districts, villages};
}

export function StateSelection<F extends FieldValues>(
	props: FormProps<TState & F, 'control' | 'resetField'>,
) {
	const control = props.control as unknown as Control<TState>;
	const resetField = props.resetField as unknown as UseFormResetField<TState>;

	const {provinceId, regencyId, districtId} = useWatch<TState>({
		control,
	});

	const {districts, provinces, regencies, villages} = useStateData({
		provinceId,
		regencyId,
		districtId,
	});

	useEffect(() => {
		if (!provinceId) resetField('regencyId');
	}, [provinceId]);

	useEffect(() => {
		if (!regencyId) resetField('districtId');
	}, [regencyId]);

	useEffect(() => {
		if (!districtId) resetField('villageId');
	}, [districtId]);

	return (
		<>
			<Select
				label="Provinsi"
				control={control}
				fieldName="provinceId"
				data={selectMapper(provinces, 'id', 'name')}
			/>
			<Select
				label="Kabupaten / Kota"
				control={control}
				fieldName="regencyId"
				data={selectMapper(regencies, 'id', 'name')}
			/>
			<Select
				label="Kecamatan"
				control={control}
				fieldName="districtId"
				data={selectMapper(districts, 'id', 'name')}
			/>
			<Select
				label="Kelurahan"
				control={control}
				fieldName="villageId"
				data={selectMapper(villages, 'id', 'name')}
			/>
		</>
	);
}
