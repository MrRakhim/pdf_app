import { useState } from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver'
import { EditOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Modal } from 'antd';
import "./PdfCard.css"
import CardEditor from '../CardEditor/CardEditor';
import icon from './pdf-logo.png'
const { Meta } = Card;

const PdfCard = ({data, getList}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const handleDownloadDoc = async (id, title) => {
        if (id) {
            try {
                const response = await axios.get(`http://localhost:5524/documents/${id}/download`, {
                    responseType: 'blob',
                })
                saveAs(response.data, title)

              } catch (e) {
                console.error(e)
              }
        }
    }
    const handleDeleteDoc = async (id) => {
        if (id) {
            try {
                await axios.delete(`http://localhost:5524/documents/${id}`)
              } catch (e) {
                console.error(e)
              }
              finally {
                getList()
              }
        }
    }
   
    return (
        <Card
            cover={
            <img
                alt="example"
                src={icon}
            />
            }
            actions={[
            <EditOutlined key="edit" onClick={showModal}/>,
            <DownloadOutlined onClick={() => handleDownloadDoc(data?.id, data?.fileName)}/>,
            <DeleteOutlined onClick={() => handleDeleteDoc(data?.id)}/>,
            ]}
        >
            <Modal title="Update document" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <CardEditor  data={data?.id} setIsModalOpen={setIsModalOpen} getList={getList}/>
            </Modal>
            <Meta
                title={data?.fileName}
                description={data?.email}
            />
            <p>{data?.createdAt}</p>
        </Card>
    )
};
export default PdfCard;