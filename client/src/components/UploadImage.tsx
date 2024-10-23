import React, { useState } from "react"
import { Upload, Image as ImageIcon, X } from "lucide-react"

interface UploadImageParams {
  name: string
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const UploadImage = ({ name, handleImageChange }: UploadImageParams) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setPreview(fileUrl)
    }
    handleImageChange(e)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const fileUrl = URL.createObjectURL(file)
      setPreview(fileUrl)
      handleImageChange(e as any)
    }
  }

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPreview(null)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <label
        htmlFor="imgUpload"
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors overflow-hidden ${
          dragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:bg-gray-50"
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
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG or JPG (MAX. 800x400px)</p>
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
        <div className="mt-4 flex items-center justify-between bg-gray-100 rounded-lg p-3">
          <div className="flex items-center">
            <ImageIcon className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700 truncate">Image uploaded successfully</span>
          </div>
          <button
            onClick={removeImage}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default UploadImage;