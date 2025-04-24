/* eslint-disable @next/next/no-img-element */
import { ICardProps } from '@/interfaces/types';
import Link from 'next/link';
import React from 'react';

export const Card: React.FC<ICardProps> = ({ product }) => {
    return (
        <Link href={`/product/${product.id}`}>
            <div className='bg-white w-72 h-96 pt-3 rounded-md transform transition-transform hover:scale-105 hover:shadow-md'>
                <div className='h-[60%] flex justify-center items-center'>
                    <img src={product.image} alt={product.name} className='h-full object-contain' />
                </div>
                <div className='flex flex-col justify-evenly items-center h-[40%]'>
                    <h2 className='font-bold text-xl'>{product.name}</h2>
                    <p className='font-bold text-xl'>${product.price}</p>
                    <p>Stock: {product.stock}</p>
                </div>
            </div>
        </Link>
    );
}