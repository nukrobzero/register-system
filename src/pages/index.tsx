import Headers from "@/components/Layout/header";
import Layout from "@/components/Layout/layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

export default function Home() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const [aferSubmit, setAfterSubmit] = useState(false);
  const [alert, setAlert] = useState("");

  const hendelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName === "") return null;
    const formData = {
      company,
      email,
      firstName,
      lastName,
      jobTitle,
    };
    try {
      const res = await axios.post(`/api/formRegister`, formData);
      if (res.status === 202) {
        setAlert(email);
        return null;
      }
      setAfterSubmit(!aferSubmit);
      setAlert("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Headers content="ลงทะเบียน" title="Register " />
      <div>
        <div className="flex flex-col justify-center h-auto py-12 w-80 md:w-[50rem]">
          <div className="flex justify-center">
            <Image
              src={`https://www.sumipol.com/wp-content/uploads/2023/05/banner-SxM-2-1.png.webp`}
              width={1920}
              height={500}
              alt="bg-cover"
              layout="responsive"
              style={{ objectFit: "cover" }}
              className="rounded-t-md"
            />
          </div>
          {aferSubmit !== true ? (
            <form
              onSubmit={hendelSubmit}
              className="space-y-6 shadow-lg p-12 bg-white rounded-b-md"
            >
              <div className="bg-gradient-to-r from-[#0083CA] via-green-400 to-[#0083CA] rounded-lg text-white py-2 px-4 shadow-lg flex items-center cursor-default mb-4">
                <h1 className="md:text-xl font-semibold">
                  ลงทะเบียน (Register)
                </h1>
              </div>
              <div>
                <label
                  htmlFor="company-name"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Company name
                </label>
                <input
                  type="text"
                  id="company-name"
                  onChange={(e) =>
                    setCompany(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100 bg-slate-100"
                  placeholder="Company name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineMail size={20} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100 pl-10"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="pt-2 text-red-600">
                  <span>
                    {alert !== "" ? `อีเมล์ ${alert} มีการลงทะเบียนแล้ว` : ""}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first-name"
                  onChange={(e) =>
                    setFirstName(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  onChange={(e) =>
                    setLastName(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="job-title"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Job title
                </label>
                <input
                  type="text"
                  id="job-title"
                  onChange={(e) =>
                    setJobTitle(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100"
                  placeholder=""
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="shadow-lg p-12 bg-white rounded-b-md">
              <h1 className="text-base text-black font-semibold text-center">
                ขอบคุณที่ท่านได้ลงทะเบียนล่วงหน้า
                ทางเราได้ส่งบัตรเข้างานไปให้ท่านทางอีเมล์
              </h1>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
