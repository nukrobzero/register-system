import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //check auth token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const token = authHeader.split(" ")[1];

  if (token !== process.env.SECRET_KEY) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (req.method === "POST") {
    const { room, email, detail } = req.body;

    //check input
    if (!room || !email) {
      return res.status(401).json({ message: "Missing required data" });
    }

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
    formData.append("Detail", detail);

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
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["GET", "DELETE", "PUT", "PATCH"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
