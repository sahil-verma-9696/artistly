import React, { useState, useEffect, DragEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Upload } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { UseFormReturn } from "react-hook-form";
import type { FormData } from "./onboarding-form";
import Image from "next/image";

type Props = {
  form: UseFormReturn<FormData>;
};

export default function ProfileUpload({ form }: Props) {
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    onChange: (file: File) => void
  ) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onChange(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload your profile image (Max 5 MB)</FormLabel>
              <FormControl>
                <div>
                  {/* Drop area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                      isDragOver
                        ? "border-primary bg-gray-50"
                        : "border-gray-300"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => handleDrop(e, field.onChange)}
                    onClick={() =>
                      document.getElementById("hidden-file-input")?.click()
                    }
                  >
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-1">
                      {fileName || "Click or drag & drop your image here"}
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG, WEBP up to 5MB
                    </p>
                  </div>

                  {/* Hidden input */}
                  <Input
                    id="hidden-file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setFileName(file.name);
                        setPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {previewUrl && (
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={previewUrl}
              alt="Profile Preview"
              width={500}
              height={500}
              className="w-full max-h-[300px] object-cover rounded"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
