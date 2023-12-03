import {PropsWithChildren} from 'react';

import {Box} from '@mui/material';

export function BaseLayout({children}: PropsWithChildren) {
	return <Box className="p-4 flex flex-1 h-full">{children}</Box>;
}
