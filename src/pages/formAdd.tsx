import { useMutation } from "@tanstack/react-query"
import { instance } from "../model/axios"
import toast from "react-hot-toast"
import {Form, Input,Checkbox,Button} from "antd"

const Addcategories = () =>{
    const mutation = useMutation({
        mutationFn: async(data: any)=>{
            const res = instance.post("/categories", data)
            return res
        },
        onSuccess: () =>{
            toast.success("Them thanh cong")
        },
        onError: () =>{
            toast.error("Them that bai")
        }
    })
    const onFinish = (values: any)=>{
        mutation.mutate(values)
    }
    
    return(
      <div>
        <Form layout="vertical" onFinish={onFinish} style={{maxWidth: "500px"}}>
            <Form.Item label="Title" name="title" rules={[{required: true, message: "title khong de trong"}]}>
                <Input placeholder="Title"></Input>
            </Form.Item>
            <Form.Item label="Description " name="description " rules={[{required: true, message: "description  khong de trong"}]}>
                <Input placeholder="Description "></Input>
            </Form.Item>
            <Form.Item name="isActive" valuePropName="checked">
                <Checkbox>Còn</Checkbox>
            </Form.Item>
            <Button type="default" htmlType="submit">Thêm</Button>
        </Form>
      </div>  
    )
}
export default Addcategories