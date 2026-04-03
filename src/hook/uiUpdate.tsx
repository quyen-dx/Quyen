
import { Form, Input, Modal } from "antd";

const UiUpdate = ({open, setOpen, editing, setEditing, onSubmit}) => {

    return (
        <Modal title="sua" open={open} onCancel={() => { setOpen(false), setEditing(null) }} onOk={() => editing && onSubmit(editing)}>
            {editing && (
                <Form layout="vertical">
                    <Form.Item label="title">
                        <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}></Input>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    )
}
export default UiUpdate