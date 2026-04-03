import { Button, Table } from "antd"
import { useState } from "react"
import { Stories } from "../types/product"
import UiUpdate from "./uiUpdate"
import useList from "./useLisst"
import useUpdateStory from "./useUpdate"


const List = () => {
    const { data, isLoading, isError } = useList()
    const { mutate } = useUpdateStory()
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Stories | null>(null);
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
                            setEditing(item);
                            setOpen(true);
                        }}
                    >
                        Sửa
                    </Button>
                </div>
            )
        }
    ]

    if (isLoading) return <p>Ddang tai...</p>
    if (isError) return <p>tai loi</p>
    return (
        <div>
            <Table columns={column} dataSource={data} rowKey="id" loading={isLoading}></Table>
            <UiUpdate
                open={open}
                setOpen={setOpen}
                editing={editing}
                setEditing={setEditing}
                onSubmit={(data) => {
                    mutate(data, {
                        onSuccess: () => {
                            setOpen(false);
                            setEditing(null);
                        },
                    });
                }}
            />
        </div>
    )
}
export default List