import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Cliente {
        id: ID
        nombre: String
        #apellido: String
        #empresa: String
        #email: String
        tipo: TipoCliente
        pedidos: [Pedido]
    }

    type Pedido {
        producto: String
        precio: Int
    }

    enum TipoCliente {
        BASICO
        PREMIUM
    }
    
    type Email {
        email: String
    }

    type Query {
        getCliente(id:ID) : Cliente
    }

    input PedidoInput {
        producto: String
        precio: Int
    }

    input ClienteInput {
        id: ID
        nombre: String
        tipo: TipoCliente!
        pedidos: [PedidoInput]
    }

    type Mutation {
        crearCliente(input: ClienteInput) : Cliente
    }
`);

export default schema;