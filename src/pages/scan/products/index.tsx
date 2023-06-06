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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href={`/scan/products/rockwell-hardness-testing`}
              className="bg-green-500 px-4 py-2 rounded-sm"
            >
              Rockwell Hardness Testing
            </Link>
            <Link
              href={`/scan/products/roundtracer`}
              className="bg-orange-400 px-4 py-2 rounded-sm"
            >
              Roundtracer
            </Link>
            <Link
              href={`/scan/products/contour-Measuring-Machine`}
              className="bg-slate-500 px-4 py-2 rounded-sm"
            >
              Contour Measuring Machine
            </Link>
            <Link
              href={`/scan/products/vision-measuring-system`}
              className="bg-pink-500 px-4 py-2 rounded-sm"
            >
              Vision Measuring System
            </Link>
            <Link
              href={`/scan/products/small-tools`}
              className="bg-blue-800 px-4 py-2 rounded-sm"
            >
              Small Tools
            </Link>
            <Link
              href={`/scan/products/surface-roughness-measurement`}
              className="bg-red-400 px-4 py-2 rounded-sm"
            >
              Surface Roughness Measurement
            </Link>
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
