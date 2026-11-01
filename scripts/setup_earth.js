const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const earthDir = path.join(__dirname, "../assets/earth");
if (!fs.existsSync(earthDir)) fs.mkdirSync(earthDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve(false);
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${path.basename(dest)} (${fs.statSync(dest).size} bytes)`);
        resolve(true);
      });
    });
    req.on("error", () => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

// Markers JSON with headquarters and global initiatives
const markersData = [
  {
    "id": "hq",
    "name": "Washington, D.C. Headquarters",
    "lat": 38.9072,
    "lng": -77.0369,
    "type": "Headquarters",
    "description": "Global headquarters of EARTHDAY.ORG, coordinating international campaigns and policy advocacy.",
    "stats": "Founded April 22, 1970 &bull; 1616 P Street NW"
  },
  {
    "id": "india",
    "name": "EARTHDAY.ORG India",
    "lat": 22.5726,
    "lng": 88.3639,
    "type": "Regional Hub",
    "description": "Leading nationwide climate education in thousands of schools and municipal urban greening.",
    "stats": "Engaging 100M+ citizens across all states"
  },
  {
    "id": "africa",
    "name": "EARTHDAY.ORG Africa",
    "lat": -1.2921,
    "lng": 36.8219,
    "type": "Regional Hub",
    "description": "Sub-Saharan grassroots agroforestry, plastic pollution bans, and youth empowerment networks.",
    "stats": "Active across 28 African nations"
  },
  {
    "id": "south-america",
    "name": "EARTHDAY.ORG South America",
    "lat": -23.5505,
    "lng": -46.6333,
    "type": "Regional Hub",
    "description": "Protecting vital Amazonian watersheds and supporting indigenous forest guardians.",
    "stats": "Amazon Basin conservation initiatives"
  },
  {
    "id": "mexico",
    "name": "EARTHDAY.ORG Mexico & Central America",
    "lat": 19.4326,
    "lng": -99.1332,
    "type": "Regional Hub",
    "description": "Coastal cleanup programs and environmental education curricula across Central America.",
    "stats": "Great Global Cleanup partner"
  },
  {
    "id": "canopy-madagascar",
    "name": "Madagascar Canopy Tree Corridor",
    "lat": -18.7669,
    "lng": 46.8691,
    "type": "Canopy Tree Project",
    "description": "Reforesting critical bio-corridors to protect endangered lemurs and endemic flora.",
    "stats": "Over 12M native trees planted"
  },
  {
    "id": "canopy-uganda",
    "name": "Uganda Mount Elgon Reforestation",
    "lat": 1.1304,
    "lng": 34.5385,
    "type": "Canopy Tree Project",
    "description": "Rehabilitating deforested mountain slopes to prevent landslides and restore water tables.",
    "stats": "5.5M agroforestry seedlings distributed"
  },
  {
    "id": "canopy-philippines",
    "name": "Sierra Madre Rainforest Corridor",
    "lat": 15.7500,
    "lng": 121.5000,
    "type": "Canopy Tree Project",
    "description": "Restoring watershed integrity and shielding coastal communities from typhoon surges.",
    "stats": "3.2M native trees planted"
  },
  {
    "id": "cleanup-indonesia",
    "name": "Bali Coastal Cleanup Coalition",
    "lat": -8.4095,
    "lng": 115.1889,
    "type": "Great Global Cleanup",
    "description": "Mobilizing thousands of volunteers to clear marine plastic waste from reefs and beaches.",
    "stats": "850,000 lbs of plastic intercepted"
  },
  {
    "id": "cleanup-greece",
    "name": "Mediterranean Coastal Cleanup",
    "lat": 37.9838,
    "lng": 23.7275,
    "type": "Great Global Cleanup",
    "description": "Removing discarded fishing nets and microplastics across Aegean coastal archipelagos.",
    "stats": "400+ community cleanups coordinated"
  },
  {
    "id": "climate-ed-uk",
    "name": "London Climate Literacy Hub",
    "lat": 51.5074,
    "lng": -0.1278,
    "type": "Climate Education",
    "description": "Integrating environmental science and green economy skills across European primary school curricula.",
    "stats": "Over 1,200 schools enrolled"
  },
  {
    "id": "climate-ed-brazil",
    "name": "São Paulo Sustainable Schools",
    "lat": -23.5505,
    "lng": -46.6333,
    "type": "Climate Education",
    "description": "Youth environmental leadership academies and urban biodiversity demonstration gardens.",
    "stats": "Training 5,000+ educators annually"
  },
  {
    "id": "food-planet-vietnam",
    "name": "Mekong Delta Regenerative Agriculture",
    "lat": 10.0333,
    "lng": 105.7833,
    "type": "Food for Our Planet™",
    "description": "Promoting sustainable no-till rice production, salinity mitigation, and zero food waste.",
    "stats": "Earth Day 2027 showcase farm"
  },
  {
    "id": "food-planet-kenya",
    "name": "Rift Valley Soil Stewardship",
    "lat": 0.5143,
    "lng": 35.2698,
    "type": "Food for Our Planet™",
    "description": "Regenerative soil restoration and drought-resistant community crop cooperatives.",
    "stats": "Supporting 12,000 family farms"
  },
  {
    "id": "plastics-un",
    "name": "Geneva Global Plastics Treaty",
    "lat": 46.2044,
    "lng": 6.1432,
    "type": "End Plastics Advocacy",
    "description": "Lobbying UN member delegates for legally binding global caps on virgin plastic manufacturing.",
    "stats": "Planet vs. Plastics initiative"
  }
];

fs.writeFileSync(path.join(earthDir, "markers.json"), JSON.stringify(markersData, null, 2), "utf8");
console.log("Saved markers.json with 15 global locations.");

async function main() {
  // Download NASA Blue Marble Earth Textures
  console.log("Downloading NASA Earth textures...");
  const textures = [
    { url: "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/land_ocean_ice_2048.jpg", name: "earth-day.jpg" },
    { url: "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/cloud_combined_2048.jpg", name: "earth-clouds.jpg" }
  ];

  for (const t of textures) {
    const dest = path.join(earthDir, t.name);
    if (!fs.existsSync(dest) || fs.statSync(dest).size === 0) {
      console.log(`Downloading ${t.name}...`);
      await downloadFile(t.url, dest);
    }
  }

  // Also download Three.js r128 library to host locally
  const threeDest = path.join(__dirname, "../assets/js/three.min.js");
  if (!fs.existsSync(threeDest)) {
    console.log("Downloading Three.js r128...");
    await downloadFile("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", threeDest);
  }
}

main().catch(console.error);

