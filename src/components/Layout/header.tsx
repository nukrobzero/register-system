import Head from "next/head";

interface Props {
  titles: string;
  content: string;
}

export default function Headers({ titles, content }: Props) {
  return (
    <Head>
      <title>{titles} | Sumipol x Mitutoyo Day 2023</title>
      <meta name="description" content={content} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/Logo-SMP-Agile-Technology.png" />
    </Head>
  );
}
