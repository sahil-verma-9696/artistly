import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Upload } from "lucide-react";
import { Button } from "../ui/button";

export default function ProfileUpload() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Upload your profile image</p>
          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
          <Button type="button" variant="outline" className="mt-4">
            Choose File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
