export interface ApiErrorResponse {
    error: string;
    status?: number;
}

export class ApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
    if (typeof data !== "object" || data === null) return false;
    const obj = data as Record<string, unknown>;
    return typeof obj.error === "string";
}
