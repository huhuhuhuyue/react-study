import React from 'react';
import styles from './about.css';
import {Table} from 'antd'  // umi默认安装了antd

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page about</h1>
      <Table columns={columns} dataSource={[]}></Table>
    </div>
  );
}
