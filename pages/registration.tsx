import {useRef, useState} from 'react';

import Webcam from 'react-webcam';

import {Button} from '@components';
import Scrollbar from '@prevComp/Scrollbar';

export default function Registration() {
	const r = useRef<Webcam>(null);

	const [a, b] = useState('');

	return (
		<Scrollbar>
			<div className="flex flex-col h-full bg-green-300">
				<Webcam ref={r} />
				<Button
					variant="outlined"
					onClick={() => {
						const u = r.current?.getScreenshot();
						alert('sdfkjsd');
						if (!!u) b(u);
					}}>
					Psadasdjk
				</Button>
				{!!a && <img alt="" src={a} />}
			</div>
		</Scrollbar>
	);
}
