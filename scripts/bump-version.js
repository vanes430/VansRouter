#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function bumpVersion() {
  const type = (process.argv[2] || "patch").toLowerCase();
  const rootPkgPath = path.resolve(__dirname, "..", "package.json");
  const cliPkgPath = path.resolve(__dirname, "..", "cli", "package.json");

  if (!fs.existsSync(rootPkgPath)) {
    console.error("❌ package.json not found");
    process.exit(1);
  }

  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));
  let [major, minor, patch] = (rootPkg.version || "0.0.0").split(".").map(Number);

  if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
    console.error(`❌ Invalid semver in package.json: ${rootPkg.version}`);
    process.exit(1);
  }

  const oldVersion = rootPkg.version;

  if (type === "minor") {
    minor += 1;
    patch = 0;
  } else {
    // patch
    patch += 1;
  }

  const newVersion = `${major}.${minor}.${patch}`;

  // Update root package.json
  rootPkg.version = newVersion;
  fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + "\n");

  // Update cli/package.json
  if (fs.existsSync(cliPkgPath)) {
    const cliPkg = JSON.parse(fs.readFileSync(cliPkgPath, "utf8"));
    cliPkg.version = newVersion;
    fs.writeFileSync(cliPkgPath, JSON.stringify(cliPkg, null, 2) + "\n");
  }

  console.log(`\n🚀 Versi berhasil dinaikkan: ${oldVersion} ➔ ${newVersion} (${type})`);
  console.log(`✅ File package.json & cli/package.json sudah disinkronkan.\n`);
}

bumpVersion();
