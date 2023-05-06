import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center max-w-screen-2xl mx-auto p-4 ${inter.className} bg-gradient-to-b from-gray-900 to-gray-600`}
    >
      {children}
    </main>
  );
}
