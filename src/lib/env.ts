function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supabaseProjectId:
    process.env.SUPABASE_PROJECT_ID ?? "lqcwnmfsifzjluniqtlw",
  supabaseUrl:
    supabaseUrl ??
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabasePublishableKey:
    supabasePublishableKey ??
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  supabaseAnonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    supabasePublishableKey ??
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
};
