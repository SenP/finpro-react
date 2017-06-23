import React from "react";
import { func, bool, instanceOf } from "prop-types";
import { Table } from "react-bootstrap";
import { Watchlist } from "../../services";
import Stock from "./Stock";

StocksList.propTypes = {
  watchlist: instanceOf(Watchlist).isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
  isViewing: bool
};

export default function StocksList({
  watchlist,
  onEdit,
  onDelete,
  isViewing = true
}) {
  const headerRow = (
    <thead>
      <tr className="active">
        <th>Stock Code </th>
        <th className="number-field">Units Owned </th>
        <th className="number-field">Buy Price ($) </th>
        <th className="number-field">Last Traded Price ($) </th>
        <th className="number-field">Change ($) </th>
        <th className="number-field">Change (%) </th>
        <th className="number-field">Market Value($)</th>
        <th className="number-field">Day Change ($) </th>
        <th className="number-field">Net P/L ($) </th>
        <th className="text-center"> Actions </th>
      </tr>
    </thead>
  );

  const totalsRow =
    watchlist.stocks.length > 1 &&
    <tr className="active">
      <td><strong>Totals </strong></td>
      <td colSpan="5" />
      <td className="number-field">
        <strong> {watchlist.totalMarketValue}</strong>
      </td>
      <td className="number-field">
        <strong>
          {watchlist.totalDayChange}
        </strong>
      </td>
      <td className="number-field">
        <strong>
          {watchlist.totalPnL}
        </strong>
      </td>
      <td />
    </tr>;

  return (
    <Table bordered responsive>
      {headerRow}
      <tbody>
        {watchlist.stocks.map(stock =>
          <Stock
            key={stock.code}
            stock={stock}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {totalsRow}
      </tbody>
    </Table>
  );
}
