import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      company,
      email,
      firstName,
      lastName,
      jobTitle,
      phone,
      selectDate,
      checkbox0,
      checkbox1,
      checkbox2,
      checkbox3,
      checkbox4,
      checkbox5,
      checkbox6,
      checkbox7,
      checkbox8,
    } = req.body;
    //check input
    if (
      company === undefined &&
      email === undefined &&
      firstName === undefined &&
      lastName === undefined &&
      jobTitle === undefined &&
      phone === undefined
    ) {
      res.status(401).json({ message: "no have paremeter" });
      return;
    }

    const id = uuidv4();
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
    formData.append("ID", id);
    formData.append("COMPANY", company);
    formData.append("EMAIL", email);
    formData.append("FIRSTNAME", firstName);
    formData.append("LASTNAME", lastName);
    formData.append("JOBTITLE", jobTitle);
    formData.append("TIMESTAMP", timestamp);
    formData.append("PHONE", phone);
    formData.append("DateJoin", selectDate);
    formData.append("Exhibition", checkbox0);
    formData.append("Choice1", checkbox1);
    formData.append("Choice2", checkbox2);
    formData.append("Choice3", checkbox3);
    formData.append("Choice4", checkbox4);
    formData.append("Choice5", checkbox5);
    formData.append("Choice6", checkbox6);
    formData.append("Choice7", checkbox7);
    formData.append("Choice8", checkbox8);
    try {
      const response = await axios.post(
        `https://script.google.com/macros/s/AKfycbw84TGAE4HrSICBImElMxBpo0VmYMuR8S5NBUyVuCPaZfpCpGTN_jpsSZ_TkFodED5i/exec?action=addData`,
        formData
      );
      if (response.data === "Record with email already exists") {
        res.status(202).json(response.data);
        return;
      }
      //get session ID TaxiMail
      //   const resTaxiMail = await axios.post(
      //     "https://api.taximail.com/v2/user/login",
      //     {
      //       api_key: process.env.TAXI_MAIL_API_KEY,
      //       secret_key: process.env.TAXI_MAIL_SECRET_KEY,
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      //   if (!resTaxiMail) return;
      //data for send mail
      const dataSendMail = {
        transactional_group_name: "Default",
        subject: "Ticket for Sumipol x Mitutoyo Day 2023",
        to_email: email,
        from_name: "Sumipol",
        from_email: "no-reply@sumipol.com",
        template_key: "15858645a02d5ed354",
        content_html: `{"CF_HTMLContent": "<img alt='ts' src='https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${email}'>","CF_FirstName":"${firstName}","CF_LastName":"${lastName}","CF_JobTitle":"${jobTitle}","CF_Company":"${company}"}`,
        report_type: "Full",
      };
      //https://api.qrserver.com/v1/create-qr-code/?data=${email}&amp;size=300x300
      const sendEmail = await axios.post(
        `https://api.taximail.com/v2/transactional`,
        dataSendMail,
        {
          headers: {
            Authorization: `Bearer ${process.env.TAXI_MAIL_SESSION}`,
          },
        }
      );
      res.status(200).json(sendEmail.data);
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
