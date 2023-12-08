import {createContext, ReactNode, useLayoutEffect, useState} from 'react';

import {useTheme} from '@mui/material';

import {SidebarCollapseOn} from '@constants';
import {sIsMobile} from '@signal';
type SidebarContext = {
	sidebarToggle: boolean;
	toggleSidebar: () => void;
	closeSidebar: () => void;
};

type Props = {
	children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
	{} as SidebarContext,
);

export function SidebarProvider({children}: Props) {
	const theme = useTheme();

	const [sidebarToggle, setSidebarToggle] = useState(true);

	const toggleSidebar = () => {
		setSidebarToggle(!sidebarToggle);
	};

	const closeSidebar = () => {
		setSidebarToggle(false);
	};

	function handleResize(hasWindow = false) {
		if (!hasWindow) return;

		const {[SidebarCollapseOn]: width} = theme.breakpoints.values;
		if (window.innerWidth <= width) {
			setSidebarToggle(false);
			sIsMobile.set(true);
		} else {
			setSidebarToggle(true);
			sIsMobile.set(false);
		}
	}

	useLayoutEffect(() => {
		const hasWindow = typeof window !== undefined;
		handleResize(hasWindow);
		if (hasWindow)
			window.addEventListener('resize', () => handleResize(hasWindow));
		return () => {
			if (hasWindow)
				window.removeEventListener('resize', () => handleResize(hasWindow));
		};
	}, []);

	return (
		<SidebarContext.Provider
			value={{sidebarToggle, toggleSidebar, closeSidebar}}>
			{children}
		</SidebarContext.Provider>
	);
}
