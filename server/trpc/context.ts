import type { inferAsyncReturnType } from "@trpc/server";
import type { CookieSerializeOptions } from "cookie-es";
import { type H3Event, parseCookies, setCookie } from "h3";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = (event: H3Event) => {
  const responseHeaders = new Headers();
  const headers = event.headers;
  const cookies = parseCookies(event);

  return {
    responseHeaders,
    headers,
    cookies,
    setCookie: (
      name: string,
      value: string,
      options?: CookieSerializeOptions
    ) => setCookie(event, name, value, options),
    getClientAddress: () =>
      event.headers.get("X-Forwarded-For")?.split(", ")[0] ??
      event.headers.get("X-Real-Ip") ??
      event.node?.req.socket.remoteAddress,

    locale:
      cookies.locale ?? headers.get("Accept-Language")?.slice(0, 2) ?? "en",
      
    event
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
