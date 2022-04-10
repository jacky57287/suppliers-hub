import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import AppContextProvider from '../@crema/utility/AppContextProvider';
import {Provider} from 'react-redux';
import AppThemeProvider from '../@crema/utility/AppThemeProvider';
import AppStyleProvider from '../@crema/utility/AppStyleProvider';
import AppLocaleProvider from '../@crema/utility/AppLocaleProvider';
import FirebaseAuthProvider from '../@crema/services/auth/firebase/FirebaseAuthProvider';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import {useStore} from '../redux/store'; // Client-side cache, shared for the whole session of the user in the browser.
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import {createHttpLink} from '@apollo/client';
import {MultiAPILink} from '@habx/apollo-multi-endpoint-link';
import resellers from '../content/resellers.json';

import '../@crema/services/index';
import '../shared/vendors/index.css';
import AppPageMeta from '../@crema/core/AppPageMeta';
import JWTAuthAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';
import {NhostClient} from '@nhost/nhost-js';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const store = useStore(pageProps.initialReduxState);

  // const nhost = new NhostClient({
  //   backendUrl: 'https://ggqyxooxmybqcoupvkmo.nhost.run'
  // })
  // resellers.systemEndPoint = nhost.graphql.getUrl();

  console.log('resellers', resellers);

  const client = new ApolloClient({
    link: ApolloLink.from([
      new MultiAPILink({
        endpoints: resellers,
        createHttpLink: () => createHttpLink(),
        getContext: (endpoint) => {
          if (endpoint === 'systemEndPoint') {
            return {
              headers: {
                Authorization:
                  'Bearer 8640dc80dc0656b47b0a84907fb2b85c2bfe976adc27f36a2159e3a0032e13174f74a917e53bf53c78605555b54155374b3dfaff419601600011488e44ba31c40744129eb790f144115d5b0a9f017c18ea4d4991e6ba1fa2da734dc8f7afaee329f090041d9b21dea0b10e76c62943700b5de1f6d204f75faf2898c7f0b0ce5c',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                  'Origin, X-Requested-With, Content-Type, Accept',
              },
            };
          }
          return {};
        },
      }),
    ]),
    cache: new InMemoryCache(),
  });

  // fetchOptions: {
  //   mode: 'no-cors',
  // },

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <AppContextProvider>
          <Provider store={store}>
            <AppThemeProvider>
              <AppStyleProvider>
                <AppLocaleProvider>
                  {/* <FirebaseAuthProvider> */}
                  <JWTAuthAuthProvider>
                    <AuthRoutes>
                      <CssBaseline />
                      <AppPageMeta />
                      <Component {...pageProps} />
                    </AuthRoutes>
                  </JWTAuthAuthProvider>
                  {/* </FirebaseAuthProvider> */}
                </AppLocaleProvider>
              </AppStyleProvider>
            </AppThemeProvider>
          </Provider>
        </AppContextProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
