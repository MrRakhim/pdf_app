import { Button, Modal, Form, Input } from 'antd';
import { useState } from 'react';
import DragDrop from './DragDrop/DragDrop';

const UploadModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <>
        <Button type="primary" onClick={showModal} style={{margin: "30px auto"}}>
            Upload
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    requiredMarkValue: requiredMark,
                }}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark}
            >
                <Form.Item label="Document title" required tooltip="This is a required field">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="email" required tooltip="This is a required field">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <div className='drag-drop-wrapper'>
                        <DragDrop/>
                </div>
                <Form.Item>
                    <Button type="primary">Upload</Button>
                </Form.Item>
            </Form>
        
        </Modal>
    </>
  );
};
export default UploadModal;