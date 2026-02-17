import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	userId: uuid("user_id").defaultRandom().primaryKey().notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	phoneNumber: text("phone_number"),
	email: text("email").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, }).defaultNow().notNull().$onUpdate(() => new Date()),
	isDeleted: boolean("is_deleted").default(false).notNull(),
}, (table) => [
	unique("users_email_unique_constraint").on(table.email),
	// foreignKey({
	// 		columns: [table.organizationId],
	// 		foreignColumns: [organizations.organizationId],
	// 		name: "fkey_organization_id"
	// 	}).onUpdate("cascade").onDelete("set null"),
]);
export type User = InferSelectModel<typeof users>;