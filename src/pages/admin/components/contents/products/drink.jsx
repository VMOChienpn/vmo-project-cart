import React from 'react';
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getDrink } from '../../../../../services/api';
import {addProductAdmin, deleteProductAdmin, editProductAdmin } from '../../../../../redux/admin/action/index';
import Pagination from './pagination';

const Drink = () => {
    const [isFormAdd, setIsFormAdd] = useState(false)
    const [isFormDelete, setisFormDelete] = useState(false)
    const [isFormEdit, setisFormEdit] = useState(false)
    const [idDelete, setIdDelete] = useState()
    const [idEdit, setIdEdit] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [rate, setRate] = useState()
    const [drink, setDrink] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const [detailtFormAdd, setdetailFormAdd] = useState({name: "", 
        description: "", 
        price:"", 
        rate:"", 
        image:"", 
        notes:"", 
        quantity:""
    })
    const [detailtFormEdit, setDetailFormEdit] = useState({name: "", 
        description: "", 
        price:"", 
        rate:"", 
        image:"", 
        notes:"", 
        quantity:"" 
    })

    
    const dispatch = useDispatch()
    useEffect(() => {
        getDrink.on('value', (snapshot) => {
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
            setDrink(list)
            
        })
    }, [])

    const indexOfLastPost = postsPerPage * currentPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentDrink = drink.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const showFormAdd = () => {
        setIsFormAdd(!isFormAdd)
    }
    const showFormDelete = (id) => {
        setIdDelete(id)
        setisFormDelete(!isFormDelete)
    }
    const showFormEdit = (id) => {
        setIdEdit(id)
        drink.forEach(value => {
            if(value.id === id){
                setName(value.name) 
                setDescription(value.description)
                setPrice(value.price)
                setRate(value.rate)
                setImage(value.image)
            }
        })
        setisFormEdit(!isFormDelete)
    }
    const cancelEdit = (e) => {
        e.preventDefault()
        setisFormEdit(!isFormEdit)
    }
    const submitFormAdd = (e) => {
        e.preventDefault()
    }
    const submitFormDelete = (e) => {
        e.preventDefault()
    }    
    const addBtn = () => {
        dispatch(addProductAdmin("drinks", detailtFormAdd))
        toast.success("Add Success", {
            position: "bottom-right",
        })
    }
    const editBtn = () => {
        dispatch(editProductAdmin("drinks", idEdit, detailtFormEdit))
        toast.success("Edit Success", {
            position: "bottom-right",
        })
    }
    const DeleteBtn = (e) => {
        e.preventDefault()
        dispatch(deleteProductAdmin("drinks", idDelete))
        setisFormDelete(!isFormDelete)
        toast.success("Delete Success", {
            position: "bottom-right",
        })
    }
    const cancel = (e) => {
        e.preventDefault()
        setIsFormAdd(!isFormAdd)
    }

    return (
        <div className="h-auto">
            <h1 className="text-center text-2xl font-bold ">PRODUCT MANAGEMENT</h1> 
            <h1 className="text-2xl font-bold text-center mt-10 mb-1">DRINK</h1>
            <button onClick={()=>showFormAdd()} className=" my-4 mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Add</button>   
            <div className="w-full">
                <div className="bg-white w-full mr-7 relative" style={{minHeight: "580px"}}>
                    <table className="min-w-full bg-white ">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th className="w-6/12 text-left py-3 px-4 uppercase font-semibold text-sm">Desciption</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Image</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Rate</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {currentDrink.length > 0 ?(
                                currentDrink.map((value, key) => {
                                    return (
                                        <tr key={key} style={{borderBottom:"1px solid gray"}}>
                                            <td className="text-left py-3 px-4">{key + 1}</td>
                                            <td className="text-left py-3 px-4">{value.name}</td>
                                            <td className="text-left py-3 px-4">{value.description}</td>
                                            <td className="text-left py-3 px-4 ">
                                                <img className=" w-14 rounded-md" src={value.image}></img>
                                            </td>
                                            <td className="text-left py-3 px-4">{value.price}</td>
                                            <td className="text-left py-3 px-4">{value.rate}</td>
                                            <td className="flex item-center jutify-center">
                                                <button onClick={()=>showFormEdit(value.id)} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded-md mr-1">Edit</button>
                                                <button onClick={()=>showFormDelete(value.id)} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded-md mr-1">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ):null}
                            
                        </tbody>
                    </table>
                </div>            
            </div>
            {isFormAdd && (
                <form type="onSubmit" onClick={submitFormAdd} className="absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4  bg-blue-100 shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-2/4 z-10">
                    <h1 className="text-center text-2xl font-bold mb-6">ADD NEW PRODUCT</h1>
                    <div className ="flex">
                        <div className="w-1/2 mr-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input onChange={(e) => setdetailFormAdd({...detailtFormAdd, name: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="" type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    description
                                </label>
                                <input onChange={(e) => setdetailFormAdd({...detailtFormAdd, description: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Image
                                </label>
                                <input onChange={(e) => setdetailFormAdd({...detailtFormAdd, image: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                            </div>
                        </div>
                        <div className="w-1/2">                              
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Price
                                </label>
                                <input onChange={(e) => setdetailFormAdd({...detailtFormAdd, price: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Rate
                                </label>
                                <input onChange={(e) => setdetailFormAdd({...detailtFormAdd, rate: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                            </div>
                        </div>
                    </div>
                        <div className="flex justify-center">
                            <button type="submit" onClick={addBtn} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                                Add
                            </button>
                            <button onClick={cancel} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                            Cancel
                            </button>
                        </div>
                </form>
            )}
            {isFormEdit && (
                <form type="submit" onClick={submitFormDelete} className="absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4  bg-blue-100 shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-2/4 z-10">
                    <h1 className="text-center text-2xl font-bold mb-6">EDIT PRODUCT</h1>
                    <div className ="flex">
                    <div className="w-1/2 mr-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input onChange={(e) => setDetailFormEdit({...detailtFormEdit, name: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text" defaultValue={name}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Description
                                </label>
                                <input onChange={(e) => setDetailFormEdit({...detailtFormEdit, description: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text" defaultValue={description}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Image
                                </label>
                                <input onChange={(e) => setDetailFormEdit({...detailtFormEdit, image: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text" defaultValue={image}/>
                            </div>
                        </div>
                        <div className="w-1/2">                              
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Price
                                </label>
                                <input onChange={(e) => setDetailFormEdit({...detailtFormEdit, price: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text" defaultValue={price}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Rate
                                </label>
                                <input onChange={(e) => setDetailFormEdit({...detailtFormEdit, rate: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text" defaultValue={rate}/>
                            </div>
                        </div>
                    </div>
                        <div className="flex justify-center">
                            <button onClick={editBtn} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                                Edit
                            </button>
                            <button onClick={cancelEdit} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                            Cancel
                            </button>
                        </div>
                </form>
            )}
            {isFormDelete && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-2/4 bg-blue-100 shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-1/4 z-10">
                    <h1 className="text-center text-2xl font-bold mb-8">Are you sure you want to delete?</h1>
                    <div className="flex justify-center">
                        <button onClick={DeleteBtn} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                            Delete
                        </button>
                        <button onClick={showFormDelete} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer/>
            <Pagination totalDrink={drink.length} postsPerPage={postsPerPage} paginate={paginate}/>
        </div>
    );
};

export default Drink;