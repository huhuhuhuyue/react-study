import React from 'react';
import styles from './[id].css';
import { useParams } from 'umi';

export default (props) => {
  const {id} = props.match.params
  return (
    <div>
      <h1 className={styles.title}>Page product/[id]：{id}</h1>
      <Child/>
    </div>
  );
}

function Child () {
  const {id} = useParams()
  return (
    <div>
      Child
      <p>id：{id}</p>
    </div>
  )
}