"use server";

import { writeFile, appendFile } from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";
type ArtistData = {
  name: string;
  bio: string;
  categories: string[];
  languages: string[];
  feeRange: string;
  location: string;
  phone: string;
  email: string;
  experience: string;
  portfolio?: string;
  profileImage?: File | { base64: string }; // Depending on usage
};
function escapeCSV(
  value: string | string[] | { base64: string } | File | undefined
): string {
  if (Array.isArray(value)) {
    value = value.join(", ");
  }
  const stringified = String(value).replace(/"/g, '""');
  return `"${stringified}"`;
}

export async function saveArtistToCSV(data: ArtistData) {
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
