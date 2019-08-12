
const { gql } = require('apollo-server')

const typeDefs = gql`
# Query => get data
# if there is a symbol '!' behind a object , that is mean this object can not be null , include input and output type
type Query {
  launches: [Launch]!
  launchesWithPaging( # replace the current launches query with this one.
    """
    The number of results to show. Must be >= 1. Default = 20
    """
    pageSize: Int
    """
    If you add a cursor here, it will only return results _after_ this cursor
    """
    after: String
  ):LaunchesWithPaging!
  launch(id: ID!): Launch  
  #Queries for the current user
  me: User
}

# Mutation => update data
type Mutation {
  # if false, booking trips failed-- check errors
  bookTrips(launchIds: [ID]!): TripUpdateResponse!

  # if false, cancellation failed-- check errors
  cancelTrip(launchId: ID!): TripUpdateResponse!

  login(email: String): String # login token
}

type LaunchesWithPaging{
  cursor: String!
  hasMore: Boolean!
  launches: [Launch]!
}

type Launch {
  id: ID!
  site: String
  # Mission and Rocket are referenced from below custom type 
  mission: Mission
  rocket: Rocket
  isBooked: Boolean!
}

type Rocket {
  id: ID!
  name: String
  type: String
}

type User {
  id: ID!
  email: String!
  trips: [Launch]!
}

type Mission {
  name: String
  # notice this function takes an argument of Size and the type of argument belongs to Enum
  missionPatch(mission: String, size: PatchSize): String
}

enum PatchSize {
  SMALL
  LARGE
}

# In a larger project, recommand to abstract this type into an interface
type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}`
module.exports = typeDefs