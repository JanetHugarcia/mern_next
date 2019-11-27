const createCliente = (id, {nombre, tipo, pedidos}) => {
  return {
      id,
      nombre,
      tipo,
      pedidos
  }
}
const clientesDB = {};

const resolvers = {
  getCliente: ({id}) => {
    const cliente = createCliente(id, clientesDB[id]);
    return cliente;
  },
  crearCliente: ({input}) => {
      const id = require('crypto').randomBytes(10).toString('hex');
      clientesDB[id] = input;
      const client = createCliente(id, input);
      return client;
  }
}

export default resolvers;