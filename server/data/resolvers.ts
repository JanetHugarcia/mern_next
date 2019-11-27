import { Clientes } from './db';

export const resolvers = {
  Query: {
    getClientes: (_root, {limite}) => {
      return Clientes.find({}).limit(limite)
    },
    getCliente: (_root, {id}) => {
      return new Promise((resolve, rejects) => {
        Clientes.findById(id,(error, cliente) => {
          if (error) rejects(error)
          else resolve(cliente)
        })
      })
    }
  },
  Mutation: {
    crearCliente: (_root, {input}) => {
      const nuevoCliente = new Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        emails: input.emails,
        edad: input.edad,
        tipo: input.tipo,
        pedidos: input.pedidos
      })

      nuevoCliente.id = nuevoCliente._id;

      return new Promise((resolve, rejects) => {
        nuevoCliente.save((error) => {
          if (error) rejects(error);
          else resolve(nuevoCliente)
        })
      })
    },
    actualizarCliente: (_root, {input}) => {
      return new Promise((resolve, rejects) => {
        Clientes.findOneAndUpdate(
          {_id: input.id},
          input,
          {new: true},
          (error, cliente) => {
            if (error) rejects(error)
            else resolve(cliente)
          }
        )
      })
    },
    eliminarCliente: (_root, {id}) => {
      return new Promise((resolve, rejects) => {
        Clientes.findOneAndRemove({_id: id}, (error) => {
          if (error) rejects(error)
          else resolve('Se eliminó correctamente')
        })
      })
    }
  }
}