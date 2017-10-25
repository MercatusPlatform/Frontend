import React from 'react';
import { Container, Row, Col } from 'reactstrap';


const template = '<div className="popover red-border-popover" role="tooltip"><div className="arrow"></div><h3 className="popover-header"></h3><div className="popover-body"></div></div>';

class ContractDetails extends React.Component {

  render() {
    return (
      <div className="row-fluid request-sent-block">
        <div className="container-fluid">
          <div className="row justify-content-start justify-content-md-center request-sent-title">
            <div className="col-auto text-center align-middle request-sent-title-text title-text">
              <span className="d-inline-block d-md-none icon icon-details icon-006-wrench"></span>contract details
            </div>
          </div>
          <div className="row justify-content-center d-flex d-md-none tooltip-text-block">
            <div className="tooltip-mobile-box">
              Amount of BTC/USD of your API key<br/>
              <span className="red">lower than Min contract amount</span>
            </div>
          </div>
          <div className="row justify-content-between request-sent-info">
            <div className="container-fluid">
              <ContractDetailRow
                name="Duration of contract:"
                value={this.props.duration}
                dim="days"
              />
              <ContractDetailRow
                name="Min contract amount:"
                value={this.props.amount}
                dim={this.props.currency}
              />
              <ContractDetailRow
                name="Max loss:"
                value={this.props.maxLoss}
                dim="%"
              />
              <ContractDetailRow
                name="Fee:"
                value={this.props.fee}
                dim="%"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <button onClick={this.props.onOfferSendClick} type="button" className="send-request-btn btn btn-secondary active">
                SEND REQUEST
                <span className="d-none d-md-inline-block icon icon-help icon-help-web-button"  data-toggle="popover" data-html="true" data-trigger="hover" data-content="YOUR REQUEST WILL BE <span className='green'>ACCEPTED</span> OR <span className='red'>DECLINED</span> WITHIN 24H"  data-template='<div className="popover request-popover" role="tooltip"><div className="arrow"></div><h3 className="popover-header"></h3><div className="popover-body"></div></div>'></span>
              </button>

            </div>
          </div>
          <div className="row justify-content-center d-flex d-md-none">
            <div className="col-auto">
              <div className="popover-send-text">
                YOUR REQUEST WILL BE ACCEPTED OR DECLINED WITHIN 24H
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const ContractDetailRow = ({ name, value, dim }) => (
  <div className="row d-flex justify-content-between request-sent-info-item">
    <div className="col-7 col-md-auto">
      <div className="left-info">{name}</div>
    </div>
    <div className="col-auto d-block d-none gap"></div>
    <div className="col col-md-auto">
      <div className="right-info">{value} <span className="attribute">{dim}</span>
      </div>
    </div>
  </div>

)

export default ContractDetails;
