import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { company, email, firstName, lastName, jobTitle } = req.body;
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
        subject: "Register Ticket for Sumipol x Mitutoyo Day 2023",
        to_email: email,
        from_name: "Sumipol",
        from_email: "no-reply@sumipol.com",
        template_key: "15858645a02d5ed354",
        content_html: `{"CF_HTMLContent": "<img alt='ts' src='https://api.qrserver.com/v1/create-qr-code/?data=${email}&amp;size=300x300'>","CF_FirstName":"${firstName}","CF_LastName":"${lastName}","CF_JobTitle":"${jobTitle}","CF_Company":"${company}"}`,
        report_type: "Full",
      };
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
}
