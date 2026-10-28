export function getBackendUrl(): string | null {
  const configured =
    process.env.ADMIN_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim();

  if (configured) return configured.replace(/\/+$/, "");
  return process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : null;
}
