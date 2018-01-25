import React from 'react';
import classNames from 'classnames';
import { formatFloat } from '../generic/util';
import { Desktop } from '../generic/MediaQuery';
import {sortData, onColumnSort, classNameForColumnHeader}  from '../generic/terminalSortFunctions';

class RecentTrades extends React.Component {

  constructor(props) {
    super(props);
    this.state = {history: [], currency: this.props.market.split('-')[0], sort: {}};
    this.sortData = sortData.bind(this);
    this.onColumnSort = onColumnSort.bind(this);
    this.sortFunctions = {};    
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.market !== this.props.market) {
      this.setState({currency: this.props.market.split('-')[0]})
    }
    if(nextProps.history !== this.props.history) {
      this.setState({history: nextProps.history})
    }
  }

  render() {
    const isBTC = this.state.currency === 'BTC';
    let sortedData = [];
    const history = this.state.history;
    if(history && history.length) {
      sortedData = this.sortData(history);
    }
    return (
      <div className="trades-table chart col-12 col-sm-6 col-md-12">
        <div className="chart__top justify-content-between row">
          <div className="chart-name">Recent Trades</div>
          <Desktop>
            <div className="chart-controls align-items-center justify-content-between row">
              <div className="control-resize"></div>
              <div className="control-dash"></div>
            </div>
          </Desktop>
        </div>

        <div className="trades-table-wrapper js-table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => this.onColumnSort('Price')}>
                  <div>Price ({this.state.currency}) <span className={classNameForColumnHeader(this.state, 'Price')}></span></div>
                </th>
                <th onClick={() => this.onColumnSort('Quantity')}>
                  <div>Trade Size <span className={classNameForColumnHeader(this.state, 'Quantity')}></span></div>

                </th>
                <th  onClick={() => this.onColumnSort('TimeStamp')}>
                  <div>Time <span className={classNameForColumnHeader(this.state, 'TimeStamp')}></span></div>
                </th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody className="tbody" ref= {ele => {this.tbody = ele}}>
              {sortedData.map((order, index) => (
                <OrderHistoryRow

                  key={order.Id}
                  isBTC={isBTC}
                  price={order.Price}
                  size={order.Quantity}
                  type={order.OrderType}
                  date={new Date(order.TimeStamp)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const OrderHistoryRow = ({type, date, price, size, isBTC}) => {
  const isSellOrder = type === 'SELL';
  return (
    <tr className={isSellOrder ? 'up' : 'down'}>
      <td>
        {formatFloat(price, isBTC)} <span className={classNames('icon', 'icon-dir',
          isSellOrder ? 'icon-down-dir' : 'icon-up-dir')}></span>
      </td>
      <td>
        {formatFloat(size)}
      </td>
      <td>
        {date.toLocaleTimeString()}
      </td>
      <td>
        {isSellOrder ? 'S' : 'B'}
      </td>
    </tr>
  );
};

export default RecentTrades;
