'use client';

import { getProducts } from "@/api/productsAPI";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Search: React.FC = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (search.trim() === "") {
            return;
        } else {
            const productos = await getProducts();
            const resultado = productos.filter((producto) => producto.name.toLowerCase() === search.toLowerCase());

            if (resultado.length === 0) {
                toast.error('Producto no encontrado');
                return;
            } else {
                router.push(`/product/${resultado[0].id}`);
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Buscar producto"
                    className="w-96 h-10 rounded-sm p-3"
                    value={search}
                    onChange={handleSearch}
                />
                <button
                    type="submit"
                    className="w-20 h-10 bg-blue-600 rounded-sm text-white font-bold"
                >
                    Buscar
                </button>
            </form>
        </>
    )
}