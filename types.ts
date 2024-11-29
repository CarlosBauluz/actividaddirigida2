import { OptionalId } from "mongodb";

export type vuelosModel = OptionalId<{
  origen: string;
  destino: string;
  fechayhora: string;
}>;

export type vuelos = {
  id: string;
  origen: string;
  destino: string;
  fechayhora: string;
};