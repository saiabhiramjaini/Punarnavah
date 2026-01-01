import React, { useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface UploadImageParams {
  name: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadImage = ({ name, handleImageChange }: UploadImageParams) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    }
    handleImageChange(e);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      handleImageChange(e as any);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label
        htmlFor="imgUpload"
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors overflow-hidden ${dragActive
            ? "border-primary bg-primary/10"
            : "border-border hover:bg-muted"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain p-2"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={removeImage}
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Upload className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-muted-foreground">
              PNG or JPG (MAX. 800x400px)
            </p>
          </div>
        )}
        <input
          type="file"
          id="imgUpload"
          name={name}
          onChange={onImageChange}
          className="hidden"
          required
          accept=".jpg,.png"
        />
      </label>

      {preview && (
        <Card className="mt-4">
          <CardContent className="flex items-center justify-between p-3">
            <div className="flex items-center">
              <ImageIcon className="w-5 h-5 text-muted-foreground mr-2" />
              <span className="text-sm text-foreground truncate">
                Image uploaded successfully
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeImage}
              className="text-destructive hover:text-destructive"
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadImage;