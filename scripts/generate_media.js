const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const vidDir = path.join(__dirname, "assets", "video");
const imgDir = path.join(__dirname, "assets", "img");

if (!fs.existsSync(vidDir)) fs.mkdirSync(vidDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

async function createMedia() {
  const posterPath = path.join(imgDir, "hero-poster.jpg");
  const mp4Path = path.join(vidDir, "hero.mp4");
  const webmPath = path.join(vidDir, "hero.webm");
  const baseImg = path.join(imgDir, "farmer-rice-field.jpg");

  if (!fs.existsSync(posterPath) && fs.existsSync(baseImg)) {
    execSync(`ffmpeg -y -i "${baseImg}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,eq=contrast=1.1:saturation=1.15" -vframes 1 "${posterPath}"`);
    console.log("Generated hero-poster.jpg");
  }

  if (!fs.existsSync(mp4Path) && fs.existsSync(baseImg)) {
    execSync(`ffmpeg -y -loop 1 -i "${baseImg}" -filter_complex "[0:v]scale=2400:1350,zoompan=z='min(zoom+0.0006,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1920x1080:fps=25,eq=contrast=1.1:brightness=-0.02:saturation=1.1[v]" -map "[v]" -t 12 -c:v libx264 -preset fast -pix_fmt yuv420p -an -movflags +faststart "${mp4Path}"`);
    console.log("Generated hero.mp4");
  }

  if (fs.existsSync(mp4Path) && !fs.existsSync(webmPath)) {
    // Fast realtime WebM VP9 encoding
    execSync(`ffmpeg -y -i "${mp4Path}" -c:v libvpx-vp9 -b:v 1500k -deadline realtime -cpu-used 4 -an "${webmPath}"`);
    console.log("Generated hero.webm");
  }

  // Create placeholders
  const placeholders = [
    {
      name: "placeholder-cleanup.jpg",
      comment: "Ideal shot: volunteers in vibrant shirts with gloves and reusable bags cleaning a scenic coastline at golden hour, candid, high contrast, warm natural light.",
      color: "0x1d3b36",
      label: "Great Global Cleanup"
    },
    {
      name: "placeholder-education.jpg",
      comment: "Ideal shot: diverse youth and students engaged in an outdoor interactive ecology workshop in nature, energetic, natural expressions, crisp daylight.",
      color: "0x1e334a",
      label: "Climate Education"
    },
    {
      name: "placeholder-plastics.jpg",
      comment: "Ideal shot: powerful visual of coastal debris collected for recycling contrasted against pristine marine life or crystal ocean horizon, high contrast documentary style.",
      color: "0x182c3f",
      label: "End Plastics"
    }
  ];

  for (const ph of placeholders) {
    const outPath = path.join(imgDir, ph.name);
    if (!fs.existsSync(outPath)) {
      try {
        execSync(`ffmpeg -y -f lavfi -i "color=c=${ph.color}:s=1200x800:d=1" -vf "drawtext=text='${ph.label}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2-30,drawtext=text='EARTHDAY.ORG Official Campaign':fontcolor=0x72B5B9:fontsize=22:x=(w-text_w)/2:y=(h-text_h)/2+40" -vframes 1 "${outPath}"`);
        console.log(`Generated ${ph.name}`);
      } catch(e) {
        // Fallback without text filter if font not found
        execSync(`ffmpeg -y -f lavfi -i "color=c=${ph.color}:s=1200x800:d=1" -vframes 1 "${outPath}"`);
        console.log(`Generated solid ${ph.name}`);
      }
    }
  }

  console.log("All media created successfully!");
}

createMedia().catch(console.error);
