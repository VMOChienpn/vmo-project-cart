import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import {PATH_MANAGER_ADMIN, PATH_MANAGER_ORDERS, PATH_MANAGER_PRODUCTS, PATH_ADMIN} from '../../routers/router'
import ManagerProducts from './components/contents/manager-products';
import ManagerOrders from './components/contents/manager-orders';
import ManagerAdmin from './components/contents/manager-admin';
const AdminPage = () => {
    return (
  
            <div className="flex bg-gray-200">
                <Sidebar/>
                <Header/>
                <div className ="w-full mt-20 ml-64 p-12 bg-gray-200 min-h-screen">
                    <div className="w-full">
                        <Switch>
                            <Route exact path={PATH_ADMIN} component={ManagerOrders} />
                            <Route exact path={PATH_MANAGER_ORDERS} component={ManagerOrders} />
                            <Route exact path={PATH_MANAGER_PRODUCTS} component={ManagerProducts} />
                            <Route exact path={PATH_MANAGER_ADMIN} component={ManagerAdmin} />
                        </Switch>     
                    </div>
                </div>
            </div>
   
    );
};



export default AdminPage;