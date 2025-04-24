/* eslint-disable @next/next/no-img-element */
import { getProductById } from "@/api/productsAPI"
import { IProductDetailProps } from "@/interfaces/types"
import { AddToCart } from '../../../components/AddToCart';

export default async function ProductDetail({ params }: IProductDetailProps) {
    const { id } = await params;
    const producto = await getProductById(id);

    return (
        <div className="flex flex-grow justify-center items-center">
            <div className="bg-white flex items-center w-[1000px] h-[700px] rounded-md shadow-md">
                <div className="h-full w-1/2">
                    <img src={producto.image} alt={producto.name} className="h-full object-contain p-5" />
                </div>
                <div className="h-full w-1/2 flex flex-col justify-center p-5 gap-4">
                    <h2 className="text-4xl font-bold">{producto.name}</h2>
                    <p className="text-4xl">${producto.price}</p>
                    <p>Descripción: {producto.description}</p>
                    <p className="font-bold">Stock: {producto.stock}</p>
                    <p>ID del producto: {id}</p>
                    <AddToCart product={producto} />
                </div>
            </div>
        </div>
    )
}