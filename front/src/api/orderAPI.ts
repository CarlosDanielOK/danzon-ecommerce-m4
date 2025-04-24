import toast from 'react-hot-toast';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const createOrder = async (products: number[], token: string) => {
    try {
        const response = await fetch(`${APIURL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify({ products }),
        });

        if (!response.ok) {
            throw new Error('Error al crear la orden');
        }

        toast.success('Compra exitosa');
        return await response.json();
    } catch (error) {
        toast.error('Error al crear la orden');
        throw new Error(`Error al crear la orden: ${error}`);
    }
}

export const getOrders = async (token: string) => {
    try {
        const response = await fetch(`${APIURL}/users/orders`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener las órdenes');
        }

        toast.success('Órdenes obtenidas');
        return await response.json();
    } catch (error) {
        toast.error('Error al obtener las órdenes');
        throw new Error(`Error al obtener las órdenes: ${error}`);
    }
}