import React from 'react';
import styles from './[id].css';
import { useParams } from 'umi';

export default () => {
  const {id} = useParams()
  return (
    <div>
      <h1 className={styles.title}>Page user/[id]
        <p>{id}</p>
      </h1>
    </div>
  );
}
