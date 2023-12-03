import {trpc} from '@utils/trpc';

export default function Registration() {
	trpc.user.get.useQuery();

	return 'jhdfsjh';
}
