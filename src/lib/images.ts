/**
 * Image sources.
 *
 * All photos of Ruth live in Cloudflare R2. Set VITE_R2_BASE_URL to your public
 * R2 bucket / custom domain (e.g. https://media.yourdomain.com) and upload files
 * with the exact keys listed in `r2Key` below. Until then, the bundled fallback
 * artwork is used automatically.
 */
import jasmineBg from "@/assets/jasmine-bg.jpg";
import cake from "@/assets/cake.jpg";
import biryani from "@/assets/biryani.jpg";
import beach from "@/assets/beach.jpg";
import kdrama from "@/assets/kdrama.jpg";
import faith from "@/assets/faith.jpg";
import devops from "@/assets/devops.jpg";
import portrait from "@/assets/portrait-placeholder.jpg";

const R2_BASE = (import.meta.env["VITE_R2_BASE_URL"] as string | undefined)?.replace(/\/$/, "");

/** Returns the R2 URL when configured, otherwise the bundled fallback. */
export function img(r2Key: string, fallback: string): string {
  return R2_BASE ? `${R2_BASE}/${r2Key}` : fallback;
}

export const assets = {
  jasmineBg,
  cake,
  /** Upload ruth/portrait.jpg to R2 to replace the decorative frame. */
  portrait: img("ruth/portrait.jpg", portrait),
  biryani: img("ruth/biryani.jpg", biryani),
  beach: img("ruth/beach.jpg", beach),
  kdrama: img("ruth/kdrama.jpg", kdrama),
  faith: img("ruth/faith.jpg", faith),
  devops: img("ruth/devops.jpg", devops),
};
