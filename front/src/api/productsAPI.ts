import { IProduct } from '../interfaces/types';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await fetch(`${APIURL}/products`);

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Ocurrió un error al obtener los productos: ${error}`);
        return [];
    }
}

export const getProductById = async (id: string): Promise<IProduct> => {
    try {
        const response: IProduct[] = await getProducts();
        const producto = response.find((product) => product.id === parseInt(id));

        if (!producto) {
            throw new Error(`Producto con id ${id} no encontrado`);
        }

        return producto;
    } catch (error) {
        throw new Error(`Ocurrió un error al obtener el producto: ${error}`);
    }
}