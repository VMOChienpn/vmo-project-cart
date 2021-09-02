import React from 'react';
import {Link} from 'react-router-dom';

import "../../styles/styles.scss"
import { PATH_NULL, PATH_HOME, PATH_FOOD, PATH_DRINK} from '../../routers/router'


const Header = () => {
    return (   
            <div className="fixed top-0 left-0 w-full z-50 sm:flex sm:items-center sm:justify-center bg-custom-yellow md:p-8 md:px-16 pb-mobile">
                <div className="font-bold uppercase mr-auto flex-mobile p-mobile">
                    <Link to={PATH_NULL} href="#" className="text-2xl hover:text-white transition-option md:flex md:item-center"><i className="fas fa-user-ninja mr-2 " />
                        Food&amp;Drink
                    </Link>
                </div>
                <a href="#" className="text-2xl hover:text-white transition-option text-mobile">
                </a>
                <div className="font-bold text-2xl flex-mobile md:flex md:justify-center">
                    <Link to={PATH_HOME} className="py-2 px-5 transition-option hover:text-white ">Home</Link>
                    <Link to={PATH_FOOD} className="py-2 px-5 transition-option hover:text-white ">Food</Link>
                    <Link to={PATH_DRINK} className="py-2 px-5 transition-option hover:text-white ">Drink</Link>
                </div>
            </div>
    );
};

export default Header;