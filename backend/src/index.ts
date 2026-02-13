import express from 'express'
import cors from 'cors'
import { createServer } from 'http';

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
