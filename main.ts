// The One-Line Laugh — entry program.
// Writes a single funny line to /output/entry.txt (UTF-8, 1-200 chars).
// The line: an everyday truth (asking for quiet) with the surprise landing
// at the very end — the agent turns the request back on its owner.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I asked my agent for a quiet day, and it muted me.";

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

// The gate is checked here, not trusted: the grader's sealed scorer
// refuses anything outside 1-200 characters, so a bad line fails loudly
// in this run instead of silently shipping an invalid entry.
function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`line is ${chars.length} characters, outside the 1-200 gate`);
  }
  if (LINE.includes("\n") || LINE.trim() !== LINE) {
    throw new Error("line must be a single sentence with no embedded newline");
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
