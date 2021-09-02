import React from 'react';
import { useDispatch } from 'react-redux';

import "../../../styles/styles.scss"
import { getKeySearch } from '../../../redux/products/action';

const Search = () => {
    const dispatch = useDispatch()
    const handleOnChange = (e) => {
        const keySearch = e.target.value
        dispatch(getKeySearch(keySearch))     
    }
    return (
        <div className="md:w-7/12 xl:w-4/12 w-full-mobile">
            <div className="bg-white flex items-center rounded-full shadow-xl mx-5">
                <input onChange={handleOnChange} className=" h-16  rounded-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search..." />
                {/* <button className="text-white rounded-3xl p-2 focus:outline-none w-20 h-16 flex items-center justify-center text-gray-800 hover:text-yellow-300 text-2xl transition-all">
                    <i className="fas fa-search"></i>
                </button> */}
            </div>
        </div>
    );
};

export default Search;