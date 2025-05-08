import 'styled-components';

// Define the shape of your theme
interface AppTheme {
  background: string;
  text: string;
  secondaryText: string;
  border: string;
  buttonBackground: string;
  buttonHover: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      secondaryText: string;
      border: string;
      buttonBackground: string;
      buttonHover: string;
    };
  }
}


// Extend the DefaultTheme interface for styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}