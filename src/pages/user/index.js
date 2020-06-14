import React from 'react';
import styles from './index.css';

export default (props) => {
  // console.log(props)
  const {id} = props.match.params
  return (
    <div>
      <h1 className={styles.title}>Page user/index
        <p>id：{id}</p>
      </h1>
      组件复合：{props.children}
    </div>
  );
}
