import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PdfCard from '../PdfCard/PdfCard'
import "./PdfList.css"

export const PdfList = () => {
    const [list, setList] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:5524/documents/list`).then((res) => {
            setList(res.data.data)
        })
    }, [])

    return (
        <div className='pdf-list'>
            {list.map(el => (
                <PdfCard className='pdf-card' data={el}/>
            ))}
        </div>
    )
}
