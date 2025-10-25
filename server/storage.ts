import { type AlertReport, type InsertAlertReport } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createAlertReport(report: InsertAlertReport): Promise<AlertReport>;
  getAlertReports(): Promise<AlertReport[]>;
}

export class MemStorage implements IStorage {
  private alertReports: Map<string, AlertReport>;

  constructor() {
    this.alertReports = new Map();
  }

  async createAlertReport(insertReport: InsertAlertReport): Promise<AlertReport> {
    const id = randomUUID();
    const report: AlertReport = { 
      ...insertReport, 
      id,
      description: insertReport.description ?? null
    };
    this.alertReports.set(id, report);
    return report;
  }

  async getAlertReports(): Promise<AlertReport[]> {
    return Array.from(this.alertReports.values());
  }
}

export const storage = new MemStorage();
