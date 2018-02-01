import React from 'react';

const Spinner = ({ loading }) => {
  return (
    <span className={`${loading? 'spinner loading' : 'spinner hide'}`}></span>
  )
}

export default Spinner;
