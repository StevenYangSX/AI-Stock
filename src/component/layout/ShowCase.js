import React from "react";
import showcase from "../../asset/showcase.jpeg";
const ShowCase = () => {
  return (
    <div>
      <img style={showcaseStyle} src={showcase} alt="" />
      <footer
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        style={footerStyle}
      >
        <p className="text-right" style={{ color: "white" }}>
          Copyright @Steven Yang
        </p>
      </footer>
    </div>
  );
};
const showcaseStyle = {
  height: "84vh",
  width: "100%"
};
const footerStyle = {
  height: "7vh",
  width: "100%"
};
export default ShowCase;
