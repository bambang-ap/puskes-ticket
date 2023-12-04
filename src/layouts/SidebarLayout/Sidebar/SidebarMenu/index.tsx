// FIXME:
// @ts-nocheck

import {useContext} from 'react';

import {List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';

import {SidebarContext} from '@app/contexts/SidebarContext';
import {TMenu} from '@appTypes/app.zod';
import {Icon} from '@components';
import {atomIsMobile, atomListMenu} from '@recoil/atoms';
import {classNames} from '@utils';

// function SubMenu({title, path, icon}: TMenu) {
// 	const {push} = useRouter();
// 	const [open, setOpen] = React.useState(false);

// 	function handleClick() {
// 		setOpen(opened => !opened);
// 		if (!!path) push(path);
// 	}

// 	return (
// 		<>
// 			<ListItemButton onClick={handleClick}>
// 				<ListItemIcon>
// 					<Icon name={icon} className="text-white" />
// 				</ListItemIcon>
// 				<ListItemText primary={title} />
// 				{open ? <ExpandLess /> : <ExpandMore />}
// 			</ListItemButton>
// 			<Collapse in={open} timeout="auto" unmountOnExit>
// 				<List component="div">
// 					<RenderMenuList data={[]} />
// 				</List>
// 			</Collapse>
// 		</>
// 	);
// }

function Menu(menu: TMenu) {
	const isMobile = useRecoilValue(atomIsMobile);

	const {push, pathname} = useRouter();

	const {closeSidebar} = useContext(SidebarContext);

	const {path, title, icon} = menu;

	const isSelected = path === pathname;

	// const hasSubMenu = !!subMenu && subMenu.length > 0;

	function handleClick() {
		if (!!path) push(path);
		if (isMobile) closeSidebar();
	}

	// if (hasSubMenu) return <SubMenu {...menu} />;

	return (
		<ListItemButton
			onClick={handleClick}
			className={classNames('mb-2 hover:bg-gray-700', {
				'bg-green-500': isSelected,
			})}>
			<ListItemIcon>
				<Icon name={icon} className="text-white" />
			</ListItemIcon>
			<ListItemText primary={title} />
		</ListItemButton>
	);
}

function RenderMenuList({data}: {data?: TMenu[]}) {
	return (
		<>
			{data?.map(menu => {
				return <Menu key={menu.title} {...menu} />;
			})}
		</>
	);
}

function SidebarMenu() {
	const listMenu = useRecoilValue(atomListMenu);

	return (
		<List component="div">
			<RenderMenuList data={listMenu} />
		</List>
	);
}

export default SidebarMenu;
