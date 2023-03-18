import { InferModel, pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export type Group = InferModel<typeof groups>;
export type NewGroup = InferModel<typeof groups, 'insert'>;