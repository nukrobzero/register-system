import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useRouter } from "next/router";
import axios from "axios";

export default function Scanner({ titlePage, apiURL, backURL }) {
  const router = useRouter();
  const [data, setData] = useState("No result");
  const [detail, setDetail] = useState("");
  const [button, setButton] = useState(false);
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
    setButton(true);
    const formData = {
      room: titlePage,
      email: data,
      detail,
    };
    await axios.post(apiURL, formData, {
      headers: { Authorization: `Bearer ${process.env.SECRET_KEY}` },
    });
    setButton(false);
    if (button === false) {
      setShowModal(false);
      router.reload();
    } else {
      setButton(false);
      setShowModal(false);
      router.reload();
    }
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
                {button ? (
                  <button
                    disabled
                    type="button"
                    className="px-4 py-2 mx-4 mt-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 inline-flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mx-4 mt-4 hover:bg-gray-300"
                    onClick={handleOK}
                  >
                    Ok
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
