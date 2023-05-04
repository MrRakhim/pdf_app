import { Button, Form, Input } from 'antd';
import React from 'react';
import axios from 'axios';
const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};
const CardEditor = ({data, setIsModalOpen, getList}) => {
  const onFinish = async (value) => {
    try {
        await axios.put(`http://localhost:5524/documents/${data}`, {
            title: value.name.title
        })
      } catch (e) {
        console.error(e)
      }
      finally {
        setIsModalOpen(false)
        getList()
      }
  };
  return (
    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
        <MyFormItemGroup prefix={['name']}>
          <MyFormItem name="title" label="Document Title">
            <Input />
          </MyFormItem>
        </MyFormItemGroup>

        <Button type="primary" htmlType="submit">
            Submit
        </Button>
    </Form>
  );
};
export default CardEditor;