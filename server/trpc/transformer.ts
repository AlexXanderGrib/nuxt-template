import type { DataTransformer } from "@trpc/server";

export const transformer: DataTransformer = {
  deserialize: (data) => data,
  serialize: (data) => data
};
