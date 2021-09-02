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
    const orderProducts = JSON.parse(localStorage.getItem("order"))
    const listOder = [];
    orderProducts.forEach(element => {
        listOder.push(element)
    });
    useEffect(() => {
        setDataLocal(listOder)
    }, [])
    return (
        <aside className="top-0 right-0 w-full md:w-2/5 shadow-2xl bg-white fixed h-full z-30 mt-24" id="cart-panel">           
            <div className="p-5">
                <button onClick={closeCart} className="bg-gray-200 py-2 px-6 rounded-full mt-6" id="close-cart-panel"><i className="fas fa-times" /></button>

                <main className="text-center font-bold">
                <i className="fas fa-shopping-basket fa-3x mx-auto" />
                {dataLocal.length > 0 ?(
                    <>
                    <table className=" mx-auto mt-7">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Sản phẩm</th>
                            <th className="px-4 py-2">Số lượng</th>
                            <th className="px-4 py-2">Giá </th>
                            <th className="px-4 py-2">Ghi chú</th>

                        </tr>
                        </thead>
                        <tbody>
                        {dataLocal.map((value) => {   
                            return(
                                <>
                                    <tr>
                                        <td className="text-left border border-gray-400 px-4 py-2 w-3/12 break-all">{value.name}</td>
                                        <td className="border border-gray-400 px-4 py-2 break-all w-2/12">{value.quantity}</td>
                                        <td className="text-left border border-gray-400 px-4 py-2 break-all w-2/12">{value.price} VNĐ</td>
                                        <td className="text-left border border-gray-400 px-4 py-2 break-all w-4/12">{value.notes}</td>
                                    </tr>
                                </>)
                        })}
                        </tbody>
                    </table>
                    </>
                ):null}
                           
                <div className="mt-10 text-lg">Tổng cộng: <span className="text-custom-yellow">300000 VNĐ</span></div>
                <button className="rounded-lg bg-custom-yellow px-4 py-2 font-bold mt-6 hover:text-white text-xl transition">Đặt hàng</button>
                </main>
            </div>
        </aside>

    );
};

export default Cart;