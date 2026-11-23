import { collections } from "../db.js";
import { env } from "../config/env.js";
import { uploadRemoteImage } from "../utils/imgbb.js";

if (!env.IMGBB_API_KEY) throw new Error("Add IMGBB_API_KEY to mentorlagbe-server/.env before running this command");

const { tuitions } = await collections();
const externalImages = await tuitions.find({
  bannerImage: { $not: /^https:\/\/(?:i\.)?ibb\.co\//i },
}).toArray();

let migrated = 0;
for (const tuition of externalImages) {
  if (!tuition._id || !tuition.bannerImage) continue;
  const safeName = `mentorlagbe-${tuition.subject}-${tuition._id}`.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const bannerImage = await uploadRemoteImage(tuition.bannerImage, safeName);
  await tuitions.updateOne({ _id: tuition._id }, { $set: { bannerImage, updatedAt: new Date() } });
  migrated++;
  console.log(`Migrated ${migrated}/${externalImages.length}: ${tuition.title}`);
}

console.log(`ImgBB migration complete: ${migrated} tuition image(s) updated.`);
process.exit(0);
