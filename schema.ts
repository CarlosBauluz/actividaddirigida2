export const schema = `#graphql
type vuelos {
  id: ID!
  origen: String!
  destino: String!
  fechayhora: String!
}

type Query {
  getFlights: [vuelos!]!
  getFlight(id: ID!): vuelos
}

type Mutation {
  addVuelos(origen: String!, destino: String!, fechayhora: String!): vuelos!
}
`;