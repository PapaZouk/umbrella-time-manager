import React from "react";
import "../styles/Container.module.css";

export default function Container({ fadeIn, children }) {
 return (
  <div className={`container ${fadeIn ? "container-appear" : ""}`}>
   {children}
  </div>
 );
}
