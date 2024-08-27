import React from "react";
import { EditIcon } from "../icons/Icons";
import TableButton from "./TableButton";

export default function TableEditButton({ onEditHandler }) {
 return <TableButton onClickHandler={onEditHandler} icon={<EditIcon />} />;
}
