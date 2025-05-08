import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
// import { ThemeProvider } from 'styled-components';

const lightTheme = {
  background: '#fff',
  text: '#000',
  secondaryText: '#666',
  border: '#ddd',
  buttonBackground: '#007bff',
  buttonHover: '#0056b3',
};

const darkTheme = {
  background: '#333',
  text: '#fff',
  secondaryText: '#aaa',
  border: '#555',
  buttonBackground: '#0056b3',
  buttonHover: '#003d82',
};

// Map the custom theme to styled-components theme
const getStyledTheme = (theme: 'light' | 'dark') => (theme === 'light' ? lightTheme : darkTheme);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <CustomThemeProvider>
        <ApolloProvider client={client}>
          <RouterProvider router={App} />
        </ApolloProvider>
    </CustomThemeProvider>
  </React.StrictMode>
  // <React.StrictMode>
  //   <ApolloProvider client={client}>
  //     {/* ThemeProvider will be dynamically updated in child components */}
  //     <RouterProvider router={App} />
  //   </ApolloProvider>
  // </React.StrictMode>
);

reportWebVitals();



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { RouterProvider } from 'react-router-dom';
// import { ApolloProvider } from '@apollo/client';
// import client from './apolloClient';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <RouterProvider router={App} />
//     </ApolloProvider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
