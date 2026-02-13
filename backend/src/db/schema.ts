import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const myFirstTable = pgTable("my_first_table", {
	myFirstTableId: uuid("my_first_table_id").defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, }).defaultNow().notNull().$onUpdate(() => new Date()),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	unique("my_first_table_my_first_table_id_unique_constraint").on(table.myFirstTableId),
    // foreignKey({
        // 		columns: [table.organizationId],
        // 		foreignColumns: [organizations.organizationId],
        // 		name: "fkey_organization_id"
        // 	}).onUpdate("cascade").onDelete("set null"),
]);
export type MyFirstTable = InferSelectModel<typeof myFirstTable>;