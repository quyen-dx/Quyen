import { Button, Form, Input , InputNumber} from 'antd';
import toast from 'react-hot-toast';
type FormType = {
    username?:string
    email?: string,
    phone?: number
    password?: string,
    confirmPass?: string
}
export const Signup = () => {
    const onFinish = (values: FormType) => {
        toast.success("mày vừa submit")
        console.log(values)
    }
    const onFinishFailed = (errorInfo: unknown) => {
        toast.error("Nhap het di")
        console.log(errorInfo)
    }
    return (
        <div>
            <h1 className='text-black font-bold text-3xl items-center flex justify-center p-2'>Đăng Kí</h1>
            <Form name='login' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: "username khong de trong"}]}>
                    <Input placeholder='username'></Input>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: "email khong de trong"},{type: 'email', message: "emai dung dinh dang"}]}>
                    <Input placeholder='email'></Input>
                </Form.Item>
                <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "phone khong de trong"}]}>
                    <InputNumber style={{width: '100%'}} placeholder='phone'></InputNumber>
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: "password khong de trong" },{min: 6, message: "pass toi thieu 6 ki tu"}]}>
                    <Input.Password placeholder='password'></Input.Password>
                </Form.Item>
                <Form.Item label="ConfirmPass" name="confirmPass" dependencies={["password"]} rules={[{ required: true, message: "password khong de trong" },
                    ({getFieldValue}) =>({
                        validator(_, value) {
                            if(!value || getFieldValue("password") === value){
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error( "mat khau khong khop"))
                        },
                    })
                ]}>
                    <Input.Password placeholder='nhập lại pass'></Input.Password>
                </Form.Item>
                <Button type="default" htmlType='submit'>Submit</Button>
            </Form>
        </div>
    )
}