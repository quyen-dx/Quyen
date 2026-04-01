import { useMutation } from "@tanstack/react-query"
import { Button, Form, Input } from "antd"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { instance } from "../model/axios"
import { useAuthStore } from "../stores/useAuthStore"


const SignUp = () => {
    const { setUser } = useAuthStore()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: any) => {
            const res = await instance.post(`/register`, values)
            return res
        },
        onSuccess: (res) => {
            setUser({
                name: res.data.user.name,
                avatar: res.data.user.avatar || ""
            })
            localStorage.setItem("token", res.data.accessToken)
            toast.success("đăng kí thanh cong")
            navigate("/stories")
            form.resetFields()
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "dang ki khong than cong")
        }
    })
    const onFinish = (data: any) => {
        mutate(data)
    }
    return (
        <Form onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item label="Name" name="name">
                <Input placeholder="Name"></Input>
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ type: "email", message: "email ddungs dinh dang" }]}>
                <Input placeholder="email"></Input>
            </Form.Item>
            <Form.Item label="Avatar" name="avatar">
                <Input placeholder="avatar"></Input>
            </Form.Item>
            <Form.Item label="Pass" name="password">
                <Input.Password placeholder="password"></Input.Password>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>Dawng ki</Button>
        </Form>
    )
}
export default SignUp