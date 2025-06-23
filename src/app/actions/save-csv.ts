"use server";

import { writeFile } from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";

function escapeCSV(value: any): string {
  if (Array.isArray(value)) {
    value = value.join(", ");
  }
  // Escape double quotes and wrap value in double quotes
  const stringified = String(value).replace(/"/g, '""');
  return `"${stringified}"`;
}

export async function saveArtistToCSV(data: Record<string, any>) {
  const headers = Object.keys(data).join(",");

  const values = Object.values(data)
    .map((v) => escapeCSV(v))
    .join(",");

  const csv = `${headers}\n${values}`;

  const dir = path.join(process.cwd(), "public", "submissions");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const filename = `form-submission-${Date.now()}.csv`;
  const filePath = path.join(dir, filename);

  await writeFile(filePath, csv, "utf-8");

  return {
    success: true,
    fileName: filename,
    filePath: `/submissions/${filename}`,
  };
}
