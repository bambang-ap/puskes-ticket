import Link from 'next/link';

import {Button} from '@components';
import {getLayout} from '@layouts';

Penjualan.getLayout = getLayout;

export default function Penjualan() {
	return (
		<div className="flex flex-col gap-2">
			<div>Ini adalah halaman utama</div>
			<div>Untuk detail tampilan awal, bisa diskusi terlebih dahulu</div>

			<div>
				<Link href="/registration">
					<Button variant="outlined">Registrasi Mandiri</Button>
				</Link>
				<Button variant="outlined">Registrasi Mandiri</Button>
			</div>
		</div>
	);
}
