import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import "../../../styles/styles.scss"



const TopSelling = () => {
    const dataFood = useSelector(state => state.allProducts.dataFood)
    const dataDrink = useSelector(state => state.allProducts.dataDrink)
    const [allProduct, setallProduct] = useState([])
 

    useEffect(() => {
        const allFoodDrink = [...dataFood(), ...dataDrink()]
        const topRating = allFoodDrink.filter((value)=> value.rate === 5)
        setallProduct(topRating)
    }, [])

    return (
        <div className="md:p-16 pt-mobile">
            <div className="font-bold text-mobile text-center md:text-2xl xl:text-5xl pb-mobile mb-5">
                Top Rating
            </div>
            <div className="grid lg:grid-cols-3 2xl:grid-cols-5 pb-20 text-gray-900 md:text-center">
                <div className="lg:col-span-5 w-2/3 m-auto">
                    <div className="mt-16">
                        <div className="mt-10 grid sm:grid-cols-2 xl-grid-cols-3 xl2-grid-cols-5 gap-16">
                        {allProduct.map((element, key) => {
                                return(
                                    <>
                                    <div key={key} className="bg-white rounded-lg shadow-md p-7 hover:shadow-lg item" style={{maxHeight:"454px"}}>
                                        <img src={element.image} alt="burger" className="w-full max-h-72 rounded-3xl" />
                                        <div className=" mt-5 text-center">
                                            <span className="font-bold text-2xl truncate">{element.name}</span>
                                            <span className="block text-gray-600 text-md max-h-6 overflow-hiden truncate">{element.description}</span>
                                            <div className="flex justify-between text-center mt-5">
                                                <span className="block text-custom-yellow  font-bold text-md"><i className="fas fa-tags"></i> {element.price} Đ</span>
                                                <span className="block text-custom-yellow font-bold text-md"> <i className="fas fa-star"></i> {element.rate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
            </div>
            </div>
        </div>
    );
};

export default TopSelling;
       
