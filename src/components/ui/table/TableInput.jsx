import React from "react";

export default function TableInput({ editedValue, handler }) {
    return (
        <input
             type="time"
             value={editedValue}
             onChange={handler}
            />
    )
}