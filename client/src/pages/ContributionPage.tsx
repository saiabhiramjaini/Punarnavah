import { UploadContributionType } from "@abhiram2k03/punarnavah-common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";
import { backendUrl } from "../utils/config";
import toast from "react-hot-toast";

export const ContributionPage = () => {
    const [data, setData] = useState<UploadContributionType>({
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        quantity: 0,
        wasteRequestId: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { id: wasteRequestId = "" } = useParams<{ id: string }>();

    // Update wasteRequestId in the state once
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            wasteRequestId,
        }));
    }, [wasteRequestId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: name === "quantity" ? Number(value) : value // Convert 'quantity' to a number
        });
    };


    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${backendUrl}/api/v1/contributions/${wasteRequestId}`,
                data
            );
            console.log(response.data.message);

            if (response.status === 201) {
                toast.success("Bulk waste created successfully");
                // navigate("");
            } else {
                console.error("Error occurred", response.data.error[0].message);
                toast.error(response.data.error[0].message);
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error("Session expired. Please log in again.");
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
        <div>
            <InputBox
                label={"mobile"}
                type={"text"}
                placeholder={"mobile"}
                name={"mobile"}
                onChange={handleChange}
            />
            <InputBox
                label={"address"}
                type={"text"}
                placeholder={"address"}
                name={"address"}
                onChange={handleChange}
            />
            <InputBox
                label={"city"}
                type={"text"}
                placeholder={"city"}
                name={"city"}
                onChange={handleChange}
            />
            <InputBox
                label={"state"}
                type={"text"}
                placeholder={"state"}
                name={"state"}
                onChange={handleChange}
            />
            <InputBox
                label={"pincode"}
                type={"text"}
                placeholder={"pincode"}
                name={"pincode"}
                onChange={handleChange}
            />
            <InputBox
                label={"quantity"}
                type={"number"}
                placeholder={"quantity"}
                name={"quantity"}
                onChange={handleChange}
            />
            <Button text={"Submit"} onClick={handleSubmit} />
        </div>
    );
};