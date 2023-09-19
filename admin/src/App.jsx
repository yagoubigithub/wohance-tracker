
import "./App.scss"
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute'


//pages
import Home from './pages/home/Home';

import AdminDashboard from './pages/admindashboard/AdminDashboard';

function App() {
  return (
    <div className="App">
    <BrowserRouter >
       
       <Switch>
       <Route path="/" exact component={Home} />
    
       <PrivateRoute  path="/dashboard" component={AdminDashboard} />


       </Switch>

       </BrowserRouter>
    </div>
  );
}

export default App;
