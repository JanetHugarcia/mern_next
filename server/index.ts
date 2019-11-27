import express from 'express';
import next from 'next';
import morgan from 'morgan';

import graphqlHTTP from 'express-graphql';
import schema from './schema';


const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    //settings
    server.set('port', PORT);

    //resolvers graphql
    const createCliente = (id, {nombre}) => {
        return {
            id,
            nombre
        }
    }
    const clientesDB = {};
    const root = {
        cliente: () => {
            return {
                nombre: 'Diego'
            }        
        },
        crearCliente: ({input}) => {
            const id = require('crypto').randomBytes(10).toString('hex');
            clientesDB[id] = input;
            const client = createCliente(id, input);
            return client;
        }
    }

    //middlewares
    server.use(morgan('dev'));
    server.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    }))


    //routes

    server.all('*', (req: express.Request, res: express.Response) => {
        return handle(req, res)
      })
    
    server.listen(server.get('port'), () => {
        console.log(`> Ready on http://localhost:${server.get('port')}`)
    })
})