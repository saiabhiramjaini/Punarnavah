import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  backendUrl,
  cloudinaryCloudName,
  cloudinaryUploadPreset,
  cloudinaryURL,
} from "../../utils/config";
import { UploadBulkWasteType } from "@abhiram2k03/punarnavah-common";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { ErrorMsgComp } from "../../components/ErrorMsgComp";
import { UploadImage } from "../../components/UploadImage";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Recycle, Leaf, Trash2 } from "lucide-react";

export const UploadBulkWastePage = () => {
  const [uploadReq, setUploadReq] = useState<UploadBulkWasteType>({
    image: "",
    name: "",
    description: "",
    quantityAvailable: 0,
    quantityUnit: "",
    price: 0,
  });
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImg(e.target.files[0]);
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setUploadReq((prevState) => ({
      ...prevState,
      [name]:
        name === "quantityAvailable" || name === "price"
          ? Number(value) || 0
          : value,
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
        quantityAvailable: Number(uploadReq.quantityAvailable),
        price: Number(uploadReq.price),
      };

      const response = await axios.post(
        `${backendUrl}/api/v1/bulk-waste`,
        updatedUploadReq
      );

      if (response.status === 201) {
        toast.success("Bulk waste created successfully");
        navigate(`/profile`);
      } else {
        console.error("Error occurred", response.data.error[0].message);
        toast.error(response.data.error[0].message);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        const errorMessage =
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred";
        toast.error(errorMessage);
      }
      console.error("Error occurred", error);
      setError("Request creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left section for image upload */}
            <div className="w-full lg:w-2/5 p-8 bg-secondary/20 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <Recycle className="absolute top-4 left-4 w-16 h-16 text-primary" />
                <Leaf className="absolute bottom-4 right-4 w-16 h-16 text-primary" />
                <Trash2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-secondary" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  List Your Waste Item
                </h2>
                <p className="text-muted-foreground mb-6">
                  Upload an image of your waste item for recycling or reuse!
                </p>
                <UploadImage name="" handleImageChange={handleImageChange} />
              </div>
            </div>

            {/* Right section for the form */}
            <CardContent className="w-full lg:w-3/5 p-8">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-foreground mb-2">Upload Bulk Waste</h1>
                <p className="text-muted-foreground">Fill in the details below to list industrial materials</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name</Label>
                    <Input id="name" name="name" placeholder="Enter item name" onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantityAvailable">Quantity</Label>
                    <Input id="quantityAvailable" name="quantityAvailable" type="number" placeholder="Enter quantity" onChange={handleInputChange} />
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
                      <option value="tonns">Tonnes</option>
                      <option value="units">Units</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input id="price" name="price" type="number" placeholder="Enter price" onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Item Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your waste item"
                    rows={4}
                    onChange={handleInputChange}
                  />
                </div>
                <ErrorMsgComp error={error!} />
                <div className="pt-4 flex items-center justify-center">
                  <Button type="submit" size="lg" className="w-full sm:w-auto px-12" disabled={loading}>
                    {loading ? "Submitting..." : "List Waste Item"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};