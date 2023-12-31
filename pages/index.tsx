import Link from 'next/link';

import {Button} from '@components';
import {getLayout} from '@layouts';

Index.getLayout = getLayout;

export default function Index() {
	return (
		<div className="flex flex-col gap-2 p-4">
			<div>Ini adalah halaman utama</div>
			<div>Untuk detail tampilan awal, bisa diskusi terlebih dahulu</div>

			<div className="flex gap-2">
				<Link href="/registration">
					<Button variant="outlined">Registrasi Mandiri</Button>
				</Link>
				<Link href="/admin">
					<Button variant="outlined">Halaman Admin</Button>
				</Link>
			</div>
		</div>
	);
}
