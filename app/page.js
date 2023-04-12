import Image from "next/image";
import { Inter } from "next/font/google";
import InputForm from '../components/inputForm'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <main className="flex h-screen items-center justify-center w-full">
      <div className="bg-slate-800 w-full h-screen flex items-center justify-center">
        <InputForm/>
      </div>
    </main>
  );
}
