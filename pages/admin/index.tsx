import Link from 'next/link';

import {Button} from '@components';
import {getAdminLayout} from '@layouts';

AdminIndex.getLayout = getAdminLayout;

export default function AdminIndex() {
	return (
		<div className="flex flex-col gap-2 p-4">
			<div className="flex gap-2">
				<Link href="/admin/customer">
					<Button variant="outlined">List Customer</Button>
				</Link>
			</div>
		</div>
	);
}
