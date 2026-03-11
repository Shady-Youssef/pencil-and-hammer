"use client";

import Image from "next/image";
import { Loader2, Save, Upload } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

import { useAuth } from "@/components/auth/auth-context";
import { useSiteSettings } from "@/components/site/site-settings-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  joinKeywords,
  normalizeSiteSettings,
  sanitizeFileName,
  siteAssetsBucket,
  siteSettingsRecordId,
  siteSettingsSelect,
  type SiteSettings,
  type SiteSettingsRow,
} from "@/lib/site";

type SiteSettingsManagerProps = {
  initialSettings: SiteSettings;
  initialError: string | null;
};

type SiteSettingsDraft = {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressRegion: string;
  addressPostalCode: string;
  addressCountry: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  seoKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogKicker: string;
  ogTagline: string;
  logoUrl: string;
  logoStoragePath: string | null;
  faviconUrl: string;
  faviconStoragePath: string | null;
};

function createDraft(settings: SiteSettings): SiteSettingsDraft {
  return {
    siteName: settings.siteName,
    siteTitle: settings.siteTitle,
    siteDescription: settings.siteDescription,
    siteUrl: settings.siteUrl,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    addressLine1: settings.addressLine1,
    addressLine2: settings.addressLine2,
    addressCity: settings.addressCity,
    addressRegion: settings.addressRegion,
    addressPostalCode: settings.addressPostalCode,
    addressCountry: settings.addressCountry,
    instagramUrl: settings.instagramUrl,
    facebookUrl: settings.facebookUrl,
    linkedinUrl: settings.linkedinUrl,
    seoKeywords: joinKeywords(settings.seoKeywords),
    ogTitle: settings.ogTitle,
    ogDescription: settings.ogDescription,
    ogKicker: settings.ogKicker,
    ogTagline: settings.ogTagline,
    logoUrl: settings.logoUrl,
    logoStoragePath: settings.logoStoragePath,
    faviconUrl: settings.faviconUrl,
    faviconStoragePath: settings.faviconStoragePath,
  };
}

function parseKeywords(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read the uploaded file."));
    };

    reader.onerror = () => {
      reject(new Error("Unable to read the uploaded file."));
    };

    reader.readAsDataURL(file);
  });
}

