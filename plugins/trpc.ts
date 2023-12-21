import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";
import type { AppRouter } from "~/server/trpc/routers";
import { transformer } from "~/server/trpc/transformer";

export default defineNuxtPlugin(() => {
  const headers = useRequestHeaders();

  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const trpc = createTRPCNuxtClient<AppRouter>({
    transformer,
    links: [
      httpBatchLink({
        url: "/api/trpc",
        headers,
        maxURLLength: 2048
      })
    ]
  });

  return { provide: { trpc } };
});
