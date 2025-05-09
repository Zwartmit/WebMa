import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGreetingSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to save a greeting
  app.post("/api/greetings", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertGreetingSchema.parse(req.body);
      
      // Save the greeting
      const greeting = await storage.createGreeting(validatedData);
      
      // Return the created greeting
      res.status(201).json(greeting);
    } catch (error) {
      if (error instanceof ZodError) {
        // Return validation errors
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        // Return generic error
        console.error("Error creating greeting:", error);
        res.status(500).json({ message: "Failed to create greeting" });
      }
    }
  });

  // API route to get all greetings
  app.get("/api/greetings", async (req, res) => {
    try {
      const greetings = await storage.getAllGreetings();
      res.json(greetings);
    } catch (error) {
      console.error("Error fetching greetings:", error);
      res.status(500).json({ message: "Failed to fetch greetings" });
    }
  });

  // API route to get a specific greeting by ID
  app.get("/api/greetings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const greeting = await storage.getGreeting(id);
      if (!greeting) {
        return res.status(404).json({ message: "Greeting not found" });
      }

      res.json(greeting);
    } catch (error) {
      console.error("Error fetching greeting:", error);
      res.status(500).json({ message: "Failed to fetch greeting" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
