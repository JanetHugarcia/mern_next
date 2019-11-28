import express from 'express';
import next from 'next';
import morgan from 'morgan';

import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

const PORT = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const app = express();
    const server = new ApolloServer({typeDefs, resolvers});

    // settings
    app.set('port', PORT);

    // middlewares
    server.applyMiddleware({app})
    app.use(morgan('dev'));

    // routes
    app.all('*', (req: express.Request, res: express.Response) => {
        return handle(req, res)
      })
    
    app.listen(app.get('port'), () => {
        console.log(`> Ready on http://localhost:${app.get('port')}${server.graphqlPath}`)
    })
})