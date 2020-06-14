import React from 'react';
import styles from './index.less';
import { Link, history } from 'umi';

export default () => {
  // 路由跳转方式二：编程式导航
  function toUser () {
    history.push('/user/111')
  }
  return (
    <div>
      <h1 className={styles.title}>Page more/index</h1>
      {/* 路由跳转方式一：Link跳转 */}
      <Link to='/product/123'>to product</Link>
      <button onClick={toUser}>to user</button>
    </div>
  );
}
