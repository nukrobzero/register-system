import { Inter } from "next/font/google";
import Footer from "./footer";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className} bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-gray-800`}
    >
      {children}
      <Footer />
    </main>
  );
}
