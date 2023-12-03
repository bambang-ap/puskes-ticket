import {OrderItem} from 'sequelize';

export const defaultExcludeColumn = []; // ['createdAt', 'updatedAt'];
export const defaultExcludeColumns = ['createdAt', 'updatedAt'];
export const defaultOrderBy = {order: [['createdAt', 'desc'] as OrderItem]};
