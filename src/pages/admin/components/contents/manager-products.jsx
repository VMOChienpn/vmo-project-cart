import React from 'react';
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'


import { addProductAdmin, deleteProductAdmin, editProductAdmin } from '../../../../redux/admin/action/index';

import { getFood, getDrink} from '../../../../services/api';

const ManagerProducts = () => {
    const [isFormAdd, setIsFormAdd] = useState(false)
    const [isFormDelete, setisFormDelete] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [rate, setRate] = useState()
    const [check, setCheck] = useState("foods")
    const [idDelete, setIdDelete] = useState()
    const [categoryDelete, setCategoryDelete] = useState()
    const [titleForm, setTitleForm] = useState("")
    const [btnStatusForm, setBtnStatusForm] = useState("")
    const [idEdit, setIdEdit] = useState("")
    const [categoryEdit, setCategoryEdit] = useState("")

 
    const [food, setFood] = useState([])
    const [drink, setDrink] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        getFood.on('value', (snapshot) => {
            const list = []
            snapshot.forEach((snap) => {
                const id = snap.key
                const name = snap.val().name
                const description = snap.val().description
                const price = snap.val().price
                const rate = snap.val().rate
                const image = snap.val().image
                const notes = snap.val().notes
                const quantity = snap.val().quantity
                list.push({
                    id: id,
                    name: name,
                    description: description,
                    price: price,
                    rate: rate,
                    image: image,
                    notes: notes,
                    quantity: quantity
                })
            })
            setFood(list)
        })
        getDrink.on('value', (snapshot) => {
            const list2 = []
            snapshot.forEach((snap) => {
                const id = snap.key
                const name = snap.val().name
                const description = snap.val().description
                const price = snap.val().price
                const rate = snap.val().rate
                const image = snap.val().image
                const notes = snap.val().notes
                const quantity = snap.val().quantity
                list2.push({
                    id: id,
                    name: name,
                    description: description,
                    price: price,
                    rate: rate,
                    image: image,
                    notes: notes,
                    quantity: quantity
                })
            })
            setDrink(list2)
        })
    }, [])

    const showFormAdd = (id, category) => {
        if(id && category){
            setIsFormAdd(!isFormAdd)
            setTitleForm("Sửa sản phẩm")
            setBtnStatusForm("Xác nhận")
            setIdEdit(id)
            setCategoryEdit(category)
            const listAll = [...food, ...drink]
            listAll.forEach(value => {
                if(value.id === id){
                    setName(value.name) 
                    setDescription(value.description)
                    setPrice(value.price)
                    setRate(value.rate)
                    setImage(value.image)
                }
            })

        }else{
            setIsFormAdd(!isFormAdd)
            setTitleForm("Thêm sản phẩm")
            setBtnStatusForm("Thêm mới")
        }
    }
    const handleShowFormDel = (id, category) => {
        setIdDelete(id)
        setCategoryDelete(category)
        setisFormDelete(!isFormDelete)
    }

    const getName = (e) => {
        setName(e.target.value);
    }
    const getDescription = (e) => {
        setDescription(e.target.value)
    }
    const getImage = (e) => {
        setImage(e.target.value)
    }
    const getPrice = (e) => {
        setPrice(e.target.value)
    }
    const getRate = (e) => {
        setRate(e.target.value)
    }
    const getCategory = (e) => {
        setCheck(e.target.value);
    }
    const addBtn = (e) => {
        if(idEdit){
            e.preventDefault()
            const notes = ""
            const quantity = ""
            dispatch(editProductAdmin(categoryEdit, idEdit, {name, description, image, price, rate, notes, quantity}))
            console.log(idEdit + categoryEdit);
        }else{
            e.preventDefault()
            const notes = ""
            const quantity = ""
            dispatch(addProductAdmin(check, {name, description, image, price, rate, notes, quantity}))
        }
        setIdEdit("")
        setCategoryEdit("")
    }
    const DeleteBtn = (e) => {
        e.preventDefault()
        dispatch(deleteProductAdmin(categoryDelete, idDelete))
        setisFormDelete(!isFormDelete)
    }
    const cancel = (e) => {
        e.preventDefault()
        setIsFormAdd(!isFormAdd)
    }
    return (
        <div className="h-auto">
            <h1 className="text-center text-2xl font-bold ">QUẢN LÝ SẢN PHẨM</h1> 

            <button onClick={()=>showFormAdd()} className=" mt-10 mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Thêm mới</button>   

            <div className="w-full">
                <h1 className="text-2xl font-bold text-center mb-6">FOOD</h1>
                <div className="bg-white w-full max-h-96 mr-7 overflow-y-scroll overflow-hidden relative">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">STT</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">Tên</th>
                                <th className="w-5/12 text-left py-3 px-4 uppercase font-semibold text-sm">Mô tả</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Ảnh</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Giá</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">Đánh giá</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 max-h-96 mr-7">
                            {food.length > 0 ?(
                                food.map((value, key) => {
                                    return (
                                        <tr key={key} style={{borderBottom:"1px solid gray"}}>
                                            <td className="text-left py-3 px-4">{key}</td>
                                            <td className="text-left py-3 px-4">{value.name}</td>
                                            <td className="text-left py-3 px-4">{value.description}</td>
                                            <td className="text-left py-3 px-4 ">
                                                <img className="w-20 rounded-md" src={value.image}></img>
                                            </td>
                                            <td className="text-left py-3 px-4">{value.price}</td>
                                            <td className="text-left py-3 px-4">{value.rate}</td>
                                            <td className="flex item-center jutify-center">
                                                <button onClick={()=>showFormAdd(value.id, "foods")} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded-md mr-1">Sửa</button>
                                                <button onClick={()=>handleShowFormDel(value.id, 'foods')} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded-md mr-1">Xóa</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ):null}
                            
                        </tbody>
                    </table>
                </div>   
                <h1 className="text-2xl font-bold text-center my-6">DRINK</h1>
                <div className="bg-white w-full mr-7 max-h-96 overflow-y-scroll overflow-hidden relative">
                    <table className="min-w-full bg-white ">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">STT</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">Tên</th>
                                <th className="w-5/12 text-left py-3 px-4 uppercase font-semibold text-sm">Mô tả</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Ảnh</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Giá</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">Đánh giá</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {drink.length > 0 ?(
                                drink.map((value, key) => {
                                    return (
                                        <tr key={key} style={{borderBottom:"1px solid gray"}}>
                                            <td className="text-left py-3 px-4">{key}</td>
                                            <td className="text-left py-3 px-4">{value.name}</td>
                                            <td className="text-left py-3 px-4">{value.description}</td>
                                            <td className="text-left py-3 px-4 ">
                                                <img className="w-20 rounded-md" src={value.image}></img>
                                            </td>
                                            <td className="text-left py-3 px-4">{value.price}</td>
                                            <td className="text-left py-3 px-4">{value.rate}</td>
                                            <td className="flex item-center jutify-center">
                                                <button onClick={()=>showFormAdd(value.id, "drinks")} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded-md mr-1">Sửa</button>
                                                <button onClick={()=>handleShowFormDel(value.id, 'drinks')} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded-md mr-1">Xóa</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ):null}
                            
                        </tbody>
                    </table>
                </div>            
            </div>
            {isFormAdd ? (
                    <form className="absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4  bg-blue-100 shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-2/4 z-10">
                        <h1 className="text-center text-2xl font-bold mb-6">{titleForm}</h1>
                        <div className ="flex">
                            <div className="w-1/2 mr-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Tên
                                    </label>
                                    <input onChange={getName} defaultValue={name} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Mô tả
                                    </label>
                                    <input onChange={getDescription} defaultValue={description} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Ảnh
                                    </label>
                                    <input onChange={getImage} defaultValue={image} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                                </div>
                            </div>
                            <div className="w-1/2">                              
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Giá
                                    </label>
                                    <input onChange={getPrice} defaultValue={price} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Đánh giá
                                    </label>
                                    <input onChange={getRate} defaultValue={rate} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                                </div>
                                <div className="mt-10 ml-10">
                                    <div className="mt-2" onChange={getCategory}>
                                        <label className="inline-flex items-center text-xl">
                                            <input type="radio" className="form-radio" name="category" value="foods"/>
                                            <span className="ml-2 font-bold">Food</span>
                                        </label>
                                        <label className="inline-flex items-center ml-6 text-xl">
                                            <input type="radio" className="form-radio" name="category" value="drinks" />
                                            <span className="ml-2 font-bold">Drink</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                            <div className="flex justify-center">
                                <button onClick={addBtn} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                                    {btnStatusForm}
                                </button>
                                <button onClick={cancel} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                                Hủy bỏ
                                </button>
                            </div>
                    </form>
                ): null}
            {isFormDelete ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-2/4 bg-blue-100 shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-1/4 z-10">
                    <h1 className="text-center text-2xl font-bold mb-8">Bạn có chắc chắn muốn xóa không?</h1>
                    <div className="flex justify-center">
                        <button onClick={DeleteBtn} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                            Xác nhận
                        </button>
                        <button onClick={handleShowFormDel} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            ): null}
        </div>
    );
};



export default ManagerProducts;