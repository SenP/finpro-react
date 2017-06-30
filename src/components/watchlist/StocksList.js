import React from "react";
import { func, bool, instanceOf } from "prop-types";
import { Table } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { Watchlist } from "../../services";
import Stock from "./Stock";
import Colored from "../common/Colored";
import formatCash from "../../utils/formatCash";

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
  const Dollar = <FontAwesome name="usd" />;
  const CashField = ({ value }) => {
    return (
      <Colored
        value={formatCash(parseFloat(value, 10), {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
        prefix={Dollar}
      />
    );
  };

  const headerRow = (
    <thead>
      <tr className="active">
        <th>Stock Code </th>
        <th className="number-field">Units Owned </th>
        <th className="number-field">
          Buy Price ({Dollar})
        </th>
        <th className="number-field">
          Last Traded Price ({Dollar})
        </th>
        <th className="number-field">
          Change ({Dollar})
        </th>
        <th className="number-field">Change (%) </th>
        <th className="number-field">
          Market Value ({Dollar})
        </th>
        <th className="number-field">
          Day Change ({Dollar})
        </th>
        <th className="number-field">
          Net P/L ({Dollar})
        </th>
        <th className="text-center"> Actions </th>
      </tr>
    </thead>
  );

  const totalsRow =
    watchlist.stocks.length > 1 &&
    <tr className="active">
      <td>
        <strong>Totals </strong>
      </td>
      <td colSpan="5" />
      <td className="number-field">
        <strong>
          <CashField value={watchlist.totalMarketValue} />
        </strong>
      </td>
      <td className="number-field">
        <strong>
          <CashField value={watchlist.totalDayChange} />
        </strong>
      </td>
      <td className="number-field">
        <strong>
          <CashField value={watchlist.totalPnL} />
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
