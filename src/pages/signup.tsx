import { Button, Input } from 'antd';
export const Signup = () => {
    return (
        <div className='w-[30%] bg-gray-500 h-auto mx-auto my-[30px]' >
            <h1 className='text-white font-bold text-3xl items-center flex justify-center p-2'>Đăng Kí</h1>
            <div className='w-full h-[200px] p-5 flex flex-col justify-between'>
                <Input className='' placeholder="User name" />
                <Input className='' placeholder="Email" />
                <Input className='' placeholder="Pass" />
                <div className='flex items-center justify-center'>
                    <Button type="default" ghost>
                        Submit
                    </Button>
                </div>

            </div>
        </div>
    )
}