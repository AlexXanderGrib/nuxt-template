import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

class Todo {
  readonly id = Math.random().toString(10).slice(2);
  constructor(public title: string, public completed = false) {}
}

const todos: Todo[] = [
  new Todo('Почесать паука')
];

export const appRouter = router({
  add: publicProcedure
    .input(z.object({ title: z.string().max(72) }))
    .mutation(({ input }) => {
      const todo = new Todo(input.title);
      todos.push(todo);

      return todo;
    }),

  remove: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const todoIndex = todos.findIndex((t) => t.id === input.id);

      if (todoIndex === -1) {
        throw new TRPCError({
          message: "Задача не найдена",
          code: "NOT_FOUND"
        });
      }

      todos.splice(todoIndex, 1);
    }),

  list: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ input }) => todos.filter((t) => t.title.includes(input.search))),

  setCompleted: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const todo = todos.find((t) => t.id === input.id);

      if (!todo) {
        throw new TRPCError({
          message: "Задача не найдена",
          code: "NOT_FOUND"
        });
      }

      todo.completed = true;
    }),

  setNotCompleted: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const todo = todos.find((t) => t.id === input.id);

      if (!todo) {
        throw new TRPCError({
          message: "Задача не найдена",
          code: "NOT_FOUND"
        });
      }

      todo.completed = false;
    })
});

export type AppRouter = typeof appRouter;
