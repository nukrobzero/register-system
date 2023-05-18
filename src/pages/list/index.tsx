"use client";

import axios from "axios";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { BsQrCode } from "react-icons/bs";
import Pagination from "@/components/Pagination";
import Layout from "@/components/Layout/layout";
import Head from "next/head";
import { GetStaticProps } from "next";
import Generate from "../../components/generate";

type Props = {
  page: any;
};

export default function TableDefault({ page }: Props) {
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [valueDataToQR, setValueDataToQR] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(0);

  // Data/page
  const [perPage, setPerPage] = useState(10);

  const handleKeyDown = (event: any) => {
    if (event.keyCode) {
      event.preventDefault();
    }
  };

  //Send CheckIn register after print QR
  const checkInPrintQR = async () => {
    "use server";
    setIsOpenPopUp(false);
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

    const checkInData = new FormData();
    //@ts-ignore
    checkInData.append("ID", valueDataToQR.ID);
    checkInData.append("CHECKIND1", timestamp);

    try {
      await axios.post(
        "https://script.google.com/macros/s/AKfycbw84TGAE4HrSICBImElMxBpo0VmYMuR8S5NBUyVuCPaZfpCpGTN_jpsSZ_TkFodED5i/exec?action=addCheckIn",
        checkInData
      );
    } catch (error) {
      console.log(error);
    }
  };

  // filter the blogs based on the search query
  const filteredData =
    page &&
    page
      .filter(
        (data: any) =>
          data.EMAIL.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.FIRSTNAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.LASTNAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
          data.PHONE.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(currentPage * perPage, (currentPage + 1) * perPage);

  return (
    <Layout>
      <Head>
        <title>List Register - Sumipol x Mitutoyo Day 2023</title>
        <meta name="description" content="List Register" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo-SMP-Agile-Technology.png" />
      </Head>
      <div>
        <div className="flex flex-col justify-center py-12">
          <h1 className="uppercase font-bold bg-gradient-to-r from-[#0083CA] via-green-400 to-[#0083CA] text-white py-1 px-4 rounded-md shadow-lg border border-gray-300 focus:outline-none focus:ring-2">
            List Register
          </h1>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="relative my-4 shadow-lg">
              <input
                type="text"
                autoFocus={true}
                placeholder="Search..."
                className="border border-gray-300 rounded-lg py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span>
                  <FcSearch size={30} />
                </span>
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-black">
              <thead className="text-xs text-white font-semibold uppercase bg-gradient-to-r from-[#0083CA] via-green-400 to-[#0083CA]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>

                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Generate QR</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length === 0 ? (
                  <tr className="bg-white border-b hover:bg-gray-200">
                    <td colSpan={6} className="text-center py-4">
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredData &&
                  filteredData.map((data: any) => (
                    <tr
                      key={data.ID}
                      className="bg-white border-b hover:bg-gray-200"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                      >
                        {data.EMAIL}
                      </td>
                      <td className="px-6 py-4">{data.FIRSTNAME}</td>
                      <td className="px-6 py-4">{data.LASTNAME}</td>
                      <td className="px-6 py-4">{data.PHONE}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setIsOpenPopUp(!isOpenPopUp),
                              setValueDataToQR(data);
                          }}
                          title="Generate QR"
                          className="text-blue-500 hover:text-blue-800 flex flex-row justify-center items-center"
                        >
                          <BsQrCode size={25} />
                        </button>
                        {isOpenPopUp && (
                          <div>
                            <Generate
                              btnOnClick={() => setIsOpenPopUp(false)}
                              btnCheckIn={checkInPrintQR}
                              //@ts-ignore
                              qrData={valueDataToQR}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Paginate table */}
          <div className="flex justify-center md:justify-end py-4">
            <Pagination
              page={page}
              perPage={perPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const getList = await axios.get(
    `https://script.google.com/macros/s/AKfycbw84TGAE4HrSICBImElMxBpo0VmYMuR8S5NBUyVuCPaZfpCpGTN_jpsSZ_TkFodED5i/exec?action=getData`
  );
  const list = getList.data;
  return {
    props: { page: list },
    revalidate: 1,
  };
};
