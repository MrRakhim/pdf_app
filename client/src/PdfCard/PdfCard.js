import { useState } from 'react';
import { EditOutlined, DownloadOutlined } from '@ant-design/icons';
import { Card, Modal } from 'antd';
import "./PdfCard.css"
import CardEditor from '../CardEditor/CardEditor';
const { Meta } = Card;




const PdfCard = ({data}) => {
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

    return (
        <Card
            style={{
            width: 300,
            }}
            cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
            <EditOutlined key="edit" onClick={showModal}/>,
            <DownloadOutlined/>,
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <CardEditor/>
            </Modal>
            ]}
        >
            <Meta
                title={data?.fileName}
                description={data?.email}
            />
            <p>{data?.createdAt}</p>
        </Card>
    )
};
export default PdfCard;