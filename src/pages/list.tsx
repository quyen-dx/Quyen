import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Input, Popconfirm, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { instance } from "../model/axios";
import type { Categories } from "../types/categories";

const getCate = async () => {
    const res = await instance.get("/categories")
    return res.data
}
const CateList = () => {
    const [search, setSearch] = useState("")
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
            querycilient.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: () => {
            toast.error("xoa that bai")
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
            title: "Date",
            dataIndex: "date",
            align: "center"
        },
        {
            title: "Status",
            dataIndex: "isActive",
            render: (active: boolean) => (<span style={{ border: active ? "3px solid #00f500" : "3px solid red", borderRadius: "50%", padding: "5px 16px" }}>{active ? "Còn" : "Hết"}</span>),
            align: "center",
        },
        {
            title: "Action",
            align: "center",
            render: (_: any, item: Categories) => (
                < Popconfirm
                    title={`Xoá Id:${item.id} trong db.json`}
                    onConfirm={() => deleteCate.mutate(item.id)}
                >
                    <Button danger>Xoá</Button>
                </ Popconfirm>
            )
        }
    ]
    const filteredData = data?.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div>
            <Input placeholder="tìm" onChange={(e) => setSearch(e.target.value)} style={{ width: "50%", border: "1px solid black", margin: "30px", padding: "20px", }} />
            <Table columns={column} dataSource={filteredData} loading={isLoading} rowKey="id" pagination={{ pageSize: 5 }} bordered></Table>
        </div>
    )
}
export default CateList
