
import * as request from "./request";

interface PortalParams {
    params?: Record<string, unknown>;
}

export async function loadPortal(params: PortalParams, userId?: string) {
    const headers: Record<string, string> = userId ? { Authorization: `Bearer u/${userId}` } : {};
    const data = await request.json(`/portal?params=${JSON.stringify(params.params || "{}")}`, { headers });
    return data as { dialogUrl: string; panelUrl: string; };
}
