/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SessionButtons } from './SessionButtons';
import { Search } from "./Search";

export default function NavBar() {
    return (
        <header className="bg-red-500 h-28 flex justify-center">
            <nav className="w-[95%] h-full flex flex-col">

                <div className=" h-16 flex items-center justify-between">
                    <img src="/danzon.png" alt="logo" className="w-[140px]" />
                    <Search />
                    <SessionButtons />
                </div>

                <div className="h-12 w-full flex justify-center items-center">
                    <ul className="w-full flex justify-evenly font-bold text-xl text-white">
                        <li>
                            <Link href="/">Inicio</Link>
                        </li>
                        <li>
                            <Link href="/home">Productos</Link>
                        </li>
                    </ul>
                </div>

            </nav>
        </header>
    )
}