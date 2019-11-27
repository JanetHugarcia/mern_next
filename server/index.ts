import express from 'express';
import next from 'next';
import morgan from 'morgan';

import graphqlHTTP from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers';

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const root = resolvers;

app.prepare().then(() => {
    const server = express();

    // settings
    server.set('port', PORT);

    // middlewares
    server.use(morgan('dev'));
    server.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    }))

    // routes

    server.all('*', (req: express.Request, res: express.Response) => {
        return handle(req, res)
      })
    
    server.listen(server.get('port'), () => {
        console.log(`> Ready on http://localhost:${server.get('port')}`)
    })
})