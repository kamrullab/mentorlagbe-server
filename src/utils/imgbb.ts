import { env } from "../config/env.js";

type ImgBBResponse = {
  data?: { url?: string; display_url?: string };
  error?: { message?: string };
};

export async function uploadRemoteImage(sourceUrl: string, name: string) {
  if (!env.IMGBB_API_KEY) throw new Error("IMGBB_API_KEY is not configured");
  const body = new URLSearchParams({ image: sourceUrl, name });
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(env.IMGBB_API_KEY)}`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  const payload = await response.json() as ImgBBResponse;
  const uploadedUrl = payload.data?.display_url || payload.data?.url;
  if (!response.ok || !uploadedUrl) throw new Error(payload.error?.message || "ImgBB upload failed");
  return uploadedUrl;
}
