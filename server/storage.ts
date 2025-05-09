import { users, type User, type InsertUser, InsertGreeting, Greeting, greetings } from "@shared/schema";

// Extend the storage interface with greeting methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createGreeting(greeting: InsertGreeting): Promise<Greeting>;
  getGreeting(id: number): Promise<Greeting | undefined>;
  getAllGreetings(): Promise<Greeting[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private greetings: Map<number, Greeting>;
  private userId: number;
  private greetingId: number;

  constructor() {
    this.users = new Map();
    this.greetings = new Map();
    this.userId = 1;
    this.greetingId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createGreeting(insertGreeting: InsertGreeting): Promise<Greeting> {
    const id = this.greetingId++;
    const greeting: Greeting = { ...insertGreeting, id };
    this.greetings.set(id, greeting);
    return greeting;
  }

  async getGreeting(id: number): Promise<Greeting | undefined> {
    return this.greetings.get(id);
  }

  async getAllGreetings(): Promise<Greeting[]> {
    return Array.from(this.greetings.values());
  }
}

export const storage = new MemStorage();
