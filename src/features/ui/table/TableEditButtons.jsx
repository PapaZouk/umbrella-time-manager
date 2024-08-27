import React from "react";
import TableButton from "./TableButton";
import { CancelIcon, SaveIcon } from "../icons/Icons";

export default function TableEditButtons({ onSave, onCancel }) {
 return (
  <span>
   <TableButton
    onClickHandler={onSave}
    icon={<SaveIcon/>}
   />
   <TableButton
    onClickHandler={onCancel}
    icon={<CancelIcon/>}
   />
  </span>
 );
}
