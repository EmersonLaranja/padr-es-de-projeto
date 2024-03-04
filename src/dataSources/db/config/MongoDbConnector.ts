import { MongoClient } from "mongodb";

export class MongoDbConnector {
  private static instance: MongoDbConnector;
  private client: MongoClient | null = null;
  private constructor() {}

  public static getInstance(): MongoDbConnector {
    if (!MongoDbConnector.instance) {
      MongoDbConnector.instance = new MongoDbConnector();
    }
    return MongoDbConnector.instance;
  }
  public async connect(uri: string): Promise<void> {
    if (!this.client) {
      this.client = await MongoClient.connect(uri);
    }
  }
}
