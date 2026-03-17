import { useMutation } from "@tanstack/react-query"
import { instance } from "../model/axios"
import toast from "react-hot-toast"
import {Form, Input,Checkbox,Button} from "antd"
import type {Categories} from "../types/categories"

const Addcategories = () =>{
    const mutation = useMutation({
        mutationFn: async(data: Categories)=>{
            await new Promise((r) => setTimeout(r,1000));
            const res = await instance.post("/categories", data)
            return res
        },
        onSuccess: () =>{
            toast.success("Them thanh cong")
        },
        onError: () =>{
            toast.error("Them that bai")
        }
    })
    const onFinish = (values: Categories)=>{
        mutation.mutate(values)
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
            <Form.Item name="isActive" valuePropName="checked">
                <Checkbox>Còn</Checkbox>
            </Form.Item>
            <Button type="default" htmlType="submit" loading={mutation.isPending}>{mutation.isPending ? "Đang thêm..." : "Thêm"}</Button>
        </Form>
      </div>  
    )
}
export default Addcategories