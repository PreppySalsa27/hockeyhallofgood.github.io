import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for players
  app.get('/api/players', async (req, res) => {
    try {
      const players = await storage.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ message: 'Failed to fetch players data' });
    }
  });

  app.get('/api/players/latest', async (req, res) => {
    try {
      const latestInductee = await storage.getLatestInductee();
      if (!latestInductee) {
        return res.status(404).json({ message: 'No inductees found' });
      }
      res.json(latestInductee);
    } catch (error) {
      console.error('Error fetching latest inductee:', error);
      res.status(500).json({ message: 'Failed to fetch latest inductee data' });
    }
  });

  app.get('/api/players/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid player ID' });
      }

      const player = await storage.getPlayerById(id);
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }

      res.json(player);
    } catch (error) {
      console.error('Error fetching player:', error);
      res.status(500).json({ message: 'Failed to fetch player data' });
    }
  });

  app.get('/api/players/related/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid player ID' });
      }

      const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
      const relatedPlayers = await storage.getRelatedPlayers(id, limit);
      
      res.json(relatedPlayers);
    } catch (error) {
      console.error('Error fetching related players:', error);
      res.status(500).json({ message: 'Failed to fetch related players data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
