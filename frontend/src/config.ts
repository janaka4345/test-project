export type AppConfig = {
  appEnv: string;
};

export async function loadConfig(): Promise<AppConfig> {
  const res = await fetch("/config.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load /config.json: ${res.status}`);
  const config: Partial<AppConfig> = await res.json();
  if (typeof config.appEnv !== "string") {
    throw new Error("/config.json is missing appEnv");
  }
  return { appEnv: config.appEnv };
}
