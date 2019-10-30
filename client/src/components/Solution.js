import './Solution.css';

import React from 'react';

const solution = ({symptom: { data, id}, handler}) => {
  const onClickHandler = () => handler(id);

  return (
    <li onClick={onClickHandler}>{data}</li>
  )
}

export default solution;