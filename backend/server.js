import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

// ✅ Update this with your actual Netlify frontend URL
const allowedOrigins = [
  "https://kalories123.netlify.app", // 👈 replace with your real Netlify site URL
  "http://localhost:5173", // 👈 for local development (Vite default)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Initialize Supabase client
const supabase = createClient(
  "https://ekfumusrqyknppmguoyk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZnVtdXNycXlrbnBwbWd1b3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTY2NTAsImV4cCI6MjA3NzY3MjY1MH0.80xZFj50BX4WDIdmNQDwe__FzgWI5osJK3gtyC5u2uE"
);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running and connected to Supabase!");
});

// ✅ Test route
app.get("/test", async (req, res) => {
  const { data, error } = await supabase.from("calories").select("*");
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// ✅ Add a new calorie item
app.post("/add", async (req, res) => {
  const { item, calories } = req.body;
  const { data, error } = await supabase.from("calories").insert([{ item, calories }]);
  if (error) return res.status(400).json({ error });
  res.json({ success: true, data });
});

// ✅ Fetch all items
app.get("/get", async (req, res) => {
  const { data, error } = await supabase
    .from("calories")
    .select("*")
    .order("id", { ascending: false });
  if (error) return res.status(400).json({ error });
  res.json(data);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




