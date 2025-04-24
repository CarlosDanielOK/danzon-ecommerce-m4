'use client';

import { login } from '@/api/authAPI';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateLoginForm } from '@/helpers/validacionFormulario';
import { IValidationErrors } from '@/interfaces/types';
import Cookies from 'js-cookie';

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState<IValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined,
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { isValid, validationErrors } = validateLoginForm(formData);
        
        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await login(formData);
            const { user, token } = response;

            // guarda la sesión del usuario en una cookie por 1 día
            Cookies.set('userData', JSON.stringify({ token, user }), { expires: 1 });

            router.push('/home');
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

                <h1 className='font-bold text-2xl text-center mt-2'>Inicia sesión</h1>
                <form className='w-96' onSubmit={handleSubmit}>
                    {errors.api && <p className="text-red-500 text-center mb-2">{errors.api}</p>}
                    <div className='flex flex-col mt-4'>
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            name="email"
                            type="email"
                            placeholder='Correo electrónico'
                            required
                            className={`border rounded-md h-11 p-2 ${errors.email ? 'border-red-500' : 'border-[#dddfe2]'}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className='flex flex-col mt-3'>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            placeholder='Contraseña'
                            required
                            className={`border rounded-md h-11 p-2 ${errors.password ? 'border-red-500' : 'border-[#dddfe2]'}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className='mt-6'>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full h-11 text-xl font-bold text-white rounded-md 
                                ${isSubmitting
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-[#0866ff] hover:bg-[#2575f5]'
                                }`}
                        >
                            {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
                        </button>
                    </div>

                    <div className='mt-4 mb-2'>
                        <p className='text-center'>¿No tienes una cuenta? <Link href="/register" className='text-[#0866ff] '>Regístrate</Link>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    )
}