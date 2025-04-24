import { ICardProps } from "@/interfaces/types";

export const CartItem: React.FC<ICardProps> = ({ product }) => {
    return (
        <div className="cart-item flex items-center p-4 h-40 border-b border-gray-200">
            <img src={product.image} alt={product.name} className="cart-item-image w-40 h-full object-contain rounded" />
            <div className="cart-item-details ml-4">
                <h2 className="cart-item-name text-lg font-semibold">{product.name}</h2>
                <p className="cart-item-description text-gray-500">{product.description}</p>
                <p className="cart-item-price text-green-500 font-bold">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
}