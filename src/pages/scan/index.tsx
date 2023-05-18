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
          <h1 className="text-xl bg-blue-500 px-4 py-2 rounded-sm">Day1</h1>
          <div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={`/scan/room1`}>
                <li className="bg-green-500 px-4 py-2 rounded-sm">room1</li>
              </Link>
              <Link href={`/scan/room2`}>
                <li className="bg-orange-400 px-4 py-2 rounded-sm">room2</li>
              </Link>
              <Link href={`/scan/room3`}>
                <li className="bg-slate-500 px-4 py-2 rounded-sm">room3</li>
              </Link>
              <Link href={`/scan/room4`}>
                <li className="bg-pink-500 px-4 py-2 rounded-sm">room4</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
