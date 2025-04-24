'use client';

import { IProduct } from "@/interfaces/types"
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";

export const CartList: React.FC = () => {
    const [cart, setCart] = useState<IProduct[]>([]);

    useEffect(() => {
        const carrito = localStorage.getItem('cart');
        if (carrito) {
            setCart(JSON.parse(carrito));
        }
    }, []);
    
    return (
        <div>
            {cart.map((item) => (
                <CartItem product={item} key={item.id} />
            ))}
        </div>
    )
}