export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

export interface ICardProps {
    product: IProduct;
}

export interface IProductDetailProps {
    params: Promise<{ id: string; }>;
}

export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IValidationErrors {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    password?: string;
    api?: string;
}

export interface IUserSession {
    user: {
        id: number;
        name: string;
        email: string;
        address: string;
        phone: string;
        role: string;
        credential: {
            id: number;
            password: string;
        };
    };
    token: string;
}

export interface IOrderListProps {
    userToken: string;
}

export interface IUserOrder {
    id: number;
    status: string;
    date: Date;
    products: IProduct[];
}

export interface IOrderCardProp {
    order: IUserOrder;
}