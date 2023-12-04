import {tCustomerUpsert} from '@appTypes/app.zod';
import {dCust} from '@db';
import {Success} from '@server-utils';
import {procedure, router} from '@trpc';
import {generateId} from '@utils';

export default function customerRouters() {
	return router({
		upsert: procedure.input(tCustomerUpsert).mutation(async ({input}) => {
			const {registerNumber, id} = input;

			console.log(373845, input);
			await dCust.upsert({
				...input,
				id: id ?? generateId('C-'),
				registerNumber: registerNumber ?? generateId(),
			});
			return Success;
		}),
	});
}
