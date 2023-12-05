import {FC, ReactNode} from 'react';

import {Box, useTheme} from '@mui/material';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars-2';

interface ScrollbarProps {
	height?: string;
	className?: string;
	children?: ReactNode;
}

const Scrollbar: FC<ScrollbarProps> = ({children, height, ...rest}) => {
	const theme = useTheme();

	return (
		<Scrollbars
			autoHide
			universal
			height={height}
			renderThumbVertical={() => {
				return (
					<Box
						sx={{
							width: 5,
							background: `${theme.colors.alpha.black[10]}`,
							borderRadius: `${theme.general.borderRadiusLg}`,
							transition: `${theme.transitions.create(['background'])}`,

							'&:hover': {
								background: `${theme.colors.alpha.black[30]}`,
							},
						}}
					/>
				);
			}}
			{...rest}>
			{children}
		</Scrollbars>
	);
};

Scrollbar.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Scrollbar;
