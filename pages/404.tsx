import type {ReactElement} from 'react';

import {Box, Button, Card, Container, styled, Typography} from '@mui/material';
import Head from 'next/head';

import {BaseLayout} from '@layouts';

const MainContent = styled(Box)(
	() => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`,
);

const TopWrapper = styled(Box)(
	({theme}) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`,
);

// const OutlinedInputWrapper = styled(OutlinedInput)(
// 	({theme}) => `
//     background-color: ${theme.colors.alpha.white[100]};
// `,
// );

// const ButtonSearch = styled(Button)(
// 	({theme}) => `
//     margin-right: -${theme.spacing(1)};
// `,
// );

function Status404() {
	return (
		<>
			<Head>
				<title>Status - 404</title>
			</Head>
			<MainContent>
				<TopWrapper>
					<Container maxWidth="md">
						<Box textAlign="center">
							<div className="flex justify-center">
								<img
									alt="404"
									height={180}
									src="/static/images/status/404.svg"
								/>
							</div>
							<Typography variant="h2" sx={{my: 2}}>
								{"The page you were looking for doesn't exist."}
							</Typography>
						</Box>
						<Container maxWidth="sm">
							<Card sx={{textAlign: 'center', mt: 3, p: 4}}>
								<Button href="/" variant="outlined">
									Go to homepage
								</Button>
							</Card>
						</Container>
					</Container>
				</TopWrapper>
			</MainContent>
		</>
	);
}

export default Status404;

Status404.getLayout = function getLayout(page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
