import PropTypes from "prop-types";

export default function TableDetailsHead({ style }) {
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

TableDetailsHead.propTypes = {
    style: PropTypes.string,
};
