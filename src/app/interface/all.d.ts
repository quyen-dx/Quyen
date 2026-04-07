export interface IProduct{
    id: number,
    name: string,
    image: string,
    images: string[]
    price: number,
    description: string,
    categoryId: number
    category?: {
        id: number,
        name: string
    };
}
export interface ICategory{
    id: number,
    name: string
}
export interface IUser{
    id: number,
    name: string,
    email: string,
    password: string,
    role: "user" | "admin"
}