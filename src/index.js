import React, { useState } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import Main from "./main";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { themes } from "./components/themes";
import { useDarkMode } from "./components/useDarkMode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretRight,
  faCopy,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { UnmountClosed } from "react-collapse";
import Welcome from "./components/welcome";

library.add(faCaretRight);
library.add(faTimes);
library.add(faCopy);

const App = (props) => {
  const [themeKey, themeSetter] = useDarkMode();
  const [firstVisit, setFirstVisit] = useState(true);
  const [featureOpen, setFeatureOpen] = useState(false);

  const handleTips = () => {
    setFirstVisit(true);
    setFeatureOpen(true);
  };

  const _Welcome = (
    <UnmountClosed isOpened={firstVisit}>
      <Welcome
        onClose={() => {
          setFirstVisit(false);
        }}
        featureOpen={featureOpen}
        setFeatureOpen={setFeatureOpen}
      />
    </UnmountClosed>
  );

  const _Main = (
    <Main
      themeKey={themeKey}
      themeSetter={themeSetter}
      handleTips={handleTips}
    />
  );

  return (
    <ThemeProvider theme={themes[themeKey]}>
      <GlobalStyles />
      {_Welcome}

      <Router>
        <Switch>
          <Route exact path="/">
            {_Main}
          </Route>
          <Route exact path="/:langExt">
            {_Main}
          </Route>
          <Route exact path="/:langExt/:id">
            {_Main}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
