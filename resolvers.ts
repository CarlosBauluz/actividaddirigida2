import { Collection, ObjectId } from "mongodb";
import { vuelos, vuelosModel } from "./types.ts";
import { formModelToVuelo } from "./utils.ts";

export const resolvers = {
  Query: {
    getFlights: async (
      _: unknown,
      { origen, destino }: { origen?: string; destino?: string },
      context: { vuelosCollection: Collection<vuelosModel> },
    ): Promise<vuelos[]> => {
      const filter: any = {};

      if (origen) {
        filter.origen = origen; // Filtrar por origen si está presente
      }

      if (destino) {
        filter.destino = destino; // Filtrar por destino si está presente
      }
      const vuelosModel = await context.vuelosCollection.find().toArray();
      return vuelosModel.map((vuelosModel) =>
        formModelToVuelo(vuelosModel)
      );
    },
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: {
        vuelosCollection: Collection<vuelosModel>;
      },
    ): Promise<vuelos | null> => {
      const vuelosModel = await context.vuelosCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!vuelosModel) {
        return null;
      }
      return formModelToVuelo(vuelosModel);
    },
  },
  Mutation: {
    addVuelos: async (
      _: unknown,
      args: { origen: string; destino: string; fechayhora: string },
      context: {
        vuelosCollection: Collection<vuelosModel>;
      },
    ): Promise<vuelos> => {
      const { origen, destino, fechayhora } = args;
      const { insertedId } = await context.vuelosCollection.insertOne({
        origen,
        destino,
        fechayhora
      });
      const vuelosModel = {
        _id: insertedId,
        origen,
        destino,
        fechayhora
      };
      return formModelToVuelo(vuelosModel!);
    },
  },
};