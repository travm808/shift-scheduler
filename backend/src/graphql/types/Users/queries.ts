import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./types";
import { db } from "../../../db/index";
import { users } from "../../../db/schema";
import { and, asc, count, eq, ilike, or } from "drizzle-orm";

export const UserQueries = new GraphQLObjectType({
    name: "UserQueries",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            args: {
                limit: { type: GraphQLInt },
                offset: { type: GraphQLInt },
                search: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                const { limit, offset, search } = args;
                const safeLimit = limit < 100 ? limit : 100;
                const safeOffset = offset < 0 ? 0 : offset;

                return await db
                    .select()
                    .from(users)
                    .where(
                        and(
                            eq(users.isDeleted, false),
                            search ? or(
                                ilike(users.firstName, `%${search}%`),
                                ilike(users.lastName, `%${search}%`),
                                ilike(users.email, `%${search}%`),
                            ) : undefined
                        )
                    )
                    .orderBy(asc(users.createdAt))
                    .limit(safeLimit)
                    .offset(safeOffset);
            },
        },
        totalCount: {
            type: GraphQLInt,
            args: {
                search: { type: GraphQLString },
            },
            resolve: async (_, args) => {
                const { search } = args;

                return await db
                    .select({ count: count(users.userId) })
                    .from(users)
                    .where(
                        and(
                            eq(users.isDeleted, false),
                            search ? or(
                                ilike(users.firstName, `%${search}%`),
                                ilike(users.lastName, `%${search}%`),
                                ilike(users.email, `%${search}%`),
                            ) : undefined
                        )
                    )
                    .orderBy(asc(users.createdAt))
                    .then((result) => result[0].count);
            },
        },
        user: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, args) => {
                const { id } = args;
                return await db
                    .select()
                    .from(users)
                    .where(
                        and(
                            eq(users.isDeleted, false),
                            eq(users.userId, id)
                        )
                    )
                    .limit(1)
                    .then((result) => result[0]);
            },
        },
    },
});
