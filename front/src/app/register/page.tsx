'use client';

import { register } from "@/api/authAPI";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { IValidationErrors } from "@/interfaces/types";
import { validateRegisterForm } from "@/helpers/validacionFormulario";

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
    })

    const [errors, setErrors] = useState<IValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { isValid, validationErrors } = validateRegisterForm(formData);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        setErrors((prevErrors) => ({
            ...prevErrors,
            api: '',
        }));

        try {
            await register(formData);
            router.push('/login');
        } catch (error: unknown) {
            let errorMessage = 'Ocurrió un error al registrar el usuario.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setErrors((prevErrors) => ({
                ...prevErrors,
                api: errorMessage,
            }));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='flex flex-grow justify-center items-center flex-col'>

            <div className='bg-white p-5 rounded-md shadow-lg'>

                <h1 className='font-bold text-2xl text-center mt-2'>Crea tu cuenta</h1>
                <form className='w-96' onSubmit={handleSubmit}>
                    {errors.api && <p className='text-red-500 text-center mb-2'>{errors.api}</p>}

                    <div className='flex flex-col mt-4'>
                        <label htmlFor="name">Nombre y apellido</label>
                        <input
                            name="name"
                            type="text"
                            placeholder='Nombre y apellido'
                            value={formData.name}
                            required
                            onChange={handleChange}
                            className='border border-[#dddfe2] rounded-md h-11 p-2'
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            name="email"
                            type="email"
                            placeholder='Correo electrónico'
                            value={formData.email}
                            required
                            onChange={handleChange}
                            className='border border-[#dddfe2] rounded-md h-11 p-2'
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label htmlFor="address">Dirección</label>
                        <input
                            name="address"
                            type="text"
                            placeholder='Dirección (ej: Calle falsa 123)'
                            value={formData.address}
                            required
                            onChange={handleChange}
                            className='border border-[#dddfe2] rounded-md h-11 p-2'
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label htmlFor="phone">Número de telefóno</label>
                        <input
                            name="phone"
                            type="number"
                            placeholder='Número de telefóno'
                            value={formData.phone}
                            required
                            onChange={handleChange}
                            className='border border-[#dddfe2] rounded-md h-11 p-2'
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            placeholder='Contraseña'
                            value={formData.password}
                            required
                            onChange={handleChange}
                            className='border border-[#dddfe2] rounded-md h-11 p-2'
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className='mt-6'>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={
                                `w-full h-11 text-xl font-bold text-white rounded-md 
                                ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#0866ff] hover:bg-[#2575f5]'}
                                `}
                        >{isSubmitting ? 'Registrando...' : 'Regístrate'}
                        </button>
                    </div>

                    <div className='mt-4 mb-2'>
                        <p className='text-center'>¿Tienes una cuenta? <Link href="/login" className='text-[#0866ff] '>Inicia sesión</Link>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    )
}