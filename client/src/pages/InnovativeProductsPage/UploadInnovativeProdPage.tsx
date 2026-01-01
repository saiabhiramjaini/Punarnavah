import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  backendUrl,
  cloudinaryCloudName,
  cloudinaryUploadPreset,
  cloudinaryURL,
} from "../../utils/config";
import { UploadInnovativeProductType } from "@abhiram2k03/punarnavah-common";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Sparkles, ImagePlus } from "lucide-react";

export const UploadInnovativeProdPage = () => {
  const [uploadReq, setUploadReq] = useState<UploadInnovativeProductType>({
    image: "",
    name: "",
    description: "",
    quantity: 0,
    materialsUsed: "",
    price: 0,
  });
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);
    formData.append("cloud_name", cloudinaryCloudName);

    axios.defaults.withCredentials = false;
    const response = await axios.post(cloudinaryURL, formData);
    axios.defaults.withCredentials = true;
    return response.data.secure_url;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUploadReq((prevState) => ({
      ...prevState,
      [name]: name === "quantity" || name === "price" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = uploadReq.image;
      if (selectedImg instanceof File) {
        imageUrl = await uploadImage(selectedImg);
      }

      const updatedUploadReq = {
        ...uploadReq,
        image: imageUrl,
        quantity: Number(uploadReq.quantity),
        price: Number(uploadReq.price),
      };

      const response = await axios.post(`${backendUrl}/api/v1/innovative-prod`, updatedUploadReq);

      if (response.status === 201) {
        toast.success("Innovative Product created successfully");
        navigate(`/profile`);
      } else {
        toast.error(response.data.error[0].message);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please login to continue.");
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        const errorMessage =
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred";
        toast.error(errorMessage);
      }
      setError("Product creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Section - Image Upload */}
        <div className="lg:w-2/5 bg-primary/80 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-secondary-foreground/50" />
                <span className="text-xs uppercase tracking-[0.2em] text-secondary-foreground/80 font-medium">
                  Marketplace
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-secondary-foreground mb-3">
                Sell Your Creation
              </h1>
              <p className="text-secondary-foreground/70">
                Showcase your innovative upcycled product to the world
              </p>
            </div>

            {/* Image Upload Area */}
            <label className="block cursor-pointer">
              <div className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 ${previewUrl
                ? "border-secondary-foreground/50 bg-secondary-foreground/10"
                : "border-secondary-foreground/30 hover:border-secondary-foreground/50 bg-secondary-foreground/5"
                }`}>
                {previewUrl ? (
                  <div className="relative aspect-video">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium">Click to change</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <div className="w-16 h-16 rounded-full bg-secondary-foreground/20 flex items-center justify-center mb-4">
                      <ImagePlus className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <p className="text-secondary-foreground font-medium mb-1">
                      Drop your product image here
                    </p>
                    <p className="text-secondary-foreground/60 text-sm">
                      or click to browse
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-xl mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Product Details
              </h2>
              <p className="text-muted-foreground">
                Tell buyers about your innovative creation
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g., Recycled Tote Bag"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="e.g., 299"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="e.g., 10"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantityUnit">Unit</Label>
                  <select
                    id="quantityUnit"
                    name="quantityUnit"
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select unit</option>
                    <option value="gms">Grams</option>
                    <option value="kgs">Kilograms</option>
                    <option value="tons">Tonnes</option>
                    <option value="units">Units</option>
                  </select>
                </div>


              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product, its features, and what makes it special..."
                  rows={3}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="materialsUsed">Materials Used</Label>
                <Textarea
                  id="materialsUsed"
                  name="materialsUsed"
                  placeholder="List the upcycled/recycled materials used in your product..."
                  rows={3}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Listing Product...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    List Your Product
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadInnovativeProdPage;
