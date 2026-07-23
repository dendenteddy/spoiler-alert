// Points at the local FastAPI backend during development.
// Set EXPO_PUBLIC_API_URL in .env for a different host (e.g. Android emulator
// needs http://10.0.2.2:8000, a physical device needs your machine's LAN IP).
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

// TODO(auth): login/session screens are being built separately. Once a real
// Supabase session exists, swap this for the session's access_token (e.g.
// `(await supabase.auth.getSession()).data.session?.access_token`), so every
// apiFetch call below picks it up automatically.
export const getAccessToken = async (): Promise<string | null> => {
    return null;
};

export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const apiFetch = async (path: string, options: RequestInit = {}): Promise<Response> => {
    const token = await getAccessToken();
    const headers = new Headers(options.headers);
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${API_URL}${path}`, { ...options, headers });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new ApiError(res.status, text || `Request to ${path} failed with status ${res.status}`);
    }

    return res;
};

export type IdentifiedProduct = {
    barcode?: string | null;
    product_name: string;
    brands: string;
    categories: string;
    image_url: string;
    source: "open_food_facts" | "gemini";
};

// Looks up a scanned barcode via the backend, which checks Open Food Facts
// (and falls back to Gemini image identification when a photo is provided).
export const identifyProduct = async (barcode: string): Promise<IdentifiedProduct> => {
    const form = new FormData();
    form.append("barcode", barcode);

    const res = await apiFetch("/food/identify", {
        method: "POST",
        body: form,
    });

    return res.json();
};

export type NewItem = {
    item_name: string;
    quantity: number;
    expiry_date?: string | null;
    reminder_at?: string | null;
    category?: string;
    description?: string | null;
};

export const createItem = async (item: NewItem) => {
    const res = await apiFetch("/items/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });

    return res.json();
};
