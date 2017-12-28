import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import Customer from '../views/Customer/components/Customer';
import CustomerDetail from '../views/Customer/components/CustomerDetail';
import Staff from '../views/Staff/components';
import SharingManagement from '../views/SharingManagement';
import Login from '../views/Login/components/Login';
import ControlTotalComponent from '../views/ControlTotalComponent/ControlTotalComponent';


const consoleWrap = Content => class ConsoleWrap extends Component {
    render() {
        return <ControlTotalComponent { ...this.props } Content={ Content } />;
    }
};

class RoutesComponent extends Component {
    render() {
        return(
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/customer" exact component={ consoleWrap(Customer) } />
                <Route path="/staff" exact component={ consoleWrap(Staff) } />
                <Route path="/sharing" exact component={ consoleWrap(SharingManagement)} />
                <Redirect to={ '/customer' } />
            </Switch>
        );
    }
}

const Routes = () => <HashRouter>
    <Route path="/" component={ RoutesComponent } />
</HashRouter>;
export default Routes;