import Layout from "@/components/Layout/layout";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineArrowLeft,
} from "react-icons/ai";

export default function Home() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");

  const [aferSubmit, setAfterSubmit] = useState(false);
  const [alert, setAlert] = useState("");
  const [button, setButon] = useState(false);
  const [selectDate, setSelectDate] = useState<string>("");
  const [checkbox0, setCheckBox0] = useState<string[]>([]);
  const [checkbox1, setCheckBox1] = useState<string[]>([]);
  const [checkbox2, setCheckBox2] = useState<string[]>([]);
  const [checkbox3, setCheckBox3] = useState<string[]>([]);
  const [checkbox4, setCheckBox4] = useState<string[]>([]);
  const [checkbox5, setCheckBox5] = useState<string[]>([]);
  const [checkbox6, setCheckBox6] = useState<string[]>([]);
  const [checkbox7, setCheckBox7] = useState<string[]>([]);
  const [checkbox8, setCheckBox8] = useState<string[]>([]);
  const [checkValueCheckBox, setCheckValueCheckBox] = useState(0);
  const hendelSubmit = async (e: React.FormEvent) => {
    setButon(true);
    e.preventDefault();
    if (firstName === "") return null;
    if (
      checkbox0.length === 0 &&
      checkbox1.length === 0 &&
      checkbox2.length === 0 &&
      checkbox3.length === 0 &&
      checkbox4.length === 0 &&
      checkbox5.length === 0 &&
      checkbox6.length === 0 &&
      checkbox7.length === 0 &&
      checkbox8.length === 0
    ) {
      setCheckValueCheckBox(1);
      setButon(false);
      return;
    }

    const formData = {
      company,
      email,
      firstName,
      lastName,
      jobTitle,
      phone,
      selectDate,
      checkbox0: checkbox0[0] || "",
      checkbox1: checkbox1[0] || "",
      checkbox2: checkbox2[0] || "",
      checkbox3: checkbox3[0] || "",
      checkbox4: checkbox4[0] || "",
      checkbox5: checkbox5[0] || "",
      checkbox6: checkbox6[0] || "",
      checkbox7: checkbox7[0] || "",
      checkbox8: checkbox8[0] || "",
    };
    try {
      const res = await axios.post(`/api/formRegister`, formData, {
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY}`,
        },
      });
      if (res.status === 202) {
        setAlert(email);
        setButon(false);
        return null;
      }
      setAfterSubmit(!aferSubmit);
      setButon(false);
      setAlert("");
      setSelectDate("");
      setCheckBox0([]);
      setCheckBox1([]);
      setCheckBox2([]);
      setCheckBox3([]);
      setCheckBox4([]);
      setCheckBox5([]);
      setCheckBox6([]);
      setCheckBox7([]);
      setCheckBox8([]);
      setCheckValueCheckBox(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Register - Sumipol x Mitutoyo Day 2023</title>
        <meta name="description" content="ลงทะเบียน" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo-SMP-Agile-Technology.png" />
      </Head>
      <div className="flex flex-col justify-center h-auto pt-12 pb-20 w-80 md:w-[45rem] lg:w-[50rem]">
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
            className="space-y-6 shadow-lg p-5 md:p-12 bg-white rounded-b-md"
          >
            <div className="bg-gradient-to-r from-[#0083CA] via-green-400 to-[#0083CA] rounded-lg text-white py-2 px-4 shadow-lg flex items-center cursor-default mb-4">
              <h1 className="md:text-xl font-semibold">ลงทะเบียน (Register)</h1>
            </div>
            <div>
              <label
                htmlFor="company-name"
                className="block mb-2 text-sm font-medium text-black"
              >
                Company name<span className="text-red-600">*</span>
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
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100"
                placeholder="Company name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="first-name"
                className="block mb-2 text-sm font-medium text-black"
              >
                First name<span className="text-red-600">*</span>
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
                placeholder="First name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block mb-2 text-sm font-medium text-black"
              >
                Last name<span className="text-red-600">*</span>
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
                placeholder="Last name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Email<span className="text-red-600">*</span>
                <span className="md:ml-2 block md:inline text-red-600 text-xs">
                  สำหรับท่านใดที่จะใช้อีเมล์เดียวในการสมัครหลายคนทำได้ดังนี้
                  <span className="bg-blue-500 text-white px-1 md:p-1 ml-1 rounded-md">
                    emailname+firstname@example.com
                  </span>
                </span>
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
              <div className="pt-2 text-red-600 text-xs md:text-base">
                <span>
                  {alert !== "" ? `อีเมล์ ${alert} มีการลงทะเบียนแล้ว` : ""}
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="phone-number"
                className="block mb-2 text-sm font-medium text-black"
              >
                Phone number<span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <AiOutlinePhone
                    size={20}
                    style={{ transform: "rotate(90deg)" }}
                  />
                </div>
                <input
                  type="text"
                  id="phone-number"
                  onChange={(e) => {
                    const input = e.target.value
                      .replace(/\D/g, "")
                      .substring(0, 10);
                    const match = input.match(/^(\d{2})(\d{3})(\d{4})$/);
                    const matchPhone = input.match(/^(\d{3})(\d{3})(\d{4})$/);
                    if (match) {
                      e.target.value = `${match[1]}-${match[2]}-${match[3]}`;
                    } else if (matchPhone) {
                      e.target.value = `${matchPhone[1]}-${matchPhone[2]}-${matchPhone[3]}`;
                    } else {
                      e.target.value = input;
                    }
                    setPhone(e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100 pl-10"
                  placeholder="02-3456-789, 012-345-6789"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="job-title"
                className="block mb-2 text-sm font-medium text-black"
              >
                Job title<span className="text-red-600">*</span>
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
                placeholder="Job title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="joinDate"
                className="block mb-2 text-sm font-medium text-black"
              >
                ท่านสนใจมาร่วมงานวันไหน<span className="text-red-600">*</span>
              </label>
              <select
                onChange={(e) => {
                  setSelectDate(e.target.value);
                  setCheckBox0([]);
                  setCheckBox1([]);
                  setCheckBox2([]);
                  setCheckBox3([]);
                  setCheckBox4([]);
                  setCheckBox5([]);
                  setCheckBox6([]);
                  setCheckBox7([]);
                  setCheckBox8([]);
                  setCheckValueCheckBox(0);
                }}
                required
                className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0083CA] focus:border-transparent bg-slate-100"
              >
                <option value={``}>โปรดเลือก</option>
                <option value={`14 June`}>14 มิถุนายน</option>
                <option value={`15 June`}>15 มิถุนายน</option>
                <option value={`14-15 June`}>14-15 มิถุนายน</option>
              </select>
            </div>

            {selectDate === "14 June" ? (
              <div>
                <label
                  htmlFor="seminar"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  สนใจเข้าร่วมงาน สัมมนา/นิทรรศการ ใดบ้าง (สามารถเลือกได้มากกว่า
                  1 ข้อ)
                  <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping0"
                      name="topping0"
                      value={`งาน "นิทรรศการ" (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox0([...checkbox0, e.target.value]);
                        } else {
                          setCheckBox0(
                            checkbox0.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox0.includes(
                        `งาน "นิทรรศการ" (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-violet-500 p-0.5 text-white rounded-sm mr-1">
                        Exhibition
                      </span>
                      งาน &quot;นิทรรศการ&quot;
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping1"
                      name="topping1"
                      value={`การเพิ่มประสิทธิภาพการทำงานของเครื่อง CMM (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox1([...checkbox1, e.target.value]);
                        } else {
                          setCheckBox1(
                            checkbox1.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox1.includes(
                        `การเพิ่มประสิทธิภาพการทำงานของเครื่อง CMM (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-blue-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงเช้า
                      </span>
                      การเพิ่มประสิทธิภาพการทำงานของเครื่อง CMM
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping2"
                      name="topping2"
                      value={`การจัดการเครื่องมือวัดพื้นฐาน การบำรุงรักษาตลอดจนการซ่อมแซม (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox2([...checkbox2, e.target.value]);
                        } else {
                          setCheckBox2(
                            checkbox2.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox2.includes(
                        `การจัดการเครื่องมือวัดพื้นฐาน การบำรุงรักษาตลอดจนการซ่อมแซม (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-blue-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงเช้า
                      </span>
                      การจัดการเครื่องมือวัดพื้นฐาน
                      การบำรุงรักษาตลอดจนการซ่อมแซม
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping3"
                      name="topping3"
                      value={`นวัตกรรมการวัดระนาบผิว การวัดความเรียบผิวและการวัดรูปร่างที่มีความแม่นยำสูง (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox3([...checkbox3, e.target.value]);
                        } else {
                          setCheckBox3(
                            checkbox3.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox3.includes(
                        `นวัตกรรมการวัดระนาบผิว การวัดความเรียบผิวและการวัดรูปร่างที่มีความแม่นยำสูง (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-orange-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงบ่าย
                      </span>
                      นวัตกรรมการวัดระนาบผิว
                      การวัดความเรียบผิวและการวัดรูปร่างที่มีความแม่นยำสูง
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping4"
                      name="topping4"
                      value={`การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox4([...checkbox4, e.target.value]);
                        } else {
                          setCheckBox4(
                            checkbox4.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox4.includes(
                        `การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-orange-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงบ่าย
                      </span>
                      การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ
                    </span>
                  </div>
                </div>
                {checkValueCheckBox === 1 ? (
                  <div className="mt-2 text-sm">
                    <span className="text-red-500">โปรดเลือก 1 ข้อขึ้นไป</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {selectDate === "15 June" ? (
              <div>
                <label
                  htmlFor="seminar"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  สนใจเข้าร่วมงาน สัมมนา/นิทรรศการ ใดบ้าง (สามารถเลือกได้มากกว่า
                  1 ข้อ)
                  <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping0"
                      name="topping0"
                      value={`งาน "นิทรรศการ" (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox0([...checkbox0, e.target.value]);
                        } else {
                          setCheckBox0(
                            checkbox0.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox0.includes(
                        `งาน "นิทรรศการ" (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-violet-500 p-0.5 text-white rounded-sm mr-1">
                        Exhibition
                      </span>
                      งาน &quot;นิทรรศการ&quot;
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping1"
                      name="topping1"
                      value={`นวัตกรรมการวัดโดยใช้กล้องสำหรับอุตสาหกรรม (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox1([...checkbox1, e.target.value]);
                        } else {
                          setCheckBox1(
                            checkbox1.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox1.includes(
                        `นวัตกรรมการวัดโดยใช้กล้องสำหรับอุตสาหกรรม (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-blue-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงเช้า
                      </span>
                      นวัตกรรมการวัดโดยใช้กล้องสำหรับอุตสาหกรรม
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping2"
                      name="topping2"
                      value={`การจัดการเครื่องมือวัดพื้นฐาน การบำรุงรักษาตลอดจนการซ่อมแซม (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox2([...checkbox2, e.target.value]);
                        } else {
                          setCheckBox2(
                            checkbox2.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox2.includes(
                        `การจัดการเครื่องมือวัดพื้นฐาน การบำรุงรักษาตลอดจนการซ่อมแซม (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-blue-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงเช้า
                      </span>
                      การจัดการเครื่องมือวัดพื้นฐาน
                      การบำรุงรักษาตลอดจนการซ่อมแซม
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping3"
                      name="topping3"
                      value={`การทดสอบความแข็ง ระดับพื้นฐานและการสอบเทียบ (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox3([...checkbox3, e.target.value]);
                        } else {
                          setCheckBox3(
                            checkbox3.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox3.includes(
                        `การทดสอบความแข็ง ระดับพื้นฐานและการสอบเทียบ (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-orange-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงบ่าย
                      </span>
                      การทดสอบความแข็ง ระดับพื้นฐานและการสอบเทียบ
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping4"
                      name="topping4"
                      value={`การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox4([...checkbox4, e.target.value]);
                        } else {
                          setCheckBox4(
                            checkbox4.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox4.includes(
                        `การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-orange-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงบ่าย
                      </span>
                      การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ
                    </span>
                  </div>
                </div>
                {checkValueCheckBox === 1 ? (
                  <div className="mt-2 text-sm">
                    <span className="text-red-500">โปรดเลือก 1 ข้อขึ้นไป</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {selectDate === "14-15 June" ? (
              <div>
                <label
                  htmlFor="seminar"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  สนใจเข้าร่วมงาน สัมมนา/นิทรรศการ ใดบ้าง (สามารถเลือกได้มากกว่า
                  1 ข้อ)
                  <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <h1 className="ml-4">14-15 มิถุนายน</h1>
                  <div className="space-x-1 flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="topping0"
                      name="topping0"
                      value={`งาน "นิทรรศการ" (${selectDate})`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox0([...checkbox0, e.target.value]);
                        } else {
                          setCheckBox0(
                            checkbox0.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox0.includes(
                        `งาน "นิทรรศการ" (${selectDate})`
                      )}
                    />
                    <span>
                      <span className="bg-violet-500 p-0.5 text-white rounded-sm mr-1">
                        Exhibition
                      </span>
                      งาน &quot;นิทรรศการ&quot;
                    </span>
                  </div>
                  <h1 className="ml-4">14 มิถุนายน</h1>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping1"
                      name="topping1"
                      value={`การเพิ่มประสิทธิภาพการทำงานของเครื่อง CMM (14 June)`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox1([...checkbox1, e.target.value]);
                        } else {
                          setCheckBox1(
                            checkbox1.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox1.includes(
                        `การเพิ่มประสิทธิภาพการทำงานของเครื่อง CMM (14 June)`
                      )}
                    />
                    <span>
                      <span className="bg-blue-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงเช้า 14 มิถุนายน
                      </span>
                      การเพิ่มประสิทธิภาพการทำงานของเครื่อง CMM
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping2"
                      name="topping2"
                      value={`การจัดการเครื่องมือวัดพื้นฐาน การบำรุงรักษาตลอดจนการซ่อมแซม (14 June)`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox2([...checkbox2, e.target.value]);
                        } else {
                          setCheckBox2(
                            checkbox2.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox2.includes(
                        `การจัดการเครื่องมือวัดพื้นฐาน การบำรุงรักษาตลอดจนการซ่อมแซม (14 June)`
                      )}
                    />
                    <span>
                      <span className="bg-blue-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงเช้า 14 มิถุนายน
                      </span>
                      การจัดการเครื่องมือวัดพื้นฐาน
                      การบำรุงรักษาตลอดจนการซ่อมแซม
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping3"
                      name="topping3"
                      value={`นวัตกรรมการวัดระนาบผิว การวัดความเรียบผิวและการวัดรูปร่างที่มีความแม่นยำสูง (14 June)`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox3([...checkbox3, e.target.value]);
                        } else {
                          setCheckBox3(
                            checkbox3.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox3.includes(
                        `นวัตกรรมการวัดระนาบผิว การวัดความเรียบผิวและการวัดรูปร่างที่มีความแม่นยำสูง (14 June)`
                      )}
                    />
                    <span>
                      <span className="bg-orange-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงบ่าย 14 มิถุนายน
                      </span>
                      นวัตกรรมการวัดระนาบผิว
                      การวัดความเรียบผิวและการวัดรูปร่างที่มีความแม่นยำสูง
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping4"
                      name="topping4"
                      value={`การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ (14 June)`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox4([...checkbox4, e.target.value]);
                        } else {
                          setCheckBox4(
                            checkbox4.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox4.includes(
                        `การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ (14 June)`
                      )}
                    />
                    <span>
                      <span className="bg-orange-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงบ่าย 14 มิถุนายน
                      </span>
                      การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ
                    </span>
                  </div>
                  <h1 className="ml-4 mt-2">15 มิถุนายน</h1>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping5"
                      name="topping5"
                      value={`นวัตกรรมการวัดโดยใช้กล้องสำหรับอุตสาหกรรม (15 June)`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox5([...checkbox5, e.target.value]);
                        } else {
                          setCheckBox5(
                            checkbox5.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox5.includes(
                        `นวัตกรรมการวัดโดยใช้กล้องสำหรับอุตสาหกรรม (15 June)`
                      )}
                    />
                    <span>
                      <span className="bg-blue-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงเช้า 15 มิถุนายน
                      </span>
                      นวัตกรรมการวัดโดยใช้กล้องสำหรับอุตสาหกรรม
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping6"
                      name="topping6"
                      value={`การจัดการเครื่องมือวัดพื้นฐาน การบำรุงรักษาตลอดจนการซ่อมแซม (15 June)`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox6([...checkbox6, e.target.value]);
                        } else {
                          setCheckBox6(
                            checkbox6.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox6.includes(
                        `การจัดการเครื่องมือวัดพื้นฐาน การบำรุงรักษาตลอดจนการซ่อมแซม (15 June)`
                      )}
                    />
                    <span>
                      <span className="bg-blue-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงเช้า 15 มิถุนายน
                      </span>
                      การจัดการเครื่องมือวัดพื้นฐาน
                      การบำรุงรักษาตลอดจนการซ่อมแซม
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping7"
                      name="topping7"
                      value={`การทดสอบความแข็ง ระดับพื้นฐานและการสอบเทียบ (15 June)`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox7([...checkbox7, e.target.value]);
                        } else {
                          setCheckBox7(
                            checkbox7.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox7.includes(
                        `การทดสอบความแข็ง ระดับพื้นฐานและการสอบเทียบ (15 June)`
                      )}
                    />
                    <span>
                      <span className="bg-orange-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงบ่าย 15 มิถุนายน
                      </span>
                      การทดสอบความแข็ง ระดับพื้นฐานและการสอบเทียบ
                    </span>
                  </div>
                  <div className="space-x-1 flex items-center">
                    <input
                      type="checkbox"
                      id="topping8"
                      name="topping8"
                      value={`การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ (15 June)`}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckBox8([...checkbox8, e.target.value]);
                        } else {
                          setCheckBox8(
                            checkbox8.filter((item) => item !== e.target.value)
                          );
                        }
                      }}
                      checked={checkbox8.includes(
                        `การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ (15 June)`
                      )}
                    />
                    <span>
                      <span className="bg-orange-400 p-0.5 text-white rounded-sm mr-1">
                        ช่วงบ่าย 15 มิถุนายน
                      </span>
                      การสอบเทียบเครื่องมือวัดที่มีความแม่นยําและมีประสิทธิภาพ
                    </span>
                  </div>
                </div>
                {checkValueCheckBox === 1 ? (
                  <div className="mt-2 text-sm">
                    <span className="text-red-500">โปรดเลือก 1 ข้อขึ้นไป</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {button ? (
              <button
                disabled
                type="button"
                className="py-2.5 px-5 w-full md:w-auto text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center"
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
                type="submit"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-[45px] py-2.5 text-center"
              >
                Submit
              </button>
            )}
          </form>
        ) : (
          <div className="shadow-lg p-12 bg-white rounded-b-md">
            <div className="flex flex-col justify-center items-center space-y-4">
              <h1 className="text-base text-black font-semibold text-center">
                ขอบคุณที่ท่านได้ลงทะเบียนล่วงหน้า
                ทางเราได้ส่งบัตรเข้างานไปให้ท่านทางอีเมล์
              </h1>
              <button
                onClick={() => setAfterSubmit(false)}
                className="hover:underline hover:text-blue-400"
              >
                <span className="flex flex-row items-center space-x-1">
                  <span>
                    <AiOutlineArrowLeft size={20} />
                  </span>
                  <span>ย้อนกลับ</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
