import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Table } from "antd";
import toast from "react-hot-toast";
import { instance } from "../model/axios";
import type { Categories } from "../types/categories";

const getCate = async () => {
    const res = await instance.get("/categories")
    return res.data
}
const CateList = () => {
    const { data, isLoading, isError } = useQuery<Categories[]>({
        queryKey: ["categories"],
        queryFn: getCate
    })
    const querycilient = useQueryClient()
    const deleteCate = useMutation({
        mutationFn: async (id: number) => {
            return await instance.delete(`/categories/${id}`)
        },
        onSuccess: () => {
            toast.success("xoa thanh cong")
            querycilient.invalidateQueries({queryKey: ["categories"]})
        },
        onError: () => {
            toast.success("xoa that bai")
        }
    })
    if (isLoading) return <p>Đang tải...</p>
    if (isError) return <p>Tải thất bại...</p>
    const column = [
        {
            title: "ID",
            render: (_: any, __: any, index: number) => index + 1,
            align: "center"
        },
        {
            title: "Title",
            dataIndex: "title",
            align: "center"
        },
        {
            title: "Description",
            dataIndex: "description",
            align: "center"
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (active: boolean) => (<span style={{ border: active ? "3px solid #00f500" : "3px solid red",borderRadius: "50%", padding: "5px 16px"}}>{active ? "Còn" : "Hết"}</span>),
            align: "center",
        },
        {
            title: "Action",
            align: "center",
            render: (_: any, item: Categories) => (
                < Popconfirm
                    title="Bạn có chắc muốn xoá?"
                    onConfirm={() => deleteCate.mutate(item.id)}
                >
                    <Button danger>Xoá</Button>
                </ Popconfirm>
            )
        }
    ]
    return (
        <Table columns={column} dataSource={data} loading={isLoading} rowKey="id" pagination={{ pageSize: 5 }} bordered></Table>
    )
}
export default CateList
