import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const keysPath = path.resolve("keys.json");
const activeUsersPath = path.resolve("active_users.json");

// Initialize files if they don't exist
if (!fs.existsSync(keysPath)) {
  fs.writeFileSync(keysPath, JSON.stringify(["TQX-8F9A", "TQX-2B3C"], null, 2));
}
if (!fs.existsSync(activeUsersPath)) {
  fs.writeFileSync(activeUsersPath, JSON.stringify([], null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/activate", (req, res) => {
    const { key } = req.body;
    if (!key) return res.status(400).json({ error: "请输入授权码" });

    const keys = JSON.parse(fs.readFileSync(keysPath, "utf-8"));
    const activeUsers = JSON.parse(fs.readFileSync(activeUsersPath, "utf-8"));

    if (!keys.includes(key)) {
      return res.status(400).json({ error: "无效的授权码" });
    }

    const existingUser = activeUsers.find((u: any) => u.key === key);
    if (existingUser) {
      return res.status(400).json({ error: "该授权码已在其他设备绑定，请重新购买" });
    }

    const token = crypto.randomBytes(16).toString("hex");
    activeUsers.push({ key, token });
    fs.writeFileSync(activeUsersPath, JSON.stringify(activeUsers, null, 2));

    return res.json({ success: true, token });
  });

  app.post("/api/verify", (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ valid: false });

    const activeUsers = JSON.parse(fs.readFileSync(activeUsersPath, "utf-8"));
    const isValid = activeUsers.some((u: any) => u.token === token);
    
    return res.json({ valid: isValid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
