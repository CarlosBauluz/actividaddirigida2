import { vuelos, vuelosModel } from "./types.ts";

export const formModelToVuelo = (vuelosModel: vuelosModel): vuelos => {
  return {
    id: vuelosModel._id!.toString(),
    origen: vuelosModel.origen,
    destino: vuelosModel.destino,
    fechayhora : vuelosModel.fechayhora
  };
};