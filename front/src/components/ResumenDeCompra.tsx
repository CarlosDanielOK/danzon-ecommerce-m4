'use client';

import { createOrder } from "@/api/orderAPI";
import { IProduct, IUserSession } from "@/interfaces/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const ResumenDeCompra: React.FC = () => {
    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const [cart, setCart] = useState<IProduct[]>([]);
    const router = useRouter();

    // obtiene la sesión del usuario desde las cookies y el carrito desde el localStorage
    useEffect(() => {
        const carrito = localStorage.getItem('cart');
        if (carrito) {
            setCart(JSON.parse(carrito));
        }

        const dataCookie = Cookies.get('userData');
        if (dataCookie) {
            setUserSession(JSON.parse(dataCookie));
        } else {
            setUserSession(null);
        }
    }, []);

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    const costoDeEnvio = 10.00;
    const precioFinal = total + costoDeEnvio;

    const handlePago = async () => {
        if (!userSession) {
            toast.error('Inicia sesión para comprar');
            return router.push('/login');
        }

        const productIds: number[] = cart.map((product) => product.id); // obtiene los ids de los productos
        await createOrder(productIds, userSession.token);
        localStorage.removeItem('cart'); // Limpiar el carrito
        router.push('/dashboard');
    }

    return (
        <>
            {cart.length > 0 ? (
                <div className="text-center p-4">
                    <h3 className="text-xl font-bold">Resumen de compra</h3>
                    <div>
                        <p className="text-lg">Total: ${total.toFixed(2)}</p>
                        <p className="text-lg">Envío: ${costoDeEnvio.toFixed(2)}</p>
                        <p className="text-lg">Precio final: ${precioFinal.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            className="mt-4 w-72 bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
                            onClick={handlePago}
                        >
                            Pagar
                        </button>
                        <Link
                            href="/home"
                            className="mt-4 w-72 bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
                        >
                            Seguir comprando
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <h3 className="text-xl font-bold text-center">No hay productos en el carrito</h3>
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href="/home"
                            className="mt-4 w-64 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600"
                        >
                            Seguir comprando
                        </Link>
                    </div>
                </>
            )}
        </>
    )
}