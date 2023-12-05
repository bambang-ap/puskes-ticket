import {tableFormValue, tCustomerUpsert} from '@appTypes/app.zod';
import {dCust, ORM} from '@db';
import {checkCredentialV2, pagingResult} from '@server';
import {PError, PSuccess} from '@server-utils';
import {procedure, router} from '@trpc';
import {generateId} from '@utils';

export default function customerRouters() {
	return router({
		list: procedure.input(tableFormValue).query(({ctx, input}) => {
			const {limit, page, search} = input;

			return checkCredentialV2(ctx, async () => {
				const {count, rows} = await dCust.findAndCountAll({
					limit,
					offset: (page - 1) * limit,
				});

				return pagingResult(
					count,
					page,
					limit,
					rows.map(e => e.toJSON()),
				);
			});
		}),

		create: procedure.input(tCustomerUpsert).mutation(async ({input}) => {
			const transaction = await ORM.transaction();

			try {
				const {registerNumber, id} = input;

				const createdUser = await dCust.create(
					{
						...input,
						id: id ?? generateId('C-'),
						registerNumber: registerNumber ?? generateId(),
					},
					{transaction},
				);

				await transaction.commit();
				return PSuccess(createdUser.toJSON());
			} catch (err) {
				await transaction.rollback();
				throw new PError(
					err,
					'BAD_REQUEST',
					'NIK has been used, please contact the admin',
				);
			}
		}),
	});
}
