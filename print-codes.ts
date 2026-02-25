import Database from "better-sqlite3";
const db = new Database("app.db");
const codes = db.prepare("SELECT code FROM activation_codes LIMIT 10").all();
console.log("Here are 10 activation codes you can use to test:");
console.log(codes.map((c: any) => c.code).join("\n"));
