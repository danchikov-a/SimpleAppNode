const WebSocket = require('ws');
const { buildSchema } = require('graphql');
const database = require("./database/database");
const Shawarma = require("./models/shawarma");
const Notification = require("./models/notification");

const server = new WebSocket.Server({ port: 3002 });
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");
const app = express();
app.use(cors());

const schema = buildSchema(`
type Notification {
id: ID!
message: String!
}

type Query {
    notifications: [Notification!]!
}
`);

// Define GraphQL resolver for the shawarmas query
const notificationsResolver = (args, context) => {
    console.log('qwewq');
    return new Promise((resolve, reject) => {
        database.query(Notification.getNotifications(), function (error, result) {
            if (error) {
                reject(error);
            } else {
                console.log('erererer')
                resolve(result);
            }
        });
    });
};

// Define GraphQL root resolver
const rootResolver = {
    notifications: notificationsResolver
};
// Define GraphQL endpoint
app.use('/api/notifications', graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true
}));

// Start server
app.listen(3003, () => {
    console.log('Server started on port 3003');
});