import siteSettingsJson from '@/content/cms/site-settings.json';

export interface SiteSettings {
  brand: {
    name: string;
    tagline: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  socialLinks: {
    whatsapp: string;
    linkedin: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };
  footer: {
    quickLinks: string[];
    serviceLinks: Array<{
      name: string;
      id: string;
    }>;
  };
}

export const defaultSiteSettings: SiteSettings = siteSettingsJson;

export const loadLiveSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const response = await fetch('/api/cms/site-settings', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Failed to load site settings.');
    }

    const payload = await response.json();
    return payload.data as SiteSettings;
  } catch {
    return defaultSiteSettings;
  }
};
