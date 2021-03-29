import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './types.graphql';
import resolvers from '../resolvers/index';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
