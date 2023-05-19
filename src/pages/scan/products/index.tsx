import Layout from "@/components/Layout/layout";
import Head from "next/head";
import Link from "next/link";

export default function Scan() {
  return (
    <Layout>
      <Head>
        <title>Scan - Sumipol x Mitutoyo Day 2023</title>
        <meta name="description" content="List Register" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo-SMP-Agile-Technology.png" />
      </Head>
      <div className="text-white py-12">
        <div className="space-y-4">
          <h1 className="text-xl bg-blue-500 px-4 py-2 rounded-sm">Menu</h1>
          <div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={`/scan/products/pd1`}>
                <li className="bg-green-500 px-4 py-2 rounded-sm">pd1</li>
              </Link>
              <Link href={`/scan/products/pd2`}>
                <li className="bg-orange-400 px-4 py-2 rounded-sm">pd2</li>
              </Link>
              <Link href={`/scan/products/pd3`}>
                <li className="bg-slate-500 px-4 py-2 rounded-sm">pd3</li>
              </Link>
              <Link href={`/scan/products/pd4`}>
                <li className="bg-pink-500 px-4 py-2 rounded-sm">pd4</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex justify-center my-20">
          <Link
            href={`/scan`}
            className=" bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 m-4 text-md rounded-md px-4 py-2 hover:underline"
          >
            Back
          </Link>
        </div>
      </div>
    </Layout>
  );
}
