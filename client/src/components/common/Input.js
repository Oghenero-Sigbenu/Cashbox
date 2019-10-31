import React from 'react';
import './css/Input.css';
// import eye from '../../assets/images/eye.svg';

export default function Input({ placeHolder, type, handleChange, label, value, name}) {
  return (
    <div className="form-element">
      <label>{label}</label><br />
      <input placeholder={placeHolder} type={type} onChange={handleChange} value={value} name={name} />
    </div>
  );
}
