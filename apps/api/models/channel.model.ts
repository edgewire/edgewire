import { InferModel, pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { groups } from './group.model';

export const channels = pgTable('channels', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  groupId: integer('group_id').notNull().references(() => groups.id),
});

export type Channel = InferModel<typeof channels>;
export type NewChannel = InferModel<typeof channels, 'insert'>;