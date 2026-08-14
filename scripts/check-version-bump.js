#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function getLocalVersions() {
  const rootPkgPath = path.resolve(__dirname, "..", "package.json");
  const cliPkgPath = path.resolve(__dirname, "..", "cli", "package.json");

  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));
  const cliPkg = fs.existsSync(cliPkgPath)
    ? JSON.parse(fs.readFileSync(cliPkgPath, "utf8"))
    : null;

  return { rootVersion: rootPkg.version, cliVersion: cliPkg ? cliPkg.version : null };
}

function getRemoteVersion() {
  try {
    // Try to get package.json from upstream tracking branch or origin/main
    let remoteJson = null;
    try {
      remoteJson = execSync("git show @{u}:package.json 2>nul || git show origin/main:package.json 2>nul", {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });
    } catch {
      // Unix fallback
      remoteJson = execSync("git show @{u}:package.json 2>/dev/null || git show origin/main:package.json 2>/dev/null", {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });
    }

    if (remoteJson) {
      const parsed = JSON.parse(remoteJson);
      return parsed.version || null;
    }
  } catch {
    // Remote might not exist yet or offline
    return null;
  }
  return null;
}

function run() {
  console.log("\n🔍 Memeriksa perubahan versi sebelum git push...");

  const { rootVersion, cliVersion } = getLocalVersions();
  const remoteVersion = getRemoteVersion();

  // If both exist, ensure they are synced
  if (cliVersion && rootVersion !== cliVersion) {
    console.error(`\n❌ PUSH DITOLAK: Versi tidak sinkron!`);
    console.error(`- package.json     : ${rootVersion}`);
    console.error(`- cli/package.json : ${cliVersion}`);
    console.error(`Pastikan kedua file memiliki versi yang sama.\n`);
    process.exit(1);
  }

  if (!remoteVersion) {
    console.log(`ℹ️  Tidak menemukan versi remote pembanding (mungkin branch baru). Push diizinkan dengan versi: ${rootVersion}\n`);
    process.exit(0);
  }

  if (rootVersion === remoteVersion) {
    console.error("\n" + "=".repeat(60));
    console.error("⛔ PUSH DITOLAK: Versi belum diubah!");
    console.error(`Versi lokal (${rootVersion}) masih sama dengan versi remote origin (${remoteVersion}).`);
    console.error(`Silakan ubah/naikkan versi di package.json & cli/package.json.`);
    console.error("=".repeat(60) + "\n");
    process.exit(1);
  }

  console.log(`✅ Version check lolos: ${remoteVersion} ➔ ${rootVersion}\n`);
  process.exit(0);
}

run();
