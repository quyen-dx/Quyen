import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
      </div>
      <Toaster />
    </>
  );
}