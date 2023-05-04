import React from 'react'
import PdfCard from '../PdfCard/PdfCard'
import "./PdfList.css"
import { Col, Row } from 'antd';

export const PdfList = ({getList, list}) => {
    return (
    <Row gutter={16}>
            {list.map(el => (
                 <Col key={el.id} span={6} className="gutter-row">
                    <PdfCard className='pdf-card' data={el} getList={getList}/>
                </Col>
            ))}
    </Row>
    )
}
