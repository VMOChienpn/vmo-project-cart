import React from 'react';
import {useDispatch} from 'react-redux'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../../styles/styles.scss"
import {addProductOrderFirebase, changeStatusShowCart} from '../../../redux/products/action'

const Cart = () => {
    const [dataLocal, setDataLocal] = useState([])
    const [showOrderHistory, setShowOrderHistory] = useState([])
    const [btnShowHistory, setBtnShowHistory] = useState(false)
    const [detailts, setDetails] = useState({nameUser: "", numberUser: "", addressUser:""})
    //const [isValid, setIsValid] = useState(false)

    const dispatch = useDispatch()
    const closeCart = () => {
        dispatch(changeStatusShowCart())
    }
    
    const orderProducts = (JSON.parse(localStorage.getItem("order")))
    useEffect(() => {
        const listOder = [];  
        orderProducts.forEach(element => {
            element.price = element.quantity * element.price
            listOder.push(element)
        });      
        setDataLocal(orderProducts)
        return () => {
            setDataLocal(orderProducts)
        }
    }, [])
    

    const clearProduct = () => {
        dataLocal.length = []
        localStorage.setItem("order", JSON.stringify(dataLocal))
    }
    const clearHistory = () => {
        dataLocal.length = []
        localStorage.setItem("ordered", JSON.stringify(dataLocal))
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

    const submitHandle = (e) => {
        e.preventDefault()
    }

    const btnHistory = () => {
        if(localStorage.getItem("ordered") === null){
            localStorage.setItem("ordered", JSON.stringify([]))
        }
        const listOrdered = JSON.parse(localStorage.getItem("ordered"))
        setShowOrderHistory(listOrdered)
        setBtnShowHistory(!btnShowHistory)
    }
    const btnOrder = async() => {
        const listOrdered = await(JSON.parse(localStorage.getItem("ordered")))
        const orderedInfo = await([detailts,...dataLocal]) 
        console.log(orderedInfo);
        dispatch(addProductOrderFirebase(orderedInfo));
        const listOrder = await(JSON.parse(localStorage.getItem("order")))
        const orderHistory = await([...listOrder, ...listOrdered])
        setShowOrderHistory(orderHistory)
        await(localStorage.setItem("ordered", JSON.stringify(orderHistory)))
        localStorage.setItem("order", JSON.stringify([]))
        toast.success("Order Success", {
            position: "bottom-right",
        })
    }

    return (
        <aside className="top-0 right-0 w-full md:w-2/5 shadow-2xl bg-white fixed h-full z-30 mt-24 overflow-y-scroll" id="cart-panel">  
                     
            <div className="p-5 mb-32">
                <div className="flex justify-between align-center mb-6">
                    <button onClick={closeCart} className="bg-gray-200 py-2 px-6 rounded-full mt-6" id="close-cart-panel"><i className="fas fa-times" /></button>
                    <div>
                        <button onClick={btnHistory} className="rounded-lg bg-custom-yellow px-4 py-2 font-bold mt-6 hover:text-white text-xl transition mr-2">Order history</button>
                        <button onClick={clearProduct} className="rounded-lg bg-custom-yellow px-4 py-2 font-bold mt-6 hover:text-white text-xl transition">Clear Order</button>
                    </div>
                </div>
                <main className="text-center font-bold">
                <i className="fas fa-shopping-basket fa-3x mx-auto mt-10" />
                {dataLocal.length > 0 ?(
                    <>
                    <table className=" mx-auto mt-6">
                        <thead>
                        <tr>
                            <th className="px-1">Name</th>
                            <th className="px-1">Quatity</th>
                            <th className="px-1">Price </th>
                            <th className="px-1">Note</th>
                            <th className="px-1"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataLocal.map((value, index) => {   
                            return(
                               
                                    <tr key={index}>
                                        <td className="text-left border border-gray-400 px-1 w-3/12 break-all">{value.name}</td>
                                        <td className="border border-gray-400 px-1 break-all w-2/12">{value.quantity}</td>
                                        <td className="text-left border border-gray-400 px-1 break-all w-3/12">{numberWithCommas(value.price)} VNĐ</td>
                                        <td className="text-left border border-gray-400 px-1 break-all w-4/12">{value.notes}</td>  
                                        <td className="text-left border border-gray-400 px-1  w-4/12">
                                            <button  id={value.id} onClick={deleteItem} className="rounded-lg bg-custom-yellow px-3 py-3 hover:text-white transition fas fa-trash-alt"></button>
                                        </td>   
                                    </tr>
                                )
                        })}
                        </tbody>
                    </table>
                    <div className=" w-fill my-4 border-input"/>
                    <form onSubmit={submitHandle} className="w-7/12 mx-auto">
                        <p className="text-xl">Consignee information </p>
                        <div className="bg-white pt-4">
                            <div className="mb-4 flex">
                                <input onChange={(e)=>setDetails({...detailts, nameUser:e.target.value})} className="border-input rounded w-full py-2 px-3 text-gray-700 focus:outline-none " placeholder="name"/>
                            </div>
                            <div className="mb-4">
                                <input onChange={(e)=>setDetails({...detailts, numberUser:e.target.value})} className="border-input rounded w-full py-2 px-3 text-gray-700 focus:outline-none " placeholder="phone number" />
                            </div>
                            <div className="mb-4">
                                <input onChange={(e)=>setDetails({...detailts, addressUser:e.target.value})} className="border-input rounded w-full py-2 px-3 text-gray-700 focus:outline-none " placeholder="address" />
                            </div>
                        </div>
                        <div className="mt-10 text-lg">Total: <span className="text-custom-yellow">{numberWithCommas(handleTotalPrice())} VNĐ</span></div>
                        <button onClick={btnOrder} className="rounded-lg bg-custom-yellow px-4 py-2 font-bold mt-6 hover:text-white text-xl transition">ORDER</button>
                        <ToastContainer/>
                    </form>

                    </>
                ):(<div className="my-6 font-bold text-xl">No products</div>)}
                {/* {isValid && (<div className="text-md">Please fill in all fields</div>)} */}
                
                </main>
                {btnShowHistory && (
                <div className="mt-10 ">
                    <p className="text-xl font-bold text-center">Order history</p>
                    <table className=" mx-auto mt-4 w-full">
                        <thead>
                        <tr>
                            <th className="px-1">Name</th>
                            <th className="px-1">Quatity</th>
                            <th className="px-1">Price </th>
                            <th className="px-1">Note</th>
                        </tr>
                        </thead>
                        <tbody>
                       
                            {showOrderHistory.map((value, key) => {   
                                return(
                                    
                                        <tr key={key}>
                                            <td className="text-left border border-gray-400 px-1 w-3/12 break-all">{value.name}</td>
                                            <td className="border border-gray-400 px-1 break-all w-2/12">{value.quantity}</td>
                                            <td className="text-left border border-gray-400 px-1 break-all w-3/12">{numberWithCommas(value.price * value.quantity)} VNĐ</td>
                                            <td className="text-left border border-gray-400 px-1 break-all w-4/12">{value.notes}</td>    
                                        </tr>
                                    )
                            })}
                        
                        </tbody>
                    </table>
                    <button onClick={clearHistory} className="rounded-lg bg-custom-yellow px-4 py-2 font-bold mt-6 hover:text-white text-xl transition">Clear History</button>
                </div>
                )}
            </div>
            
        </aside>

    );
};

export default Cart;