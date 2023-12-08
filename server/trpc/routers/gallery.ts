import {TGallery, tGalleryUpsert, zId} from '@appTypes/app.zod';
import {dGallery, ORM} from '@db';
import {checkCredentialV2, generateId} from '@server';
import {PError, PSuccess, sqlOrder} from '@server-utils';
import {procedure, router} from '@trpc';

export default function galleryRouters() {
	return router({
		images: procedure.query(({ctx}) => {
			return checkCredentialV2(ctx, async () => {
				const data = await dGallery.findAll();

				return data.map(e => e.toJSON());
			});
		}),

		upsert: procedure.input(tGalleryUpsert).mutation(({ctx, input}) => {
			return checkCredentialV2(ctx, async () => {
				const transaction = await ORM.transaction();

				try {
					const lastGallery = await dGallery.findOne({
						order: sqlOrder<TGallery>({index: false}),
					});

					const [createdGallery] = await dGallery.upsert(
						{
							...input,
							id: input.id ?? generateId('G-'),
							index: (lastGallery?.toJSON().index ?? -1) + 1,
						},
						{transaction},
					);

					await transaction.commit();
					return PSuccess(createdGallery.toJSON());
				} catch (err) {
					await transaction.rollback();
					throw new PError(err, 'BAD_REQUEST');
				}
			});
		}),

		remove: procedure.input(zId).mutation(({ctx, input}) => {
			return checkCredentialV2(ctx, async () => {
				const transaction = await ORM.transaction();

				try {
					await dGallery.destroy({where: input, transaction});
					await transaction.commit();
					return PSuccess();
				} catch (err) {
					await transaction.rollback();
					throw new PError(err, 'BAD_REQUEST');
				}
			});
		}),
	});
}
