import Layout from "@/components/Layout/layout";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import QRCode from "qrcode";
import Image from "next/image";
import Link from "next/link";

export default function Print() {
  const router = useRouter();
  const { data } = router.query;
  const [value, setValue] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "new document",
    pageStyle: "print",
  });

  useEffect(() => {
    const generateQR = async () => {
      const qrCode = await QRCode.toDataURL(`${data}`);
      //const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=[300]x[300]`;
      setValue(qrCode);
    };
    generateQR();
  }, [data]);

  console.log(value);
  return (
    <Layout>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-center space-x-6">
          <button
            className="text-2xl bg-blue-400 hover:bg-blue-600 text-white px-6 py-4 "
            onClick={handlePrint}
          >
            Print
          </button>
          <Link
            href={"/"}
            className="text-2xl bg-yellow-400 hover:bg-yellow-600 text-white px-6 py-4 "
          >
            Return
          </Link>
        </div>
        <div
          ref={componentRef}
          className="flex flex-col items-center justify-center h-screen"
        >
          <Image
            src={value}
            width={300}
            height={300}
            alt="ts"
            layout="responsive"
          />
        </div>
      </div>
    </Layout>
  );
}
