import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Home from './components/home';
//import Products from '../products/products';
import {PATH_HOME, PATH_NULL, PATH_FOOD, PATH_DRINK} from '../../routers/router'
import ListFood from '../products/components/food/list-food';
import ListDrink from '../products/components/drink/list-drink';

const index = () => {
    return (
        <div>
                <Header/>
                    <Switch>
                        <Route exact path={PATH_NULL} component={Home} />
                        <Route exact path={PATH_HOME} component={Home} />
                        {/* <Route exact path={PATH_FOOD, PATH_DRINK} component={Products} /> */}
                        <Route exact path={PATH_FOOD} component={ListFood} />
                        <Route exact path={PATH_DRINK} component={ListDrink} />
                    </Switch>
                <Footer/>          

        </div>
            
    );
};

export default index;