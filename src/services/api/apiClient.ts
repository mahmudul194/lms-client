"use client";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ApiResponse<T = unknown> {
  statusCode: number;
  message?: string;
  data?: T;
  user?: T;
  error?: string;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("bim_access_token");
}

export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("bim_access_token", token);
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("bim_access_token");
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        statusCode: res.status,
        message: json.message || "An error occurred during API request",
        error: json.error || res.statusText,
      };
    }

    const payload =
      json && typeof json === "object"
        ? "data" in json
          ? json.data
          : "user" in json
          ? json.user
          : json
        : json;

    return {
      statusCode: res.status,
      ...(typeof json === "object" && !Array.isArray(json) ? json : {}),
      data: payload as T,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error / API unavailable";
    return {
      statusCode: 503,
      message,
      error: "Service Unavailable",
    };
  }
}
