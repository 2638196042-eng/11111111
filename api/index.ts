import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const app = express();
app.use(express.json());

// Note: JSON files won't persist on Vercel between requests/restarts.
// This is for demonstration. For production, use a database.
const getRootPath = (fileName: string) => path.resolve(process.cwd(), fileName);
const keysPath = getRootPath("keys.json");
const activeUsersPath = getRootPath("active_users.json");

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Vercel API is running" });
});

app.post("/api/activate", (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: "请输入授权码" });

  try {
    const keys = JSON.parse(fs.readFileSync(keysPath, "utf-8"));
    // On Vercel, reading might work but writing will be temporary or fail.
    let activeUsers = [];
    if (fs.existsSync(activeUsersPath)) {
      activeUsers = JSON.parse(fs.readFileSync(activeUsersPath, "utf-8"));
    }

    if (!keys.includes(key)) {
      return res.status(400).json({ error: "无效的授权码" });
    }

    const existingUser = activeUsers.find((u: any) => u.key === key);
    if (existingUser) {
      return res.status(400).json({ error: "该授权码已在其他设备绑定，请重新购买" });
    }

    const token = crypto.randomBytes(16).toString("hex");
    // We don't try to write here because it won't persist on Vercel anyway
    // and might crash depending on permissions. 
    // In a real app, use a real DB.
    
    return res.json({ success: true, token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "服务器错误" });
  }
});

app.post("/api/verify", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ valid: false });
  // Always return valid for demo if token exists, since we can't persist.
  return res.json({ valid: true });
});

export default app;
