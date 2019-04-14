import React from 'react';

function Input({ type, placeholder, value }) {
  return (
    <div className="input-group">
      <input type={type} className="form-control" placeholder={placeholder} value={value} />
    </div>
  );
}


export default Input;
