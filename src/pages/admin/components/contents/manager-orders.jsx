import React from 'react';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getOrder } from '../../../../services/api';
import { deleteProductOrder } from '../../../../redux/admin/action';

const ManagerOrders = () => {
    const [isFormDelete, setIsFormDelete] = useState(false)
    const [idDelete, setIdDelete] = useState()
    const [isFormDetail, setIsFormDetail] = useState(false)
    const [listUser, setListUser] = useState([])
    const [infoUser, setInfoUser] = useState([])
    const [infoOrder, setInfoOrder] = useState([])


    const dispatch = useDispatch()

    useEffect(() => {
        getOrder.on('value', (snapshot) => {
            const list = []
            snapshot.forEach((snap) => {
                let a = snap.val();
                const id = snap.key;
                const nameUser = a[0].nameUser;
                const numberUser = a[0].numberUser;
                const addressUser = a[0].addressUser;
                list.push({
                    id: id,
                    nameUser: nameUser,
                    numberUser: numberUser,
                    addressUser: addressUser 
                });
            })
            setListUser(list);
        })
        }, [])

    const handleShowFormDel = (id) => {
        setIsFormDelete(!isFormDelete)
        setIdDelete(id)      
    }

    const confirmDeleteOeder = () => {
        dispatch(deleteProductOrder(idDelete))
        setIsFormDelete(!isFormDelete)
    }
    const handleShowFormDetail = (id) => {
        setIsFormDetail(!isFormDetail)
        firebase.database().ref('products/' + "order").child(id).on('value', snapshot =>{
            const order = snapshot.val();
    
            const getUser = order.shift()
            const list = []
            list.push(getUser)
            setInfoUser(list)

            setInfoOrder(order);
        });
    }
    const cancelFormDetail = () => {
        setIsFormDetail(!isFormDetail)      
    }

    const totalPrice = () => {
        let price = 0
        infoOrder.forEach(value => {
            price+=value.price
        })
        return price
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className="relative">
            <h1 className="text-center text-2xl font-bold ">QUẢN LÝ ĐẶT HÀNG</h1>
            <div className="w-full my-10 flex">               
                <div className="bg-white h-full w-full mr-7">
                    <table className="min-w-full bg-white ">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">STT</th>
                                <th className="w-3/12 text-left py-3 px-4 uppercase font-semibold text-sm">Khách hàng</th>
                                <th className="w-3/12 text-left py-3 px-4 uppercase font-semibold text-sm">Số điện thoại</th>
                                <th className="w-3/12 text-left py-3 px-4 uppercase font-semibold text-sm">Địa chỉ</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 ">
                             {listUser.map((value, key) => {
                                return(
                                    <tr key={key} style={{borderBottom:"1px solid gray"}}>
                                        <td className="text-left py-2 px-4">{key}</td>
                                        <td className="text-left py-2 px-4">{value.nameUser}</td>
                                        <td className="text-left py-2 px-4">{value.numberUser}</td>
                                        <td className="text-left py-2 px-4">{value.addressUser}</td>
                                        <td className="flex py-2">
                                        <button onClick={()=>handleShowFormDetail(value.id)} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold w-20 py-2 rounded-md">Chi tiết</button>
                                        <button onClick={()=>handleShowFormDel(value.id)} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold w-20 py-2 rounded-md mx-4">Xóa</button>
                                        </td>
                                     </tr>                                         
                                    )
                                })}                                                             
                        </tbody>
                    </table>
                </div>
            </div>
            {isFormDelete && (
                <div className="absolute bg-blue-100 top-1/2 left-1/2 transform -translate-x-2/4 bg-white shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-2/4 z-10">
                    <h1 className="text-center text-2xl font-bold mb-8">Bạn có chắc chắn muốn xóa không?</h1>
                    <div className="flex justify-center">
                        <button onClick={confirmDeleteOeder} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                            Xác nhận
                        </button>
                        <button onClick={handleShowFormDel} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 ml-4">
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            )}
            {isFormDetail && (
                <div className="absolute top-1/4 left-1/2 transform -translate-x-2/4 bg-blue-100 shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-3/4 z-10">
                <h1 className="text-center text-2xl font-bold mb-6">Chi tiết</h1>
                <div className ="w-full">
                    {infoUser.map((value, index) => {
                        return(
                            <div key={index} className="w-1/2 mr-4 w-full">
                                <div className="flex">
                                    <label className="block text-gray-700 font-bold mb-2 text-xl mr-2">
                                        Tên:
                                    </label> 
                                    <label className="block text-gray-700 font-bold mb-2 text-xl">
                                        {value.nameUser}
                                    </label>                           
                                </div>
                                <div className="flex">
                                    <label className="block text-gray-700 font-bold mb-2 text-xl mr-2">
                                        Số điện thoại:
                                    </label>  
                                    <label className="block text-gray-700 font-bold mb-2 text-xl">
                                        {value.numberUser}
                                    </label>                           
                                </div>
                                <div className="flex">
                                    <label className="block text-gray-700 font-bold mb-2 text-xl mr-2">
                                        Địa chỉ:
                                    </label>
                                    <label className="block text-gray-700 text-xl font-bold mb-2">
                                        {value.addressUser}
                                    </label>                           
                                </div>
                            </div>  
                        )
                    })}
                    <div className="w-full">                              
                        <table className=" mx-auto mt-4 w-full">
                            <thead>
                            <tr>
                                <th className="px-1 text-xl">Name</th>
                                <th className="px-1 text-xl">Quantity</th>
                                <th className="px-1 text-xl">Price </th>
                                <th className="px-1 text-xl">Note</th>
                            </tr>
                            </thead>
                            <tbody>
                                {infoOrder.map((value, index) => {
                                    return(
                                        <tr key={index}>
                                            <td className="text-left border border-gray-400 text-xl p-2 px-1 w-3/12 break-all">{value.name}</td>
                                            <td className="border border-gray-400 text-xl p-2 px-1 break-all w-2/12">{value.quantity}</td>
                                            <td className="text-left border border-gray-400 text-xl p-2 px-1 break-all w-3/12">{numberWithCommas(value.price)} VNĐ</td>
                                            <td className="text-left border border-gray-400 text-xl p-2 px-1 break-all w-4/12">{value.note}</td>    
                                        </tr>                      
                                    )
                                })}
                            </tbody>
                        </table>
                        <h2 className="text-right w-full mr-8 text-md mt-5">Total: {numberWithCommas(totalPrice())} VND</h2>
                    </div>
                </div>
                    <div className="flex justify-center">
                        <button onClick={cancelFormDetail} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                        Hủy bỏ
                        </button>
                    </div>
            </div>
            )}
        </div>
    );
};

export default ManagerOrders;