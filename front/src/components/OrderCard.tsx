import { IOrderCardProp } from "@/interfaces/types"

export const OrderCard: React.FC<IOrderCardProp> = ({ order }) => {
    return (
        <div className="bg-[#EDEDED] w-48 h-48 rounded-md shadow-md flex flex-col justify-center items-center">
            {order.products.map((product) => (
                <h3 key={product.id} className="font-bold">
                    {product.name}
                </h3>
            ))}
            <p>ID de compra: {order.id}</p>
            <p>Realizada: {new Date(order.date).toLocaleDateString()}</p>
            <p>Estado: <span className="font-bold">{order.status.toLocaleUpperCase()}</span></p>
        </div>
    )
}