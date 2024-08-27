import React from "react";
import icons from "../icons/styles/Icons.module.css";

export default function TableButton({ onClickHandler, icon }) {
 return (
  <span>
   <button className={icons.iconButton} onClick={onClickHandler}>
    {icon}
   </button>
  </span>
 );
}
