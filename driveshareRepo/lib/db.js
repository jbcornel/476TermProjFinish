import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "database", "driveshare.db");

const db = new Database(dbPath, { verbose: console.log }); //edit to create singleton instance

export default db;
