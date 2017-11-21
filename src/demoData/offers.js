import { generateId, getRandomContractCurrency } from './util';
import { CONTRACT_STATE_INIT, CONTRACT_STATE_ACCEPTED } from '../constants';
export function generateOffer(keyId, state, from, to) {
  const date = new Date(Date.now() - Math.floor(Math.random() * 86400000));
  const maxLoss = Math.floor(Math.random() * 20 + 10);
  const amount = Math.floor(Math.random() * 90 + 10);
  const fee = Math.floor(Math.random() * 20 + 10);
  const currency = getRandomContractCurrency();
  return {_id: generateId(), keyId, state, date, amount, currency,
    fee, maxLoss, fromUser: [{name: from}], toUser: [{name: to}]};
}

export function getRandomState() {
  return (Math.floor(Math.random() * 2) ? CONTRACT_STATE_INIT : CONTRACT_STATE_ACCEPTED);
}
