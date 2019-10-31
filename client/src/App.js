import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from "./components/Home";
import UserDetail from "./components/UserDetail";
import EditDetail from "./components/EditDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/edit/:id"  component={EditDetail} />
          <Route path="/detail/:id" exact component={UserDetail} />
          <Route path="/" exact component={Home} />
          <Route render={() => <h2>Not Found</h2>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
