import React from 'react';
import burger from '../../../assets/img/burger.png'

import "../../../styles/styles.scss"



const TopSelling = () => {
    return (
        <div className="md:p-16 pt-mobile" id="order">
            <div className="font-bold text-mobile text-center md:text-2xl xl:text-5xl pb-mobile mb-5">
                Top Rating
            </div>
            <div className="flex justify-center xl:mt-20 font-bold text-center items-center text-lg pb-mobile">
                <div className="mt-5 grid lg:grid-cols-4 sm:grid-cols-2 width-mobile gap-16 md:w-4/5 xl-grid-cols-3 xl2-grid-cols-5">
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg item">
                        <img src={burger} alt="burger" className="w-full transform hover:scale-90 transition duration-300" />
                        <div className="m-3 text-center">
                            <span className="font-bold text-xl">Bacon jammer</span>
                            <span className="block text-gray-600 text-sm">bacon, iceberg, mayo</span>
                            <span className="block text-custom-yellow mt-10 font-bold text-3xl">$ 3.50</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg item">
                        <img src={burger} alt="burger" className="w-full transform hover:scale-90 transition duration-300" />
                        <div className="m-3 text-center">
                            <span className="font-bold text-xl">Bacon jammer</span>
                            <span className="block text-gray-600 text-sm">bacon, iceberg, mayo</span>
                            <span className="block text-custom-yellow mt-10 font-bold text-3xl">$ 3.50</span>
                        </div>
                    </div> 
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg item">
                        <img src={burger} alt="burger" className="w-full transform hover:scale-90 transition duration-300" />
                        <div className="m-3 text-center">
                            <span className="font-bold text-xl">Bacon jammer</span>
                            <span className="block text-gray-600 text-sm">bacon, iceberg, mayo</span>
                            <span className="block text-custom-yellow mt-10 font-bold text-3xl">$ 3.50</span>
                        </div>
                    </div> 
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg item">
                        <img src={burger} alt="burger" className="w-full transform hover:scale-90 transition duration-300" />
                        <div className="m-3 text-center">
                            <span className="font-bold text-xl">Bacon jammer</span>
                            <span className="block text-gray-600 text-sm">bacon, iceberg, mayo</span>
                            <span className="block text-custom-yellow mt-10 font-bold text-3xl">$ 3.50</span>
                        </div>
                    </div> 
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg item">
                        <img src={burger} alt="burger" className="w-full transform hover:scale-90 transition duration-300" />
                        <div className="m-3 text-center">
                            <span className="font-bold text-xl">Bacon jammer</span>
                            <span className="block text-gray-600 text-sm">bacon, iceberg, mayo</span>
                            <span className="block text-custom-yellow mt-10 font-bold text-3xl">$ 3.50</span>
                        </div>
                    </div> 
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg item">
                        <img src={burger} alt="burger" className="w-full transform hover:scale-90 transition duration-300" />
                        <div className="m-3 text-center">
                            <span className="font-bold text-xl">Bacon jammer</span>
                            <span className="block text-gray-600 text-sm">bacon, iceberg, mayo</span>
                            <span className="block text-custom-yellow mt-10 font-bold text-3xl">$ 3.50</span>
                        </div>
                    </div> 
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg item">
                        <img src={burger} alt="burger" className="w-full transform hover:scale-90 transition duration-300" />
                        <div className="m-3 text-center">
                            <span className="font-bold text-xl">Bacon jammer</span>
                            <span className="block text-gray-600 text-sm">bacon, iceberg, mayo</span>
                            <span className="block text-custom-yellow mt-10 font-bold text-3xl">$ 3.50</span>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default TopSelling;