import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { room, email } = req.body;

    const now = new Date();
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Bangkok",
    };
    //@ts-ignore
    const timestamp = now.toLocaleString("en-GB", options);

    const formData = new FormData();
    formData.append("Products", room);
    formData.append("Email", email);
    formData.append("Timestamp", timestamp);

    try {
      const response = await axios.post(
        `https://script.google.com/macros/s/AKfycbyljUagK86FuVBmphMKO17maF2Zgq2OOB6ZpFMEL1lNuv8RCc4UewwQ1N35ybd-JOMA/exec?action=addData`,
        formData
      );
      console.log(response);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
