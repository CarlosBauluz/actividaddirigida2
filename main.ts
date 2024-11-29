import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { vuelosModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const URL = Deno.env.get("URL");


if (!URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("Vuelos");
const vuelosCollection = mongoDB.collection<vuelosModel>("vuelos");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ vuelosCollection }),
});

console.info(`Server ready at ${url}`);
