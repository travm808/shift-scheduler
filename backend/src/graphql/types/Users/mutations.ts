import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserInputType, UserType } from "./types";
import { db } from "../../../db/index";
import { users } from "../../../db/schema";
import { and, eq } from "drizzle-orm";

export const UserMutations = new GraphQLObjectType({
	name: "UserMutations",
	fields: {
		createUser: {
			type: UserType,
			args: {
				user: { type: UserInputType },
			},
			resolve: async (_, args) => {
				const { user } = args;
				return await db.insert(users).values(user).returning();
			},
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				user: { type: UserInputType },
			},
			resolve: async (_, args) => {
				const { id, user } = args;
				return await db.update(users)
					.set(user)
					.where(
						and(
							eq(users.userId, id),
							eq(users.isDeleted, false)
						)).returning();
			},
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }, 
			},
			resolve: async (_, args) => {
				const { id } = args;
				return await db.update(users)
					.set({
						isDeleted: true
					})
					.where(
						and(
							eq(users.userId, id),
							eq(users.isDeleted, false)
						)).returning();
			},
		}
	},
});