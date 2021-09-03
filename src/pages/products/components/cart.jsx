import React from 'react';
import {useDispatch} from 'react-redux'
import { useState, useEffect } from 'react';

import "../../../styles/styles.scss"
import {changeStatusShowCart} from '../../../redux/products/action'

const Cart = () => {
    const [dataLocal, setDataLocal] = useState([])
    const dispatch = useDispatch()
    const closeCart = () => {
        dispatch(changeStatusShowCart())
    }
    
    useEffect(() => {
        const listOder = [];
        const orderProducts = (JSON.parse(localStorage.getItem("order")))
        if(orderProducts !== null){
            orderProducts.forEach(element => {
                element.price = element.quantity * element.price
                listOder.push(element)
            });      
        }
        else{
            return;
        }
        setDataLocal(listOder)
    }, [])


    const clearProduct = () => {
        dataLocal.length = []
        localStorage.setItem("order", JSON.stringify(dataLocal))
    }

    const deleteItem = (e) => {
        const filterItem = dataLocal.filter(item => item.id !== e.target.id)
        localStorage.setItem("order", JSON.stringify(filterItem))
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleTotalPrice = () => {
        let price = 0
        dataLocal.forEach(value => {
            price+=value.price
        })
        return price
    }

    return (
        <aside className="top-0 right-0 w-full md:w-2/5 shadow-2xl bg-white fixed h-full z-30 mt-24 overflow-y-scroll" id="cart-panel">           
            <div className="p-5 mb-32">
                <div className="flex justify-between align-center mb-6">
                    <button onClick={closeCart} className="bg-gray-200 py-2 px-6 rounded-full mt-6" id="close-cart-panel"><i className="fas fa-times" /></button>
                    <button onClick={clearProduct} className="rounded-lg bg-custom-yellow px-4 py-2 font-bold mt-6 hover:text-white text-xl transition">Xóa sản phẩm</button>
                </div>
                <main className="text-center font-bold ">
                <i className="fas fa-shopping-basket fa-3x mx-auto" />
                {dataLocal.length > 0 ?(
                    <>
                    <table className=" mx-auto mt-7">
                        <thead>
                        <tr>
                            <th className="px-1">Sản phẩm</th>
                            <th className="px-1">Số lượng</th>
                            <th className="px-1">Giá </th>
                            <th className="px-1">Ghi chú</th>
                            <th className="px-1"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataLocal.map((value, key) => {   
                            return(
                                <>
                                    <tr key={key}>
                                        <td className="text-left border border-gray-400 px-1 w-3/12 break-all">{value.name}</td>
                                        <td className="border border-gray-400 px-1 break-all w-2/12">{value.quantity}</td>
                                        <td className="text-left border border-gray-400 px-1 break-all w-3/12">{numberWithCommas(value.price)} VNĐ</td>
                                        <td className="text-left border border-gray-400 px-1 break-all w-4/12">{value.notes}</td>  
                                        <td className="text-left border border-gray-400 px-1  w-4/12">
                                            <button  id={value.id} onClick={deleteItem} className="rounded-lg bg-custom-yellow px-3 py-3 hover:text-white transition fas fa-trash-alt"></button>
                                        </td>   
                                    </tr>
                                </>)
                        })}
                        </tbody>
                    </table>
                    </>
                ):(<div className="my-10 font-bold text-xl">Không có sản phẩm</div>)}
                           
                <div className="mt-10 text-lg">Tổng cộng: <span className="text-custom-yellow">{numberWithCommas(handleTotalPrice())} VNĐ</span></div>
                <button className="rounded-lg bg-custom-yellow px-4 py-2 font-bold mt-6 hover:text-white text-xl transition">Đặt hàng</button>
                </main>
            </div>
        </aside>

    );
};

export default Cart;