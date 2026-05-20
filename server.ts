import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

console.log("SERVER.TS EXECUTING...");

// For ESM (dev)
const __filename = typeof __filename !== "undefined" ? __filename : fileURLToPath(import.meta.url);
const __dirname_resolved = typeof __dirname !== "undefined" ? __dirname : path.dirname(__filename);

const getRootPath = (fileName: string) => {
  // If we are in dist/server.cjs, the root is one level up
  if (path.basename(__dirname_resolved) === "dist") {
    return path.resolve(__dirname_resolved, "..", fileName);
  }
  return path.resolve(process.cwd(), fileName);
};

const keysPath = getRootPath("keys.json");
const activeUsersPath = getRootPath("active_users.json");

// Initialize files if they don't exist
if (!fs.existsSync(keysPath)) {
  fs.writeFileSync(keysPath, JSON.stringify(["TQX-8F9A", "TQX-2B3C", "06C2280E"], null, 2));
}
if (!fs.existsSync(activeUsersPath)) {
  fs.writeFileSync(activeUsersPath, JSON.stringify([], null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

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

  // Handle missing API routes separately
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API route not found: ${req.method} ${req.url}` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Changed from "spa" to "custom" to handle fallback manually
    });
    app.use(vite.middlewares);

    app.use("*", async (req, res) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        console.error(e);
        res.status(500).end(e.message);
      }
    });
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
