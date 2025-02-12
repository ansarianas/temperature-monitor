export interface Reading {
  id: string;
  temperature: number;
  createdAt: string;
  status: "NORMAL" | "HIGH";
  processedAt: string;
}
