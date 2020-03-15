import React from 'react';
import './Select.scss';

const Select = props => {
  const htmlFor = `${props.label}-${Math.random()}`;
  return (
    <div className="select">
      <label htmlFor={htmlFor}>{props.label}</label>
      <select id={htmlFor} value={props.value} onChange={props.onChange}>
        {props.options.map((item, index) => {
          return (
            <option value={item.value} key={item.value + index}>
              {item.text}
            </option>
          )
        })}
      </select>
    </div>
  );
};

export default Select;