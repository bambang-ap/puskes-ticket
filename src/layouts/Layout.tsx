import {ReactElement} from 'react';

import {BaseLayout} from './BaseLayout';
import {SidebarLayout} from './SidebarLayout';

export function getLayout(page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
}

export function getAdminLayout(page: ReactElement) {
	return <SidebarLayout>{page}</SidebarLayout>;
}
