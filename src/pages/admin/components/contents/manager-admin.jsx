import React from 'react';
import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addUser, deleteUser, editUser } from '../../../../redux/admin/action';
import { getAdmin } from '../../../../services/api';



const ManagerAdmin = () => {
    const [isFormAdd, setIsFormAdd] = useState(false)
    const [isFormDelete, setisFormDelete] = useState(false)
    const [isFormEdit, setIsFormEdit] = useState(false)
    // const [loading, setLoading] = useState(false)


    const [detailts, setDetails] = useState({name: "", username:"", password: ""})
    const [nameDefault, setNameDefault] = useState("")
    const [userNameDefault, setUsernameDefault] = useState("")
    const [passwordDefault, setPasswordDefault] = useState("")
    
    const [idDelete, setIdDelete] = useState("")
    const [idEdit, setIdEdit] = useState()

    const dispatch = useDispatch()
    const [allUser, setAllUser] = useState([])

    const [msgName, setMsgName] = useState("")
    const [msgUsename, setMsgUserName] = useState("")
    const [msgPassword, setMsgPassword] = useState("")

    useEffect(() => {
        //setLoading(true)
        getAdmin.on('value', (snapshot) => {
            const list = []
            snapshot.forEach((snap) => {
                const id = snap.key
                const name = snap.val().name
                const username = snap.val().username
                const password = snap.val().password  
                list.push({
                    id: id,
                    name: name,
                    password: password,
                    username: username,    
                })
            })
            setAllUser(list)
        })
    }, [])
    const handleShowFormAdd = () => {     
        setIsFormAdd(!isFormAdd)  
        setMsgName("")
        setMsgUserName("")
        setMsgPassword("")               
    }

    const handleShowFormDel = (id) => {
        setIdDelete(id)
        setisFormDelete(!isFormDelete)
    }
    const handleShowFormEdit = (id) => {
        setIdEdit(id);
        allUser.forEach(value => {
            if(value.id === id){ 
                setNameDefault(value.name) 
                setUsernameDefault(value.username)
                setPasswordDefault(value.password)    
                detailts.name = value.name 
                detailts.username = value.username           
                detailts.password = value.password           
            }
        })
        setIsFormEdit(!isFormEdit)
    }

    const addBtn = (e) => {
        if(detailts.name == ""){
            setMsgName("This Field is require")
            e.preventDefault()
        }
        else if(detailts.username == ""){
            setMsgUserName("This Field is require")
            e.preventDefault()
        }else if (detailts.password == ""){
            setMsgPassword("This Field is require")
            e.preventDefault()
        }else{
            e.preventDefault()
            dispatch(addUser(detailts))
            setIsFormAdd(!isFormAdd)
            setDetails({...detailts, password: "", name:"", username:""})
            toast.success("Add Success", {
                position: "bottom-right",
            })
        }
    }

    const editBtn = (e) => {
        if(detailts.name == ""){
            setMsgName("This Field is require")
            e.preventDefault()
        }
        else if(detailts.username == ""){
            setMsgUserName("This Field is require")
            e.preventDefault()
        }else if (detailts.password == ""){
            setMsgPassword("This Field is require")
            e.preventDefault()
        }else{
            if(idEdit){
                dispatch(editUser(idEdit, detailts))
                e.preventDefault()
                setIsFormEdit(!isFormEdit)
                detailts.name = ""
                detailts.username = ""         
                detailts.password = ""  
                setMsgName("")
                setMsgUserName("")
                setMsgPassword("") 
            }
            toast.success("Edit Success", {
                position: "bottom-right",}
            )
        }       
    }

    const btnDelete = (e) => {
        e.preventDefault()
        dispatch(deleteUser(idDelete))
        setisFormDelete(!isFormDelete)
        toast.success("Delete Success", {
            position: "bottom-right",
        })
    } 
    const cancelEdit = (e) => {
        e.preventDefault()
        setIsFormEdit(!isFormEdit)
        setMsgName("")
        setMsgUserName("")
        setMsgPassword("")
    }

    return (
        <div className="w-full">
            <h1 className="text-center text-2xl font-bold ">ADMIN MANAGEMENT</h1>
            <button onClick={()=>handleShowFormAdd()} className="my-5 mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Add</button>
            <div className=" flex relative">      
                <div className="bg-white h-full w-full mr-7">  
                    <table className="min-w-full bg-white ">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Username</th>
                                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Password</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Action</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-700 ">
                            
                            {allUser.length > 0?(
                                allUser.map((value, key) => {
                                    return(
                                        <tr key={key}style={{borderBottom:"1px solid gray"}}>
                                            <td className="text-left px-4">{key + 1}</td>
                                            <td className="text-left px-4">{value.name}</td>
                                            <td className="text-left px-4">{value.username}</td>
                                            <td className="text-left px-4">******
                                                
                                            </td>
                                            <td className="flex item-center">
                                                <button onClick={()=>handleShowFormEdit(value.id)} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded-md mr-1">Edit</button>
                                                <button onClick={()=>handleShowFormDel(value.id)} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded-md mr-4">Delete</button>
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
                <form className="bg-blue-100 absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 bg-white shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-4/12">
                    <h1 className="text-center text-2xl font-bold mb-8">ADD NEW ACCOUNT</h1>
                    <div className="">
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Name
                        </label>
                        <input onChange={(e) => setDetails({...detailts, name: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="name" id="name" type="text"/>
                        <p className="font-bold mt-1 text-left text-red-400 text-sm italic">{msgName}</p>
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Username
                        </label>
                        <input onChange={(e) => setDetails({...detailts, username: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="username" id="username" type="text"/>
                        <p className="font-bold mt-1 text-left text-red-400 text-sm italic">{msgUsename}</p>
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Password
                        </label>
                        <input onChange={(e) => setDetails({...detailts, password: e.target.value})} type="password" className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="password" id="password"/>
                        <p className="font-bold mt-1 text-left text-red-400 text-sm italic">{msgPassword}</p>

                    </div>
                    <div className="flex justify-center">
                        <button onClick={addBtn} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                            Add
                        </button>
                        <button onClick={handleShowFormAdd} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                            Cancel
                        </button>
                    </div>                         
                </form>
            ): null}
            {isFormEdit ? (
                <form className="bg-blue-100 absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 bg-white shadow-sm rounded-2xl px-8 pt-6 pb-8  w-4/12">
                    <h1 className="text-center text-2xl font-bold mb-8">EDIT AMIN</h1>
                    <div className="">
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Name
                        </label>
                        <input onChange={(e) => setDetails({...detailts, name: e.target.value})} className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="name" id="name" type="text" defaultValue={nameDefault} />
                        <p className="font-bold mt-1 text-left text-red-400 text-sm italic">{msgName}</p>
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Username
                        </label>
                        <input onChange={(e) => setDetails({...detailts, username: e.target.value})}  className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="username" id="username" type="text" defaultValue={userNameDefault}/>
                        <p className="font-bold mt-1 text-left text-red-400 text-sm italic">{msgUsename}</p>

                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-md font-bold mb-2">
                            Password
                        </label>
                        <input onChange={(e) => setDetails({...detailts, password: e.target.value})} type="password" className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" name="password" id="password" defaultValue={passwordDefault} />
                        <p className="font-bold mt-1 text-left text-red-400 text-sm italic">{msgPassword}</p>

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
            ): null}
            {isFormDelete ? (
                <form className="bg-blue-100 absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 bg-white shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-1/4 z-10">
                    <h1 className="text-center text-2xl font-bold mb-8">Are you sure you want to delete?</h1>
                    <div className="flex justify-center">
                        <button onClick={btnDelete} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                            OK
                        </button>
                        <button onClick={handleShowFormDel} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                            Cancel
                        </button>
                    </div>
                </form>
            ): null}
            <ToastContainer/>
        </div>
    );
};


export default ManagerAdmin;