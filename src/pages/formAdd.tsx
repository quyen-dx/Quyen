import { useMutation } from "@tanstack/react-query"
import { Button, DatePicker, Form, Input } from "antd"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { instance } from "../model/axios"
import type { Stories } from "../types/product"

const AddStories = () => {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: async (data: Stories) => {
            await new Promise((r) => setTimeout(r, 1000));
            const res = await instance.post("/stories", data)
            return res
        },
        onSuccess: () => {
            toast.success("Them thanh cong")
            navigate("/stories")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error("Them that bai")
        }
    })
    const onFinish = (values: any) => {
        const newData = {
            ...values,
            isActive: values.isActive ?? true,
            date: values.date.format("DD-MM-YYYY"),
            image: values.image ?? ""

        }
        mutation.mutate(newData)
    }

    return (
        <div>
            <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: "500px" }} initialValues={{ isActive: false }}>
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "title khong de trong" }]}>
                    <Input placeholder="Title"></Input>
                </Form.Item>
                <Form.Item label="Author" name="author" rules={[{ required: true, message: "author  khong de trong" }]}>
                    <Input placeholder="Author"></Input>
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: "description  khong de trong" }]}>
                    <Input placeholder="Description"></Input>
                </Form.Item>
                <Form.Item label="Date" name="date" rules={[{ required: true, message: "date  khong de trong" }]}>
                    <DatePicker style={{ width: "100%" }}></DatePicker>
                </Form.Item>
                {/* <Form.Item name="isActive" valuePropName="checked">
                    <Checkbox>Còn</Checkbox>
                </Form.Item> */}
                <Form.Item label="Image URL" name="image" rules={[{ required: true, message: "image khong de trong" }]}>
                    <Input placeholder="nhap url anh" />
                </Form.Item>
                <Button type="default" htmlType="submit" loading={mutation.isPending}>{mutation.isPending ? "Đang thêm..." : "Thêm"}</Button>
            </Form>
        </div>
    )
}
export default AddStories