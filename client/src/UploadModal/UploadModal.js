import { Button, Modal, Form, Input, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import DragDrop from './DragDrop/DragDrop';

const UploadModal = ({getList}) => {
const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const uploadDoc = async (value) => {
    try {
        const formData = new FormData();
        formData.append('title', value.title);
        formData.append('email', value.email);
        formData.append('document', new Blob([file], {type: 'application/pdf'}));
        await axios.post(`http://localhost:5524/documents/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
         })
      } catch (e) {
        console.error(e)
        messageApi.open({
            type: 'error',
            content: e.response.data[0] || e.response.data.error,
        });
      } finally {
        getList()
        setIsModalOpen(false)
      }
  };


  return (
    <>
    {contextHolder}
        <Button type="primary" onClick={showModal} style={{margin: "30px auto"}}>
            Upload
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} footer={null} onCancel={handleCancel}>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    requiredMarkValue: requiredMark,
                }}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark}
                onFinish={uploadDoc}
            >
                <Form.Item name='title' label="Document title" required tooltip="This is a required field">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item name='email' label="email" required tooltip="This is a required field">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item name='file' label="Document" required tooltip="This is a required field">
                    <div className='drag-drop-wrapper'>
                            <DragDrop setFile={setFile}/>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'>Upload</Button>
                </Form.Item>
            </Form>
        
        </Modal>
    </>
  );
};
export default UploadModal;