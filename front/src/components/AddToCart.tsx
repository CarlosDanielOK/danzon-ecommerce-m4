'use client';

import { ICardProps, IProduct, IUserSession } from "@/interfaces/types";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

export const AddToCart: React.FC<ICardProps> = ({ product }) => {

    const [userSession, setUserSession] = useState<IUserSession | null>(null);
    const router = useRouter();

    // Obtener la sesión del usuario desde las cookies
    useEffect(() => {
        const dataCookie = Cookies.get('userData');
        if (dataCookie) {
            setUserSession(JSON.parse(dataCookie));
        } else {
            setUserSession(null);
        }
    }, []);

    const handleAddToCart = () => {
        if (userSession) {
            const cart: IProduct[] = JSON.parse(localStorage.getItem('cart') || '[]'); // obtiene el carrito del localStorage

            // Verifica si el producto ya existe en el carrito
            if (cart.find((item) => item.id === product.id)) {
                toast.error('El producto ya está en el carrito');
                return;
            } else {
                cart.push(product); // agrega el producto al carrito
                localStorage.setItem('cart', JSON.stringify(cart)); // guarda el carrito en el localStorage
                toast.success('Producto agregado al carrito');
            }
        } else {
            router.push('/login');
        }
    }

    const handleComprarAhora = () => {
        if (userSession) {
            const cart: IProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');

            if (cart.find((item) => item.id === product.id)) {
                toast.error('El producto ya está en el carrito');
                return;
            } else {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                toast.success('Producto agregado al carrito');
                router.push('/cart');
            }
        } else {
            toast.error('Inicia sesión para comprar');
            router.push('/login');
        }
    }

    return (
        <>
            {userSession ? (
                <>
                    <button
                        className="bg-[#3483fa] hover:bg-[#2968C8] text-white font-bold rounded-md h-14"
                        onClick={handleComprarAhora}
                    >
                        Comprar ahora
                    </button>
                    <button
                        className="bg-[#3483fa] hover:bg-[#2968C8] text-white font-bold rounded-md h-14"
                        onClick={handleAddToCart}
                    >
                        Agregar al carrito
                    </button>
                </>
            ) : (
                <button
                    className="bg-[#3483fa] hover:bg-[#2968C8] text-white font-bold rounded-md h-14"
                    onClick={handleAddToCart}
                >
                    Inicia sesión para comprar
                </button>
            )}
        </>
    )
}