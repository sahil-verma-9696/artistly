"use server";

import { writeFile, appendFile, readFile } from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";

function escapeCSV(value: any): string {
  if (Array.isArray(value)) {
    value = value.join(", ");
  }
  const stringified = String(value).replace(/"/g, '""');
  return `"${stringified}"`;
}

export async function saveArtistToCSV(data: Record<string, any>) {
  const dir = path.join(process.cwd(), "public", "submissions");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const filename = "artists.csv";
  const filePath = path.join(dir, filename);

  const headers = Object.keys(data);
  const values = Object.values(data).map(escapeCSV);
  const line = `${values.join(",")}\n`;

  // Create file with headers if it doesn't exist
  if (!existsSync(filePath)) {
    const headerLine = `${headers.join(",")}\n`;
    await writeFile(filePath, headerLine + line, "utf-8");
  } else {
    await appendFile(filePath, line, "utf-8");
  }

  return {
    success: true,
    fileName: filename,
    filePath: `/submissions/${filename}`,
  };
}
