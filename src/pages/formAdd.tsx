import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { instance } from "../model/axios"
import toast from "react-hot-toast"
import {Form, Input,Checkbox,Button,DatePicker } from "antd"
import type {Categories} from "../types/categories"

const Addcategories = () =>{
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: async(data: Categories)=>{
            await new Promise((r) => setTimeout(r,1000));
            const res = await instance.post("/categories", data)
            return res
        },
        onSuccess: () =>{
            toast.success("Them thanh cong")
            navigate("/categories")
        },
        onError: () =>{
            toast.error("Them that bai")
        }
    })
    const onFinish = (values: any)=>{
        const newData = {
            ...values,
            date: values.date.format("DD-MM-YYYY")
        }
        mutation.mutate(newData)
    }
    
    return(
      <div>
        <Form layout="vertical" onFinish={onFinish} style={{maxWidth: "500px"}}>
            <Form.Item label="Title" name="title" rules={[{required: true, message: "title khong de trong"}]}>
                <Input placeholder="Title"></Input>
            </Form.Item>
            <Form.Item label="Description " name="description" rules={[{required: true, message: "description  khong de trong"}]}>
                <Input placeholder="Description "></Input>
            </Form.Item>
            <Form.Item label="Date " name="date" rules={[{required: true, message: "date  khong de trong"}]}>
                <DatePicker style={{width: "100%"}}></DatePicker>
            </Form.Item>
            <Form.Item name="isActive" valuePropName="checked">
                <Checkbox>Còn</Checkbox>
            </Form.Item>
            <Button type="default" htmlType="submit" loading={mutation.isPending}>{mutation.isPending ? "Đang thêm..." : "Thêm"}</Button>
        </Form>
      </div>  
    )
}
export default Addcategories