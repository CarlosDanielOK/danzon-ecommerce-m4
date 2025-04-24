import { ILoginUser, IRegisterUser } from "@/interfaces/types";
import toast from "react-hot-toast";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (formData: IRegisterUser) => {
    try {
        const response = await fetch(`${APIURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if (!response.ok) {
            toast.error('Ocurrió un error al registrar al usuario');
            throw new Error(`Ocurrió un error al registrar al usuario: ${response.status} ${response.statusText}`);
        } else {
            toast.success('Usuario registrado correctamente');
            return await response.json();
        }
    } catch (error) {
        toast.error('Ocurrió un error al registrar al usuario');
        throw new Error(`Ocurrió un error al registrar al usuario: ${error}`);
    }
}

export const login = async (formData: ILoginUser) => {
    try {
        const response = await fetch(`${APIURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })

        if (!response.ok) {
            toast.error('Ocurrió un error al iniciar sesión');
            throw new Error(`Ocurrió un error al iniciar sesión: ${response.status} ${response.statusText}`);
        } else {
            toast.success('Sesión iniciada correctamente');
            const res = await response.json();
            return res;
        }
    } catch (error) {
        toast.error('Email o contraseña incorrectos');
        throw new Error(`Ocurrió un error al iniciar sesión: ${error}`);
    }
}