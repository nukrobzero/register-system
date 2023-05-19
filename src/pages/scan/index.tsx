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
            <ul className="flex justify-center gap-4">
              <Link href={`/scan/seminar`}>
                <li className="bg-green-500 px-4 py-2 rounded-sm">Seminar</li>
              </Link>
              <Link href={`/scan/products`}>
                <li className="bg-orange-400 px-4 py-2 rounded-sm">Products</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
