import { Form, Input, InputNumber, Button } from "antd";

type ProductForm = {
  name?: string
  price?: number
  quantity?: number
  description?: string
}

export const Add = () => {

  const onFinish = (values: ProductForm) => {
    console.log("Product:", values)
  }

  return (
    <Form layout="vertical" onFinish={onFinish}>

      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[{ required: true, message: "không để trống tên" }]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      <Form.Item
        label="Giá"
        name="price"
        rules={[{ required: true, message: "không để trống giá" }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="Nhập giá" />
      </Form.Item>

      <Form.Item
        label="Số lượng"
        name="quantity"
        rules={[{ required: true, message: "không để trống số lượng" }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="Nhập số lượng" />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
      >
        <Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
  )
}