import { useMutation } from "@tanstack/react-query"
import { Button, Form, Input } from "antd"
import toast from "react-hot-toast"
import { instance } from "../model/axios"


const SignUp = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: any) => {
            const res = await instance.post(`/users`, values)
            return res
        },
        onSuccess: (data) => {
            console.log("SUCCESS:", data)
            toast.success("đăng kí thanh cong")
        },
        onError: (error: any) => {
            console.error("Lỗi đăng ký:", error?.response?.data || error.message)
            toast.error(error?.response?.data?.message || "dang ki khong than cong")
        }
    })
    const onFinish = (data: any) => {
        console.log("Data gửi lên:", data)
        mutate(data)
    }
    return (
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item label="Name" name="name">
                <Input placeholder="Name"></Input>
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ type: "email", message: "email ddungs dinh dang" }]}>
                <Input placeholder="email"></Input>
            </Form.Item>
            <Form.Item label="Pass" name="password">
                <Input.Password placeholder="password"></Input.Password>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>Dawng ki</Button>
        </Form>
    )
}
export default SignUp