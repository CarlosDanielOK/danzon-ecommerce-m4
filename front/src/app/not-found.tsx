import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-grow flex-col items-center justify-center h-[730px] bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
            <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Volver al inicio</Link>
        </div>
    )
}