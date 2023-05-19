import { useReactToPrint } from "react-to-print";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";

interface Props {
  btnOnClick: any;
  btnCheckIn: any;
  qrData: {
    EMAIL: string;
    COMPANY: string;
    FIRSTNAME: string;
    LASTNAME: string;
    JOBTITLE: string;
  };
}

export default function Generate({ btnOnClick, btnCheckIn, qrData }: Props) {
  const [value, setValue] = useState("");
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "new document",
    pageStyle: "print",
  });

  useEffect(() => {
    const generateQR = async () => {
      //const qrCode = await QRCode.toDataURL(`${qrData.EMAIL}`);
      const qrCode = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${qrData.EMAIL}`;
      setValue(qrCode);
    };
    generateQR();
  }, [qrData]);

  //checkin regis
  // const hendleCheckin = async () => {};
  return (
    <div>
      <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50 z-[99]">
        <div className="flex flex-col justify-center items-center bg-white w-auto h-[34rem] p-16 rounded-lg space-y-8 transition-all ease-in-out">
          <div className="-mt-12 -mr-[20rem]">
            <button
              onClick={btnOnClick}
              className="text-red-600 hover:text-red-700 cursor-pointer"
            >
              <AiFillCloseCircle size={30} />
            </button>
          </div>
          <div className="flex flex-row justify-center space-x-6">
            <button
              className="text-xl bg-blue-400 hover:bg-blue-600 text-white px-6 py-4 rounded-md"
              onClick={() => {
                handlePrint();
                setTimeout(() => {
                  btnCheckIn();
                }, 1000);
              }}
            >
              Print
            </button>
          </div>
          <div
            ref={componentRef}
            className="flex flex-col items-center justify-center h-screen"
          >
            <h1 className="text-sm font-bold" style={{ fontSize: "16px" }}>
              {qrData.FIRSTNAME} {qrData.LASTNAME}
            </h1>
            <h1 className="text-xs" style={{ fontSize: "14px" }}>
              {qrData.JOBTITLE}
            </h1>
            <h1 className="text-xs" style={{ fontSize: "14px" }}>
              {qrData.COMPANY}
            </h1>
            <Image
              src={`${value}`}
              width={300}
              height={300}
              alt={qrData.EMAIL}
              className="!w-[250px] !h-[250px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
