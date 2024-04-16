import { SyphonXApi, FileMetadata } from "syphonx-lib";
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
    const api = new SyphonXApi(token, serviceUrl, user?.email);
    const [json, , contract] = await api.read(file, revision);
    const template = new Template(json);
    return { template, contract };
}

export async function saveTemplate(template: Template, file: string, { user, serviceUrl }: TemplateContext): Promise<void> {
    const json = template.file();
    const token = validateSession(user) ? `u/${user?.id}` : undefined;
    const api = new SyphonXApi(token, serviceUrl, user?.email);
    await api.write(file, json);
}

export async function loadTemplateDirectory({ user, serviceUrl, ...options }: LoadTemplateDirectoryOptions): Promise<string[]> {
    const token = validateSession(user) ? `u/${user?.id}` : undefined;
    const api = new SyphonXApi(token, serviceUrl, user?.email);
    const directory = await api.directory(options);
    const files = directory
        .filter(file => file.name?.endsWith(".json") || file.type !== "file") // only .json files for now
        .map(file => file.name);
    return files;
}

export async function loadTemplateRevisions(file: string, { user, serviceUrl }: TemplateContext): Promise<FileMetadata[]> {
    const token = validateSession(user) ? `u/${user?.id}` : undefined;
    const api = new SyphonXApi(token, serviceUrl, user?.email);
    const result = await api.revisions(file);
    return result;
}
