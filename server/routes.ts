import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAlertReportSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/alert-reports", async (req, res) => {
    try {
      const data = insertAlertReportSchema.parse(req.body);
      const report = await storage.createAlertReport(data);
      res.json(report);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/alert-reports", async (_req, res) => {
    const reports = await storage.getAlertReports();
    res.json(reports);
  });

  const httpServer = createServer(app);

  return httpServer;
}
