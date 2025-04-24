import { CartList } from "@/components/CartList";
import { ResumenDeCompra } from '../../components/ResumenDeCompra';

export default function CarritoDeCompras() {
    return (
        <div className="flex flex-col flex-grow justify-center container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Carrito de Compras</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                <CartList />
                <ResumenDeCompra />
            </div>
        </div>
    )
}