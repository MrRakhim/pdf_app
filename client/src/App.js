import './App.css';
import { PdfList } from './PdfList/PdfList';
import UploadModal from './UploadModal/UploadModal';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function App() {
    const [list, setList] = useState([])

    const getList = useCallback(() => {
        axios.get(`http://localhost:5524/documents/list`).then((res) => {
            setList(res.data.data)
        })
    });

    useEffect(() => {
        getList();
    }, [])

  return (
    <div className="container">
        <UploadModal getList={getList}/>
        <PdfList getList={getList} list={list}/>
    </div>
  );
}

export default App;
