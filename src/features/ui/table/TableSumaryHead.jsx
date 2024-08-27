import React from "react";

export default function TableSummaryHead({ style}) {
 return (
  <thead className={style}>
   <tr>
    <th>Dzień</th>
    <th>Przyjście</th>
    <th>Wyjście</th>
    <th>Bilans (min/godz)</th>
   </tr>
  </thead>
 );
}
