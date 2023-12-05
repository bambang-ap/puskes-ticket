import {ModalTypeSelect} from '@appTypes/app.zod';
import {Button} from '@components';
import {
	UseDateFilterProps,
	useFormFilter,
	useTableFilterComponentV2,
} from '@hooks';
import {getAdminLayout} from '@layouts';
import {trpc} from '@utils/trpc';

Customer.getLayout = getAdminLayout;

export default function Customer() {
	const {
		form: {control, reset},
	} = useFormFilter<UseDateFilterProps<{type: ModalTypeSelect}>>();
	const {component} = useTableFilterComponentV2({
		control,
		reset,
		topComponent: <Button className="flex-1">Tambah Customer</Button>,
		useQuery: form => trpc.customer.list.useQuery(form),
		renderItem: ({Cell, item}) => {
			return (
				<>
					<Cell>{item.name}</Cell>
				</>
			);
		},
	});

	return <>{component}</>;
}
