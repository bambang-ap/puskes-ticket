import {dUser} from '@db';

import {procedure, router} from '@trpc';

export default function userRouters() {
	return router({
		get: procedure.query(() => {
			return dUser.findAll();
		}),
	});
}
