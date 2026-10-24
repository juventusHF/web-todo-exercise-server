import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";

interface Todo {
  id: string;
  name: string;
  value: string;
}

const port = 3000;
const todos = new Map<string, Todo>();

const isString = (v: unknown): v is string => typeof v === "string";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/todos", (_req, res) => {
  res.json([...todos.values()]);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.get(req.params.id);
  if (!todo) return void res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const { name, value } = req.body ?? {};
  if (!isString(name) || !isString(value)) {
    return void res.status(400).json({ error: "name and value must be strings" });
  }
  const todo = { id: randomUUID(), name, value };
  todos.set(todo.id, todo);
  res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {
  if (!todos.has(req.params.id)) {
    return void res.status(404).json({ error: "Todo not found" });
  }
  const { name, value } = req.body ?? {};
  if (!isString(name) || !isString(value)) {
    return void res.status(400).json({ error: "name and value must be strings" });
  }
  const todo = { id: req.params.id, name, value };
  todos.set(todo.id, todo);
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  if (!todos.delete(req.params.id)) {
    return void res.status(404).json({ error: "Todo not found" });
  }
  res.status(204).end();
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
