import { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLInputObjectType } from "graphql";

export const UserType = new GraphQLObjectType({
	name: "User",
	fields: {
		id: { type: new GraphQLNonNull(GraphQLString) },
		firstName: { type: new GraphQLNonNull(GraphQLString) },
		lastName: { type: new GraphQLNonNull(GraphQLString) },
		phoneNumber: { type: GraphQLString },
		email: { type: new GraphQLNonNull(GraphQLString) },
		createdAt: { type: new GraphQLNonNull(GraphQLString) },
		updatedAt: { type: new GraphQLNonNull(GraphQLString) },
        // Users don't need to see this
		// isDeleted: { type: GraphQLBoolean, resolve: (user) => user.isDeleted },
	},
});

export const UserInputType = new GraphQLInputObjectType({
	name: "UserInput",
	fields: {
		firstName: { type: new GraphQLNonNull(GraphQLString) },
		lastName: { type: new GraphQLNonNull(GraphQLString) },
		phoneNumber: { type: GraphQLString },
		email: { type: new GraphQLNonNull(GraphQLString) },
	},
});