export interface IProduct{
    id: number,
    name: string,
    image: string,
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