import React from 'react';
import {useQuery, gql} from '@apollo/client';
const EXCHANGE_RATES = gql`
  query GetExchangeRates @api(contextKey: "apiName") {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
const Dashboard = () => {
  const {loading, error, data} = useQuery(EXCHANGE_RATES, {
    context: {apiName: 'store1'},
  });
  console.log('response', data);
  return <div>Check console log for graphql result</div>;
};

export default Dashboard;
