import React from 'react';
import ContractInfo from './ContractInfo';
import ContractInfoEmpty from './ContractInfoEmpty';
import ContractFeedback from './ContractFeedback';
import ProfileFeedbacks from './ProfileFeedbacks';
import { Desktop } from '../../generic/MediaQuery';
import { CONTRACT_STATE_FINISHED, CONTRACT_STATE_HALTED } from '../../constants';

const SelectedContractInfo = ({ contract, onContractRate, time, userId }) => {
  if(!contract) {
    return (
      <Desktop>
        <ContractInfoEmpty/>
      </Desktop>
    );
  } else {
    if(contract.state === CONTRACT_STATE_FINISHED || contract.state === CONTRACT_STATE_HALTED) {
      if(canLeaveFeedback(contract, userId)) {
        return (
          <ContractFeedback
            onContractRate={onContractRate}
            contract={contract}
          />
        );
      } else {
        return (<ProfileFeedbacks
          comments={contract.feedbacks}
        />
        );
      }
    } else {
      return (<ContractInfo time={time} contract={contract}/>);
    }
  }
};

function canLeaveFeedback(contract, userId) {
  const feedback = contract.feedbacks.find(f => f.from._id === userId);
  return !feedback;
}

export default SelectedContractInfo;
