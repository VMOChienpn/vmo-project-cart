import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import "../../../../styles/styles.scss"
import svgHamburger from "../../../../assets/img/hamburger.svg"
import {changeStatusShowInfoProduct} from '../../../../redux/products/action/index'
import { getIdFood } from '../../../../redux/products/action/index';
import Cart from '../cart';
import {changeStatusShowCart} from '../../../../redux/products/action'
import Search from '../search';
import FoodInfo from './food-info';

const ListFood = () => {
    const isStatusShowCart = useSelector((state) => state.allProducts.isStatusShowCart)
    const isStatusShowInfoProduct = useSelector((state) => state.allProducts.isStatusShowInfoProduct)
    const dataFood = useSelector(state => state.allProducts.dataFood)
    const keySearch = useSelector(state => state.allProducts.keySearch)
    const [listFoods, setListFoods] = useState([])
    
    const showCart = () => {
        dispatch(changeStatusShowCart())
    }
    const dispatch = useDispatch()
    const showInfoProduct = () => {
        dispatch(changeStatusShowInfoProduct());
    }

    useEffect(() => {
        setListFoods(dataFood())
    }, [])

    const handleClick = (e) => {
        showInfoProduct()
        const id = e.currentTarget.id;
        dispatch(getIdFood(id))
    }
    const filterProduct = listFoods.filter((value) => {
        if(value.name.trim().toLowerCase().match(keySearch.trim().toLowerCase())){
            return value;
        } 
    })
    return (
        <div className="bg-gray-100" style={{minHeight:"85vh"}}>
            <div className=" mt-28 mt-32-mobile relative">
                <div className="flex justify-end pt-6">
                    <Search/>
                    <button onClick={showCart} className=" font-bold text-xl rounded-full bg-white mr-6 py-4 px-5 shadow-lg hover:bg-yellow-300 transition-all hover:text-white" ><i className="fas fa-shopping-basket" />
                    </button>
                </div>
                {isStatusShowCart?<Cart/>:null}
                <div className="grid lg:grid-cols-3 2xl:grid-cols-5 pb-20 text-gray-900 md:text-center">
                {isStatusShowInfoProduct?<FoodInfo/>:null}
                    <main className="lg:col-span-5 w-2/3 m-auto">
                        <div className="mt-16">
                            <div className="flex justify-center">
                                <span className="font-bold text-2xl md:text-4xl">Food</span>
                                <img src={svgHamburger} alt="svgHumburger" className="h-6 w-6 md:h-8 md:w-8 ml-2 md:ml-5 inline-flex" />
                            </div>
                            {filterProduct.length > 0 ? (
                            <>
                                <div className="mt-10 grid sm:grid-cols-2 xl-grid-cols-3 xl2-grid-cols-5 gap-16">
                                    {filterProduct.map((food, key)=>{
                                        return(
                                            <div key={key} id={food.id} onClick={handleClick} className="bg-white rounded-lg shadow-md p-7 hover:shadow-lg item" style={{maxHeight:"454px"}}>
                                                    <img src={food.image} alt="burger" className="w-full max-h-72 rounded-3xl transform hover:scale-105 transition duration-300" />
                                                        <div className=" mt-5 text-center">
                                                            <span className="font-bold text-2xl">{food.name}</span>
                                                            <span className="block text-gray-600 text-md max-h-6 overflow-hiden truncate">{food.description}</span>
                                                            <div className="flex justify-between text-center mt-5">
                                                                <span className="block text-custom-yellow  font-bold text-2xl"><i className="fas fa-tags"></i> {food.price} Đ</span>
                                                                <span className="block text-custom-yellow font-bold text-xl"> <i className="fas fa-star"></i> {food.rate}</span>
                                                        </div>
                                                    </div>
                                            </div>  
                                        )
                                    })}
                                </div>               
                            </>                
                            ):(
                                <>
                                    <div className="mt-10 grid sm:grid-cols-2 xl-grid-cols-3 xl2-grid-cols-5 gap-16">
                                        {listFoods.map((food, key)=>{
                                            return(
                                                
                                                <div key={key} id={food.id} onClick={handleClick} className="bg-white rounded-lg shadow-md p-7 hover:shadow-lg item" style={{maxHeight:"454px"}}>
                                                        <img src={food.image} alt="burger" className="w-full max-h-72 rounded-3xl transform hover:scale-105 transition duration-300" />
                                                            <div className=" mt-5 text-center">
                                                                <span className="font-bold text-2xl">{food.name}</span>
                                                                <span className="block text-gray-600 text-md max-h-6 overflow-hiden truncate">{food.description}</span>
                                                                <div className="flex justify-between text-center mt-5">
                                                                    <span className="block text-custom-yellow  font-bold text-2xl"><i className="fas fa-tags"></i> {food.price}Đ</span>
                                                                    <span className="block text-custom-yellow font-bold text-xl"> <i className="fas fa-star"></i> {food.rate}</span>
                                                            </div>
                                                        </div>
                                                </div>  
                                            )
                                        })}
                                    </div>               
                                </>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>       
    );
};

export default ListFood;