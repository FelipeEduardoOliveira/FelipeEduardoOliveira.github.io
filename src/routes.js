import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';      

import Main from './pages/main';
import Repositorio from './pages/repos';

function Routes (){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route  path='/repositorio/:repositorio' component={Repositorio} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;