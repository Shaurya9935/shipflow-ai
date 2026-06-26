const { App } = require("octokit");
const dotenv = require("dotenv");
const path = require("path");

// Load root .env
dotenv.config({ path: path.join(__dirname, "../../.env") });

async function main() {
  const appId = process.env.GITHUB_APP_ID;
  const rawKey = process.env.GITHUB_PRIVATE_KEY;

  if (!appId || !rawKey) {
    console.error("Missing GITHUB_APP_ID or GITHUB_PRIVATE_KEY");
    process.exit(1);
  }

  let cleanedKey = rawKey;
  if (cleanedKey.startsWith('"') && cleanedKey.endsWith('"')) {
    cleanedKey = cleanedKey.substring(1, cleanedKey.length - 1);
  }
  cleanedKey = cleanedKey.replace(/\\n/g, "\n");

  try {
    const app = new App({
      appId: appId,
      privateKey: cleanedKey,
    });

    console.log("Fetching installations...");
    const { data: installations } = await app.octokit.request("GET /app/installations");
    console.log("SUCCESS_INSTALLATIONS:", JSON.stringify(installations.map(inst => ({
      id: inst.id,
      accountLogin: inst.account?.login || null,
      accountType: inst.target_type || null,
      accountId: inst.account?.id || null
    }))));
  } catch (err) {
    console.error("GITHUB AUTH ERROR:", err.message);
  }
  
  process.exit(0);
}

main();
