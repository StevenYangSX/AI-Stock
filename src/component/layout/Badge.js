import React from "react";

const Badge = props => {
  return (
    <div>
      <span className="badge badge-pill badge-success">{props.stockName}</span>
      <i className="far fa-times-circle" onClick={props.onClick}></i>
    </div>
  );
};

export default Badge;
