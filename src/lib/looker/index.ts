
import * as crypto from "crypto";

const nonce = (len: number) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < len; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

interface EmbedCredentials {
    external_user_id: string;
    first_name: string;
    last_name: string;
    secret: string;
    look_id: number;
    filters?: {[ key: string ]: string };
}

const LOOKER_SESSION_MAX_SECONDS = 259200; // 3 days
const createEmbedUrl = (options: EmbedCredentials) => {
    const { external_user_id, first_name, last_name, secret, look_id, } = options;
    const filters = options.filters || {};

    const host = `looker.pricespider.com`;
    let embedPath = `/login/embed/${encodeURIComponent(`/embed/dashboards/${look_id}`)}`;
    
    const filterParams = Object.keys(filters)?.length ? Object.keys(filters).map(key => `${key}=${filters![key]}`) : [];
    
    if (filterParams?.length)
        embedPath += encodeURIComponent(`?${filterParams.join("&")}`);

    const params = {
        nonce: nonce(16),
        time: Math.floor(new Date().getTime() / 1000),
        session_length: LOOKER_SESSION_MAX_SECONDS,
        external_user_id,
        permissions: [ "access_data", "see_looks", "see_user_dashboards" ],
        models: ["bigQuery_venom"],
        group_ids: [ 33 ],
        external_group_id: "",
        user_attributes: {},
        access_filters: {},
    } as { [ key: string ]: unknown };

    const otherParams = {
        first_name,
        last_name,
        force_logout_login: true,
    }

    const params_to_sign = `${Object.keys(params).reduce((a: string[], b: string) => { a.push(`${JSON.stringify(params[b])}`); return a}, []).join('\n')}`;
    const string_to_sign = `${host}\n${embedPath}\n${params_to_sign}`;

    const signature = crypto
        .createHmac("sha1", secret)
        .update(decodeURIComponent(encodeURIComponent(string_to_sign)))
        .digest("base64")
        .trim();

    const finalParams = { ...params, ...otherParams } as any;

    const queryParams = `${Object.keys(finalParams).reduce((a: string[], b: string) => { a.push(`${encodeURIComponent(b)}=${encodeURIComponent(JSON.stringify(finalParams[b]))}`); return a}, []).join('&')}&signature=${encodeURIComponent(signature)}`;

    const url = `https://${host}${embedPath}?${queryParams}`;

    return url;
}

export const load = async (look_id: number, filters?: {[ key: string ]: string }) => {
    const url = createEmbedUrl({
        external_user_id: "842708eb-fd17-4348-b5c5-2f920fea217e",
        first_name: "SyphonX",
        last_name: "Chrome Extension",
        secret: "xxx",
        look_id,
        filters
    });

    return url;
}
