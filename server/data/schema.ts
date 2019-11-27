import { resolvers } from './resolvers';
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';

const typeDefs = importSchema( path.join( __dirname, './schema.graphql'));

const schema = makeExecutableSchema({typeDefs, resolvers});

export { schema };