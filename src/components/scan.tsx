import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";
import axios from "axios";

interface ScannerProps {
  titlePage: string;
  apiURL: string;
}

export default function Scanner({ titlePage, apiURL }: ScannerProps) {
  const router = useRouter();
  const [data, setData] = useState("No result");
  const [showModal, setShowModal] = useState(false);
  const [scanEnabled, setScanEnabled] = useState(true);

  const handleScan = (result: any, error: any) => {
    if (!!result) {
      setData(result?.text);
      setShowModal(true);
      setScanEnabled(false);
    }

    if (!!error) {
      console.info(error);
    }
  };

  const handleBack = () => {
    setScanEnabled(false);
    router.push("/scan");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setScanEnabled(true);
    router.reload();
  };

  const handleOK = async () => {
    await axios.post(apiURL, { data });
    setScanEnabled(true);
    router.reload();
  };

  return (
    <>
      <main className="flex flex-col mt-[5rem] justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">
            QR Scanner for {titlePage}
          </h1>
          <div>
            {scanEnabled && (
              <QrReader
                className="lg:h-[400px] lg:w-[400px] h-[300px] w-[300px]"
                onResult={handleScan}
                constraints={{ facingMode: "environment" }}
                //@ts-ignore
                style={{ width: "40%", height: "40%" }}
              />
            )}
          </div>
          <button
            onClick={handleBack}
            className=" bg-yellow-200 m-4 text-md rounded-md px-4 py-2 hover:underline"
          >
            Back
          </button>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-md p-4">
                <p className="text-xl font-bold mb-2">Scanned data:</p>
                <p>{data}</p>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mt-4 hover:bg-gray-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mx-4 mt-4 hover:bg-gray-300"
                  onClick={handleOK}
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
