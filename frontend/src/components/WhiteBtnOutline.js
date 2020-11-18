import React, { useState } from "react";
import "../assets/scss/WhiteBtnOutline.scss";

function WhiteBtnOutline(props) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={
        hover === false
          ? "btn btn-md btn-outline-light white-btn-outline"
          : "btn btn-md btn-outline-light white-btn-outline btnHover"
      }
      {...props}
    >
      {props.children}
    </button>
  );
}

export default WhiteBtnOutline;
