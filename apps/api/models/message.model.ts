import { InferModel, pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { channels } from './channel.model';

const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  channelId: integer('channel_id').notNull().references(() => channels.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Message = InferModel<typeof messages>;
export type NewMessage = InferModel<typeof messages, 'insert'>;