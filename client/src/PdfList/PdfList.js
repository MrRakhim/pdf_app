import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios'
import PdfCard from '../PdfCard/PdfCard'
import "./PdfList.css"

export const PdfList = ({getList, list}) => {
    return (
        <div className='pdf-list'>
            {list.map(el => (
                <PdfCard className='pdf-card' data={el} getList={getList}/>
            ))}
        </div>
    )
}
