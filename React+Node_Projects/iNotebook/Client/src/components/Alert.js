import React from "react";

const Alert = (props) => {

  const {alert} = props;

  const capitalize = (word) => {

    if (word === 'danger'){
      word = 'Error'
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <>
    {alert && <div className={`alert alert-${alert.type} d-flex justify-content-between`} id = 'alert' role="alert">
        <div><strong>{capitalize(alert.type)}</strong> | {alert.msg}</div></div>}
    </>
  );
};

export default Alert;
