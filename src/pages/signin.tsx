import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { instance } from "../model/axios";
import { useAuthStore } from "../stores/useAuthStore";


const Signin = () => {
    const { setUser } = useAuthStore();

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: any) => {
            return await instance.get(`/users?email=${values.email}&pass=${values.pass}`)
        },
        onSuccess: ({ data }) => {
            if (data.length > 0) {
                setUser({
                    name: data[0].name,
                    avatar: data[0].avatar || ""
                });
                toast.success("đăng nhập thành công")
            } else {
                toast.error("sai email hoặc mật khẩu")
            }
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
            <Form.Item name="pass" label="Pass">
                <Input.Password></Input.Password>
            </Form.Item>
            <Button htmlType="submit" type="primary" loading={isPending}>Dang nhap</Button>
        </Form>
    )
}
export default Signin