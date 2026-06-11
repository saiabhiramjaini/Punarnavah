import { Response } from "express";
import crypto from "crypto";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { AuthenticatedRequest } from "../utils/types";

const cashfree = new Cashfree(
  CFEnvironment.PRODUCTION,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

const generateOrderId = (): string => {
  const uniqueId = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);
  return hash.digest("hex").substring(0, 12);
};

export const payment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { amount, phone } = req.body;
    const user = req.user!;

    const request = {
      order_amount: amount,
      order_currency: "INR",
      order_id: generateOrderId(),
      customer_details: {
        customer_id: user.id,
        customer_phone: phone,
        customer_name: user.username,
        customer_email: user.email,
      },
    };

    cashfree.PGCreateOrder(request)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error.response?.data?.message);
        res.status(500).json({ message: "Payment order creation failed" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyPayment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { orderId } = req.body;

    cashfree.PGOrderFetchPayments(orderId)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error(error.response?.data?.message);
        res.status(500).json({ message: "Payment verification failed" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
