export type TResponse<T extends object = {}> = TSuccess<T> | TFailure;

type TSuccess<T extends object = {}> = T extends void
  ? { ok: true }
  : { ok: true } & T;
type TFailure = { ok: false; error?: string; payload?: any };
