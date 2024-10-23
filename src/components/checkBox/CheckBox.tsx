import React from 'react';
import './checkbox.module.scss';

export const CheckBox = () => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className="custom-checkbox" />
    </label>
  );
};
