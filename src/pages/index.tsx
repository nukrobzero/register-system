import Layout from "@/components/Layout/layout";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handelClickPrint = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/print?data=${input}`);
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center h-screen">
        <form
          onSubmit={handelClickPrint}
          className="flex flex-col justify-center items-center space-y-6 shadow-lg p-4 bg-gray-500 rounded-lg"
        >
          <div>
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Input
            </label>
            <input
              type="text"
              id="base-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-xl font-bold bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
          >
            print qr
          </button>
        </form>
      </div>
    </Layout>
  );
}
