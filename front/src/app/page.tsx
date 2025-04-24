import Link from "next/link";

export default function LadingPage() {
  return (
    <main className="flex-grow h-[730px] bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Bienvenido a DANZON</h1>
      <p className="text-lg text-gray-600 mb-8">Encuentra los mejores productos a los mejores precios</p>
      <Link
        href="/home"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Explorar Productos
      </Link>
    </main>
  );
}