import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <CustomThemeProvider>
        <ApolloProvider client={client}>
          <RouterProvider router={App} />
        </ApolloProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
