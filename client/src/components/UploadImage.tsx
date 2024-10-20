import React, { useState } from "react";

interface UploadImageParams {
  name: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadImage = ({ name, handleImageChange }: UploadImageParams) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    }
    handleImageChange(e); // Call the parent-provided function for handling image changes
  };

  return (
    <div>
      <input
        type="file"
        id="imgUpload"
        name={name}
        onChange={onImageChange}
        className="mt-1"
        required
        accept=".jpg,.png"
      />
      {preview && (
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "80vw", // Responsive width (80% of viewport width)
              maxWidth: "500px", // Cap at 500px on larger screens
              height: "80vw", // Make it a square
              maxHeight: "500px", // Cap height at 500px
              objectFit: "cover",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          />
        </div>
      )}
    </div>
  );
};
