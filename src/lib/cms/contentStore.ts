import { promises as fs } from 'fs';
import path from 'path';

export type CmsSection = 'products' | 'chatbot-knowledge' | 'site-settings' | 'pages-content';

const sectionFileMap: Record<CmsSection, string> = {
  products: 'products.json',
  'chatbot-knowledge': 'chatbot-knowledge.json',
  'site-settings': 'site-settings.json',
  'pages-content': 'pages-content.json',
};

const cmsRoot = path.join(process.cwd(), 'src', 'content', 'cms');

const resolvePath = (section: CmsSection) => {
  const fileName = sectionFileMap[section];
  return path.join(cmsRoot, fileName);
};

export const readCmsSection = async <T>(section: CmsSection): Promise<T> => {
  const filePath = resolvePath(section);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
};

export const writeCmsSection = async <T>(section: CmsSection, value: T) => {
  const filePath = resolvePath(section);
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
};

export const isCmsSection = (value: string): value is CmsSection => {
  return Object.keys(sectionFileMap).includes(value);
};

export const isValidCmsKey = (providedKey: string | null) => {
  const expectedKey = process.env.CMS_ADMIN_PASSWORD;

  if (!expectedKey) {
    return false;
  }

  return providedKey === expectedKey;
};
