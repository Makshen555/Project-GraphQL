const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const app = express();

// Conexión a MongoDB
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/project2", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// Habilita CORS
app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true, // Habilita la interfaz GraphiQL
    })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
