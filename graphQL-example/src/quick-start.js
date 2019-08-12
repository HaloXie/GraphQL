const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

// Some fake data
const books = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const users = [
  {
    id: 1,
    userNmae: "A"
  }
  , {
    id: 2,
    userNmae: "B"
  }
]


const roles = [
  {
    id: 1,
    desc: "admin"
  },
  {
    id: 2,
    desc: "user"
  }
]

const userRoles = [
  {
    id: 3,
    userId: 1,
    roleID: 1
  },
  {
    id: 4,
    userId: 2,
    roleID: 2
  }
]


// The GraphQL schema in string form => defined the interface construct
const typeDefs = `
  type Query { books: [Book] }

  type Book { id:Int , title: String, author: String }
`

// The resolvers
const resolvers = {
  Query: { books: () => books }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Initialize the app
const app = express()

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!')
})
