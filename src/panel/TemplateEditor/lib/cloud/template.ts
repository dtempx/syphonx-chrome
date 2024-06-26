import { SyphonXApi, SyphonXApiOptions, FileMetadata } from "syphonx-lib";
import { Template } from "../Template";
import { validateSession, User } from "./user";

export interface OpenTemplateResult {
    template: Template;
    contract?: string;
}

export interface TemplateContext {
    user?: User;
    serviceUrl: string;
}

export interface LoadTemplateDirectoryOptions extends TemplateContext {
    glob?: string;
    regex?: string;
    url?: string;
}

export async function openTemplate(file: string, { user, serviceUrl }: TemplateContext, revision?: string): Promise<OpenTemplateResult> {
    const token = validateSession(user) ? `u/${user?.id}` : undefined;
    const { version } = chrome.runtime.getManifest();
    const api = new SyphonXApi(token, { url: serviceUrl, appVersion: version });
    const [json, , contract] = await api.read(file, revision);
    const template = new Template(json);
    return { template, contract };
}

export async function saveTemplate(template: Template, file: string, context: TemplateContext): Promise<void> {
    const json = template.file();
    const api = createApiKey(context);
    await api.write(file, json);
}

export async function loadTemplateDirectory({ glob, regex, url, ...context }: LoadTemplateDirectoryOptions): Promise<string[]> {
    const api = createApiKey(context);
    const directory = await api.directory({ glob, regex, url });
    const files = directory
        .filter(file => file.name?.endsWith(".json") || file.type !== "file") // only .json files for now
        .map(file => file.name);
    return files;
}

export async function loadTemplateRevisions(file: string, context: TemplateContext): Promise<FileMetadata[]> {
    const api = createApiKey(context);
    const result = await api.revisions(file);
    return result;
}

function createApiKey({ serviceUrl, user }: TemplateContext) {
    const token = validateSession(user) ? `u/${user?.id}` : undefined;
    const { version } = chrome.runtime.getManifest();
    const options: SyphonXApiOptions = {
        url: serviceUrl,
        appVersion: version
    };
    const api = new SyphonXApi(token, options);
    return api;
}
