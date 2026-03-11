import { Button, Input, Modal, Table } from 'antd';
import { useState } from 'react';
export const Userlist = () => {
    const [open, setOpen] = useState(false)
    const data = [
        {
            key: '1',
            name: 'User 1',
            age: 'a@gmail.com',
            major: 'User',
        },
        {
            key: '2',
            name: 'User 2',
            age: 'a@gmail.com',
            major: 'Admin',
        },
    ];

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (_: any, __: any, index: number) => index + 1
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major',
        },
    ];
    return (
        <div className='w-full'>
            <div className='flex justify-center font-bold text-4xl my-4 text-gray-700'>Danh sách User</div>
            <Button type="primary" onClick={() => setOpen(true)}> Thêm user</Button>
            <Table dataSource={data} columns={columns} />;
            <Modal
                title="Thêm User"
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => setOpen(false)}
            >
                <Input placeholder="Name" style={{ marginBottom: 10 }} />
                <Input placeholder="Email" style={{ marginBottom: 10 }} />
                <Input placeholder="Role" />
            </Modal>
        </div>
    )
}