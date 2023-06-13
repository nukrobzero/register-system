import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";
import axios from "axios";

export default function Scanner({ titlePage, apiURL, backURL }) {
  const router = useRouter();
  const [data, setData] = useState("No result");
  const [detail, setDetail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef(null);

  const handleScan = (result, error) => {
    if (!!result) {
      setData(result?.text);
      setShowModal(true);

      qrRef.current.stop();
    }

    if (!!error) {
      console.info(error);
    }
  };

  const handleBack = () => {
    router.push(backURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.reload();
  };

  const handleOK = async () => {
    const formData = {
      room: titlePage,
      email: data,
      detail,
    };
    await axios.post(apiURL, formData, {
      headers: { Authorization: `Bearer ${process.env.SECRET_KEY}` },
    });
    router.reload();
  };

  return (
    <>
      <main className="flex flex-col mt-[5rem] justify-center items-center p-4">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-4 text-neutral-200 text-center">
            QR Scanner for {titlePage}
          </h1>
          <div>
            <QrReader
              className="lg:h-[400px] lg:w-[400px] h-[340px] w-[340px]"
              onResult={handleScan}
              constraints={{ facingMode: "environment" }}
              style={{ width: "40%", height: "60%" }}
              ref={qrRef}
            />
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
                <p className="font-semibold">
                  Customer:<span className="font-normal">{data}</span>
                </p>
                <div className="mt-2">
                  <label className="font-semibold">Detail:</label>
                  <input
                    type="text"
                    id="detail"
                    onChange={(e) => setDetail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100"
                  />
                </div>
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
