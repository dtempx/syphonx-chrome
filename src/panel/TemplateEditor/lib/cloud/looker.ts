
import * as request from "./request";

export const load = async (lookId: number, filters = {} as { [ key: string ]: unknown }) => {
    const { url } = await request.json(`/pricespider/looker-embed-url?look=${lookId}&filters=${JSON.stringify(filters)}`);
    
    return url;
}
