import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReactTable from '../generic/SelectableReactTable';

class TradeHistory extends React.Component {
  render() {
    return (
      <Col xs="12" sm="12" md="12" lg="12" xl="7" className="trade-block">
        <Container fluid className="h-100">
          <Row className="h-100">
            <Col className="trade-history">
              <div className="card">
                <div className="card-header">
                  <div className="container-fuild h-100">
                    <div className="row h-100 align-items-center">
                      <div className="col-auto title-text">
                        <span className="icon icon-profit icon-history-clock-button"></span>TRADE HISTORY
                      </div>
                      <div className="col">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {this.renderTable()}
                  <div className="d-flex d-md-none justify-content-center show-next-block">
                    <button type="button" className="btn btn-secondary">show one more week</button>
                  </div>
                </div>

              </div>
            </Col>
          </Row>
        </Container>
      </Col>
    );
  }

  renderTable() {
    const data = [{date: '123', type: 'Buy', price: 1, curency: 'BTC', amount: 3, total: 4, tx: ''}, {date: '123', type: 'Sell', price: 2, curency: 'BTC', amount: 5, total: 2, tx: ''}];
    const columns = [
      {
        Header: SortableHeader('Date'),
        accessor: 'date',
        className: 'table_col_value',

      },
      {
        Header: SortableHeader('Type'),
        Cell: TradeTypeCell,
        accessor: 'type',
        className: 'table_col_value',
      },
      {
        Header: SortableHeader('Price, BTC'),
        accessor: 'price',
        className: 'table_col_value',
      },
      {
        Header: SortableHeader('Amount'),
        accessor: 'amount',
        className: 'table_col_value',
      },
      {
        Header: SortableHeader('Total, BTC'),
        accessor: 'total',
        className: 'table_col_value',
      },
      {
        Header: SortableHeader('TX', false),
        accessor: 'tx',
        sortable: false,
        className: 'table_col_value',
      },
    ];
    return (
      <ReactTable
        data={data}
        columns={columns}
        onItemSelected={() => {}}
      />
    );

  }
}

const SortableHeader = (header, showSort = true) => (
  <div className="table_header_wrapper">
    <span className="table_header">{header}</span>
    {showSort ? (
      <div className="sort_icon_wrapper" style={{display: 'block', margin: 0}}>
        <div className="green_arrow green_arrow_bottom" ></div>
      </div>
    ) : null}
  </div>
);

const TradeTypeCell = row => {
  const className = row.original.type === 'Buy' ? 'green' : 'red';
  return (<div className={className}>{row.original.type}</div>);
};

export default TradeHistory;