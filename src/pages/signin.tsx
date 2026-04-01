import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { instance } from "../model/axios";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const { setUser } = useAuthStore();
    const navigate = useNavigate()
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: any) => {
            return await instance.post(`/login`,{
                email: values.email,
                password: values.password
            })
        },
        onSuccess: ({ data }) => {
            setUser({
                name: data.user.name,
                avatar: data.user.avatar || ""
            })
            localStorage.setItem("token", data.accessToken)
            toast.success("dang nhap thanh cong")
            navigate("/stories")
        },
        onError: () => {
            toast.error("sai email hoac mat khau")
        }
    })
    const onFinish = (data: any) => {
        mutate(data)
    }

    return (
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item name="email" label="Email">
                <Input></Input>
            </Form.Item>
            <Form.Item name="password" label="Pass">
                <Input.Password></Input.Password>
            </Form.Item>
            <Button htmlType="submit" type="primary" loading={isPending}>Dang nhap</Button>
        </Form>
    )
}
export default Signin