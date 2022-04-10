import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import AuthWrapper from '../AuthWrapper';
import SigninFirebase from './SigninFirebase';
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo';
import SigninJwtAuth from './SigninJwtAuth';
import {useQuery, gql, useMutation} from '@apollo/client';
const EXCHANGE_RATES = gql`
  query GetPost @api(contextKey: "apiName") {
    allPost: posts {
      data {
        id
        attributes {
          postname
        }
      }
    }
  }
`;

//  mutation  @api(contextKey: "apiName"){
//   login(input:{identifier: "test1@gmail.com", password:"password"}){
//     jwt
//   }
// }
const Signin = () => {
  // const { loading, error, data } = useQuery(EXCHANGE_RATES, {
  //   context: { apiName: 'systemEndPoint' },
  // });

  // console.log("systemEndPoint", data)
  // const [login] = useMutation(EXCHANGE_RATES, {
  //   context: { apiName: 'systemEndPoint' },
  // });

  useEffect(() => {
    //   {
    //     variables: {
    //         id: id
    //     },
    // }
    // console.log("fdfds")
    // login({
    //   variables:{}
    // })
    //     .then(resp => {
    //         // refetch()
    //         console.log("resp", resp)
    //     })
    //     .catch(error => {
    //         console.log("error", error)
    //     });
  }, []);

  const {data} = useQuery(EXCHANGE_RATES, {
    context: {apiName: 'systemEndPoint'},
  });
  console.log('response', data);

  return (
    <AuthWrapper>
      <Box sx={{width: '100%'}}>
        <Box sx={{mb: {xs: 6, xl: 8}}}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AppLogo />
          </Box>
        </Box>

        {/* <SigninFirebase /> */}
        <SigninJwtAuth />
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
