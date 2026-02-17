import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserQueries } from "./types/Users/queries";
import { UserMutations } from "./types/Users/mutations";

// Add new queries and mutations here. Under users
const rootQuery = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        users: { type: UserQueries, resolve: () => ({}) },
    })
})

const rootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        users: { type: UserMutations, resolve: () => ({}) },
    })
})

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
});