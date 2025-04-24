'use client';

import { IUserSession } from "@/interfaces/types";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { OrderList } from '../../components/OrderList';

export default function Dashboard() {

    const [userData, setUserData] = useState<IUserSession | null>(null);

    useEffect(() => {
        const dataCookie = Cookies.get('userData'); // obtiene la cookie con la información del usuario logueado
        if (dataCookie) {
            setUserData(JSON.parse(dataCookie));
        }
    }, []);

    return (
        <div className="flex flex-grow justify-center items-center flex-col mt-10 mb-10">

            <div className="w-[1000px] flex flex-col gap-3 shadow-xl bg-white">

                <div className="bg-red-500 h-16 flex justify-center items-center">
                    <h1 className="text-2xl text-white font-bold">{userData?.user.name}</h1>
                </div>

                <div className="flex justify-center items-center flex-col">
                    <img src="https://i.pinimg.com/736x/95/5d/81/955d81fa7771b5afc5aac5fcd9848c66.jpg" alt="foto de perfil" className="w-24 h-24 rounded-full" />
                    <h2 className="font-bold text-xl mt-3">{userData?.user.name}</h2>
                    <h2 className="text-lg">{userData?.user.email}</h2>
                </div>

                <div className="text-center font-bold text-xl">
                    <h2>Información personal</h2>
                </div>

                <div className="p-4">
                    <div className="flex justify-between">
                        <p>Nombre completo:</p>
                        <p>{userData?.user.name}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Email:</p>
                        <p>{userData?.user.email}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Teléfono:</p>
                        <p>{userData?.user.phone}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Dirección:</p>
                        <p>{userData?.user.address}</p>
                    </div>

                </div>
            </div>
            <div className="w-[1000px] flex flex-col shadow-xl mt-10 bg-white">
                <h3 className="text-center text-white font-bold text-2xl h-16 flex justify-center items-center bg-red-500">Mis ordenes</h3>
                <OrderList userToken={userData?.token ?? ''} />
            </div>
        </div>
    )
}