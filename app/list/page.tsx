"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../models/axios";
import type { Book } from "../types/book";
const getall = async () => {
  const res = await api.get("/books")
  return res.data
}
export default function List() {
  const [item, setitem] = useState<Book | null>(null);
  const [open, setopen] = useState(false);
  const [openadd, setopenadd] = useState(false);
  const [search, setSearch] = useState("")
  const [form] = Form.useForm()
  const querycilient = useQueryClient()
  const { data, isLoading, isError } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: getall
  })
  const deleteBook = useMutation({
    mutationFn: async (id: number) => {
      return await api.delete(`/books/${id}`)
    },
    onSuccess: () => {
      toast.success("xoa thanh cong")
      querycilient.invalidateQueries({ queryKey: ["books"] })
    },
    onError: () => {
      toast.error("xoa that bai")
    }
  })
  const updateBook = useMutation({
    mutationFn: async (update: Book) => api.put(`/books/${update.id}`, update),
    onSuccess: () => {
      toast.success("cap nhat thanh cong");
      querycilient.invalidateQueries({ queryKey: ["books"] });
      setopen(false);
      setitem(null);
    },
    onError: () => toast.error("cap nhat that bai"),
  });
  const mutationadd = useMutation({
    mutationFn: async (data: Book) => {
      await new Promise((r) => setTimeout(r, 1000));
      const res = await api.post("/books", data)
      return res
    },
    onSuccess: () => {
      toast.success("Them thanh cong")
      querycilient.invalidateQueries({ queryKey: ["books"] });
      setopenadd(false)
      form.resetFields()
    },
    onError: () => {
      toast.error("Them that bai")
    }
  })
  const onFinish = (values: any) => {
    const newData = {
      ...values,
    }
    mutationadd.mutate(newData)
  }
  const colums = [
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "coverImage",
      dataIndex: "coverImage",
      render: (img: string) => img ? <img src={img}></img> : "khong co anh"
    },
    {
      title: "genre",
      dataIndex: "genre",
    },
    {
      title: "Action",
      align: "center",
      render: (_: any, item: Book) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Button
            type="primary"
            onClick={() => {
              setitem(item);
              setopen(true);
            }}
          >
            Sửa
          </Button>

          < Popconfirm
            title={`Xoá ${item.title}`}
            onConfirm={() => deleteBook.mutate(item.id)}
          >
            <Button danger>Xoá</Button>
          </ Popconfirm>
        </div>
      )
    }
  ]
  if (isLoading) return <p>đang tải</p>
  if (isError) return <p>tai loi</p>
  return (
    <div>
      <Button
        type="primary"
        onClick={() => { setopenadd(true) }}>
        Thêm
      </Button>
      <Table columns={colums} rowKey="id" loading={isLoading} dataSource={data} style={{ maxWidth: "1500px" }}>
      </Table>

      <Modal
        title="Sửa Story"
        open={open}
        onCancel={() => {
          setopen(false);
          setitem(null);
        }}
        onOk={() => item && updateBook.mutate(item)}
      >
        {item && (
          <Form layout="vertical">
            <Form.Item label="Title">
              <Input
                value={item.title}
                onChange={(e) => setitem({ ...item, title: e.target.value })}
              />
            </Form.Item>

            <Form.Item label="quantity">
              <InputNumber
                value={item.quantity}
                onChange={(e) => setitem({ ...item, quantity: e ?? 0 })}
              />
            </Form.Item>

            <Form.Item label="coverImage">
              <Input
                value={item.coverImage}
                onChange={(e) => setitem({ ...item, coverImage: e.target.value })}
              />
            </Form.Item>
              <Form.Item label="genre"  rules={[{ required: true, message: "genre khong de trong" }]}>
                <Select placeholder="Chọn thể loại" value={item.genre} onChange={(e) => setitem({...item, genre: e})}>
                  <Select.Option value="Thể loại 1">Thể loại 1</Select.Option>
                  <Select.Option value="Thể loại 2">Thể loại 2</Select.Option>
                  <Select.Option value="Thể loại 3">Thể loại 3</Select.Option>
                </Select>
              </Form.Item>
          </Form>
        )}
      </Modal>



      <Modal title="Thêm mới" open={openadd} onCancel={() => { setopenadd(false), form.resetFields() }} onOk={form.submit}>
        <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: "500px" }} initialValues={{ isActive: false }}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: "title khong de trong" }]}>
            <Input placeholder="Title"></Input>
          </Form.Item>
          <Form.Item label="quantity" name="quantity" rules={[{ required: true, message: "quantity  khong de trong" }]}>
            <Input placeholder="quantity"></Input>
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: "description  khong de trong" }]}>
            <Input placeholder="Description"></Input>
          </Form.Item>
          <Form.Item label="coverImage" name="coverImage" rules={[{ required: true, message: "coverImage  khong de trong" }]}>
            <Input placeholder="coverImage"></Input>
          </Form.Item>
          {/* <Form.Item name="isActive" valuePropName="checked">
                    <Checkbox>Còn</Checkbox>
                </Form.Item> */}
          <Form.Item label="genre" name="genre" rules={[{ required: true, message: "genre khong de trong" }]}>
            <Select placeholder="Chọn thể loại">
              <Select.Option value="Thể loại 1">Thể loại 1</Select.Option>
              <Select.Option value="Thể loại 2">Thể loại 2</Select.Option>
              <Select.Option value="Thể loại 3">Thể loại 3</Select.Option>
            </Select>
          </Form.Item>
          <Button type="default" htmlType="submit" loading={mutationadd.isPending}>{mutationadd.isPending ? "Đang thêm..." : "Thêm"}</Button>
        </Form>
      </Modal>
    </div>
  );
}
