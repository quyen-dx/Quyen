import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { instance } from "../model/axios";
import type { Stories } from "../types/product";

const getStories = async () => {
    const res = await instance.get("/stories")
    return res.data
}
const StoriesList = () => {
    const [item, setitem] = useState<Stories | null>(null);
    const [open, setopen] = useState(false);
    const [search, setSearch] = useState("")
    const { data, isLoading, isError } = useQuery<Stories[]>({
        queryKey: ["stories"],
        queryFn: getStories
    })
    const querycilient = useQueryClient()
    const deleteStories = useMutation({
        mutationFn: async (id: number) => {
            return await instance.delete(`/stories/${id}`)
        },
        onSuccess: () => {
            toast.success("xoa thanh cong")
            querycilient.invalidateQueries({ queryKey: ["stories"] })
        },
        onError: () => {
            toast.error("xoa that bai")
        }
    })
    const updateStori = useMutation({
        mutationFn: async (update: Stories) => instance.put(`/stories/${update.id}`, update),
        onSuccess: () => {
            toast.success("cap nhat thanh cong");
            querycilient.invalidateQueries({ queryKey: ["stories"] }); 
            setopen(false); 
            setitem(null); 
        },
        onError: () => toast.error("cap nhat that bai"),
    });
    if (isLoading) return <p>Đang tải...</p>
    if (isError) return <p>Tải thất bại...</p>
    const column = [
        {
            title: "Stt",
            render: (_: any, __: any, index: number) => index + 1,
            align: "center"
        },
        {
            title: "ID",
            dataIndex: "id",
            align: "center"
        },
        {
            title: "Title",
            dataIndex: "title",
            align: "center"
        },
        {
            title: "Auhtor",
            dataIndex: "author",
            align: "center"
        },
        {
            title: "Image",
            dataIndex: "image",
            align: "center",
            render: (image: string) => image ? <img src={image} alt="img cua stories" style={{ width: "90px", height: "90px", objectFit: "cover" }}></img> : "khong co anh"
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
            render: (_: any, item: Stories) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            setitem(item);
                            setopen(true);
                        }}
                    >
                        Sửa
                    </Button>

                    < Popconfirm
                        title={`Xoá ${item.title}`}
                        onConfirm={() => deleteStories.mutate(item.id)}
                    >
                        <Button danger>Xoá</Button>
                    </ Popconfirm>
                </div>
            )
        }
    ]
    const filteredData = data?.filter(item => {
        const s = search.toLowerCase().trim();
        if (!s) return true;

        if (s === "còn") return item.isActive === true;
        if (s === "hết") return item.isActive === false;

        return (
            item.title.toLowerCase().includes(s) ||
            item.id.toString().includes(s) ||
            item.author.toLowerCase().includes(s)
        );
    });
    return (
        <div>
            <Input placeholder="tìm" onChange={(e) => setSearch(e.target.value)} style={{ width: "50%", border: "1px solid black", margin: "30px", padding: "20px", }} />
            <Table columns={column}
                dataSource={filteredData}
                loading={isLoading}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
                locale={{ emptyText: (<h1 style={{ color: "red", fontWeight: "bold", fontSize: "130%" }}>Không có dữ liệu</h1>) }}></Table>
            <Modal
                title="Sửa Story"
                open={open}
                onCancel={() => {
                    setopen(false);
                    setitem(null);
                }}
                onOk={() => item && updateStori.mutate(item)}
            >
                {item && (
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            <Input
                                value={item.title}
                                onChange={(e) => setitem({ ...item, title: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item label="Author">
                            <Input
                                value={item.author}
                                onChange={(e) => setitem({ ...item, author: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item label="Description">
                            <Input
                                value={item.description}
                                onChange={(e) => setitem({ ...item, description: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item label="Status">
                            <Checkbox checked={item.isActive} onChange={(e) => setitem({ ...item, isActive: e.target.checked })}>Còn</Checkbox>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    )
}
export default StoriesList
