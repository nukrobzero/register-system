import Layout from "@/components/Layout/layout";
import Scanner from "@/components/scan";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ScanSlug() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      <Head>
        <title>Scan {slug as string} - Sumipol x Mitutoyo Day 2023</title>
        <meta name="description" content={`Scan ${slug as string}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo-SMP-Agile-Technology.png" />
      </Head>
      <Scanner
        titlePage={slug as string}
        backURL="/scan/products"
        apiURL={`/api/products`}
      />
    </Layout>
  );
}
