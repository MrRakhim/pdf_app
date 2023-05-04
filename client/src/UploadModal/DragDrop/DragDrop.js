import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useCallback } from 'react';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: false,
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  customRequest: ({file, onSuccess}) => {
    setTimeout(() => {
        onSuccess("ok")
    }, 0)
  }
};

const DragDrop = ({setFile}) => {
    
    const onChange = useCallback((info) => {
        setFile(info.file)
    }, [setFile])

    return (
    <Dragger {...props} onChange={onChange}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </Dragger>
  )};
  export default DragDrop;