import express from 'express'
import cors from 'cors'
import { createServer } from 'http';
import { getIntrospectionQuery, graphql } from 'graphql';
import { schema } from "./graphql/schema";
import { createHandler } from 'graphql-http';

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
// Enable CORS
app.use(cors());
app.use(express.json())

// Routes
// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

app.all("/graphql", createHandler({ schema }))

app.all("/schema", async (_req, res) => {
    const result = await graphql({
        schema,
        source: getIntrospectionQuery(),
    });
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
});

// Create the HTTP server
const httpServer = createServer(app)
httpServer.listen(PORT, () => {
    console.log(`Shift Scheduler backend running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
    console.log('Received shutdown signal');
    httpServer.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
}