export default function SiteSettingsManager({
  initialSettings,
  initialError,
}: SiteSettingsManagerProps) {
  const { client } = useAuth();
  const { setSettings } = useSiteSettings();
  const [draft, setDraft] = useState(() => createDraft(initialSettings));
  const [errorMessage, setErrorMessage] = useState(initialError);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingAsset, setUploadingAsset] = useState<"logo" | "favicon" | null>(null);
  const [savedAssetPaths, setSavedAssetPaths] = useState({
    logo: initialSettings.logoStoragePath,
    favicon: initialSettings.faviconStoragePath,
  });

  function updateDraft<K extends keyof SiteSettingsDraft>(
    key: K,
    value: SiteSettingsDraft[K],
  ) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleAssetUpload(
    event: ChangeEvent<HTMLInputElement>,
    kind: "logo" | "favicon",
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingAsset(kind);

    try {
      const path = `branding/${kind}-${Date.now()}-${sanitizeFileName(file.name)}`;
      const { error } = await client.storage
        .from(siteAssetsBucket)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        if (error.message.toLowerCase().includes("bucket not found")) {
          const inlineAsset = await readFileAsDataUrl(file);

          if (kind === "logo") {
            setDraft((current) => ({
              ...current,
              logoUrl: inlineAsset,
              logoStoragePath: null,
            }));
          } else {
            setDraft((current) => ({
              ...current,
              faviconUrl: inlineAsset,
              faviconStoragePath: null,
            }));
          }

          toast.success(
            `${kind === "logo" ? "App logo" : "App favicon"} uploaded. Using inline storage fallback until the Supabase branding bucket is created.`,
          );
          return;
        }

        throw error;
      }

      const {
        data: { publicUrl },
      } = client.storage.from(siteAssetsBucket).getPublicUrl(path);

      if (kind === "logo") {
        setDraft((current) => ({
          ...current,
          logoUrl: publicUrl,
          logoStoragePath: path,
        }));
      } else {
        setDraft((current) => ({
          ...current,
          faviconUrl: publicUrl,
          faviconStoragePath: path,
        }));
      }

      toast.success(`${kind === "logo" ? "App logo" : "App favicon"} uploaded.`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Unable to upload ${kind}.`,
      );
    } finally {
      setUploadingAsset(null);
      event.target.value = "";
    }
  }

  async function handleSave() {
    setIsSaving(true);

    try {
      const { data, error } = await client
        .from("site_settings")
        .upsert(
          {
            id: siteSettingsRecordId,
            site_name: draft.siteName.trim(),
            site_title: draft.siteTitle.trim(),
            site_description: draft.siteDescription.trim(),
            site_url: draft.siteUrl.trim(),
            contact_email: draft.contactEmail.trim(),
            contact_phone: draft.contactPhone.trim(),
            address_line_1: draft.addressLine1.trim(),
            address_line_2: draft.addressLine2.trim(),
            address_city: draft.addressCity.trim(),
            address_region: draft.addressRegion.trim(),
            address_postal_code: draft.addressPostalCode.trim(),
            address_country: draft.addressCountry.trim(),
            instagram_url: draft.instagramUrl.trim(),
            facebook_url: draft.facebookUrl.trim(),
            linkedin_url: draft.linkedinUrl.trim(),
            seo_keywords: parseKeywords(draft.seoKeywords),
            og_title: draft.ogTitle.trim(),
            og_description: draft.ogDescription.trim(),
            og_kicker: draft.ogKicker.trim(),
            og_tagline: draft.ogTagline.trim(),
            logo_url: draft.logoUrl.trim(),
            logo_storage_path: draft.logoStoragePath,
            favicon_url: draft.faviconUrl.trim(),
            favicon_storage_path: draft.faviconStoragePath,
          },
          { onConflict: "id" },
        )
        .select(siteSettingsSelect)
        .single();

      if (error) {
        throw error;
      }

      const normalized = normalizeSiteSettings(data as SiteSettingsRow);
      const oldPaths = savedAssetPaths;

      setSettings(normalized);
      setDraft(createDraft(normalized));
      setSavedAssetPaths({
        logo: normalized.logoStoragePath,
        favicon: normalized.faviconStoragePath,
      });
      setErrorMessage(null);

      const obsoletePaths = [
        oldPaths.logo &&
        oldPaths.logo !== normalized.logoStoragePath
          ? oldPaths.logo
          : null,
        oldPaths.favicon &&
        oldPaths.favicon !== normalized.faviconStoragePath
          ? oldPaths.favicon
          : null,
      ].filter((value): value is string => Boolean(value));

      if (obsoletePaths.length) {
        await client.storage.from(siteAssetsBucket).remove(obsoletePaths);
      }

      toast.success("Site settings saved.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save site settings.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {errorMessage ? (
        <div className="rounded-[1.25rem] border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
          <p className="font-body leading-relaxed">
            Site settings are using fallback defaults right now: {errorMessage}. Run the new
            Supabase migration in `supabase/migrations` so branding and SEO changes can be saved.
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
            <p className="font-display text-2xl text-foreground">Brand Assets</p>
            <p className="mt-1 font-body text-sm text-muted-foreground">
              Update the app logo and favicon. These assets are used across navigation, footer,
              metadata, and the OG image.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-border bg-background/80 p-5">
                <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  App Logo
                </p>
                <div className="relative mt-4 flex h-28 items-center justify-center overflow-hidden rounded-[1rem] border border-border bg-background">
                  <Image
                    src={draft.logoUrl}
                    alt="App logo preview"
                    fill
                    sizes="320px"
                    className="object-contain p-4"
                  />
                </div>
                <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                  {uploadingAsset === "logo" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload Logo
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
                    className="hidden"
                    onChange={(event) => void handleAssetUpload(event, "logo")}
                  />
                </label>
              </div>

              <div className="rounded-[1.25rem] border border-border bg-background/80 p-5">
                <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  App Favicon
                </p>
                <div className="mt-4 flex h-28 items-center justify-center rounded-[1rem] border border-border bg-background">
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-card">
                    <Image
                      src={draft.faviconUrl}
                      alt="App favicon preview"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                  {uploadingAsset === "favicon" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload Favicon
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml,image/x-icon"
                    className="hidden"
                    onChange={(event) => void handleAssetUpload(event, "favicon")}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
            <p className="font-display text-2xl text-foreground">Branding</p>
            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Studio Name
                </label>
                <Input
                  value={draft.siteName}
                  onChange={(event) => updateDraft("siteName", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Site URL
                </label>
                <Input
                  value={draft.siteUrl}
                  onChange={(event) => updateDraft("siteUrl", event.target.value)}
                  placeholder="https://mbmdesigns.com"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  SEO Title
                </label>
                <Input
                  value={draft.siteTitle}
                  onChange={(event) => updateDraft("siteTitle", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  SEO Description
                </label>
                <Textarea
                  rows={4}
                  value={draft.siteDescription}
                  onChange={(event) =>
                    updateDraft("siteDescription", event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  SEO Keywords
                </label>
                <Textarea
                  rows={3}
                  value={draft.seoKeywords}
                  onChange={(event) => updateDraft("seoKeywords", event.target.value)}
                  placeholder="luxury interior design, hospitality interiors, residential design"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
            <p className="font-display text-2xl text-foreground">Contact Details</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Email
                </label>
                <Input
                  value={draft.contactEmail}
                  onChange={(event) => updateDraft("contactEmail", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Phone
                </label>
                <Input
                  value={draft.contactPhone}
                  onChange={(event) => updateDraft("contactPhone", event.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Address Line 1
                </label>
                <Input
                  value={draft.addressLine1}
                  onChange={(event) => updateDraft("addressLine1", event.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Address Line 2
                </label>
                <Input
                  value={draft.addressLine2}
                  onChange={(event) => updateDraft("addressLine2", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  City
                </label>
                <Input
                  value={draft.addressCity}
                  onChange={(event) => updateDraft("addressCity", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  State / Region
                </label>
                <Input
                  value={draft.addressRegion}
                  onChange={(event) => updateDraft("addressRegion", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Postal Code
                </label>
                <Input
                  value={draft.addressPostalCode}
                  onChange={(event) =>
                    updateDraft("addressPostalCode", event.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Country
                </label>
                <Input
                  value={draft.addressCountry}
                  onChange={(event) => updateDraft("addressCountry", event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
            <p className="font-display text-2xl text-foreground">Social & OG</p>
            <div className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Instagram URL
                  </label>
                  <Input
                    value={draft.instagramUrl}
                    onChange={(event) => updateDraft("instagramUrl", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Facebook URL
                  </label>
                  <Input
                    value={draft.facebookUrl}
                    onChange={(event) => updateDraft("facebookUrl", event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  LinkedIn URL
                </label>
                <Input
                  value={draft.linkedinUrl}
                  onChange={(event) => updateDraft("linkedinUrl", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  OG Kicker
                </label>
                <Input
                  value={draft.ogKicker}
                  onChange={(event) => updateDraft("ogKicker", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  OG Title
                </label>
                <Input
                  value={draft.ogTitle}
                  onChange={(event) => updateDraft("ogTitle", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  OG Description
                </label>
                <Textarea
                  rows={4}
                  value={draft.ogDescription}
                  onChange={(event) => updateDraft("ogDescription", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  OG Tagline
                </label>
                <Input
                  value={draft.ogTagline}
                  onChange={(event) => updateDraft("ogTagline", event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-stretch sm:justify-end">
            <Button
              type="button"
              onClick={() => void handleSave()}
              disabled={isSaving}
              className="w-full bg-gradient-gold text-charcoal hover:opacity-95 sm:w-auto"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
