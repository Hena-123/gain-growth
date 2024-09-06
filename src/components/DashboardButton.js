import React from "react";
// import { useContext } from "react";
import './DashboardButton.css';

const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    },
    pink: {
      foreground: "#72255f",
      background: "#ff92b0"
    }
  };

const ThemeContext = React.createContext(themes.light);
ThemeContext.displayName="Theme";

export default function DashboardButton(props) {
    return (
        // <ThemeContext.Provider value={themes[props.theme]}>
        //     <ThemedButton onClickMethod={props.onClickMethod} buttonContent={props.buttonContent}/>
        // </ThemeContext.Provider>
        <ThemedButton onClickMethod={props.onClickMethod} buttonContent={props.buttonContent}/>
    );
}

function ThemedButton(args) {
    // const theme = useContext(ThemeContext);
    return (
      // style={{ background: theme.background, color: theme.foreground }}
    <button 
       className="button-17" onClick={() => args.onClickMethod()}>
        {args.buttonContent}
    </button>
    );
  }