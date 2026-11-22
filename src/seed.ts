import { randomUUID } from "node:crypto";
import type { Todo } from "./model";

const initialTodos: Omit<Todo, "id">[] = [
  { name: "Gregor", value: "Buy milk, eggs and bread" },
  { name: "Lara", value: "Finish the web todo exercise" },
  { name: "Fabienne", value: "Go for a 30 minute run" },
];

export const seedTodos = (todos: Map<string, Todo>) => {
  for (const { name, value } of initialTodos) {
    const id = randomUUID();
    todos.set(id, { id, name, value });
  }
};
