import React from "react";
import { Progress } from "antd";
function Preloader({ percent }) {
  console.log("p", percent);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Progress
        percent={percent}
        steps={50}
        size="small"
        strokeColor="#52c41a"
      />
    </div>
  );
}

export default Preloader;
