import React from "react"
import { Card } from "./Card"
import { getProducts } from "@/api/productsAPI"

export const CardList = async () => {
    const productos = await getProducts();

    return (
        <div className="flex flex-wrap justify-center items-center gap-5 w-11/12 mt-5 mb-8">
            {
                productos.length > 0 ? (
                    productos.map((producto) => (
                        <Card key={producto.id} product={producto} />
                    ))
                ) : (
                    <p>No hay productos para mostrar</p>
                )
            }
        </div>
    )
}