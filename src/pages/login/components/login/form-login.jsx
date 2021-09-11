import React from 'react';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStatus } from '../../../../redux/admin/action';
import { getAdmin } from '../../../../services/api';
import "./style.scss"
import { PATH_ADMIN } from '../../../../routers/router';

const FormLogin = () => {
    let history = useHistory()
    const [user, setUser] = useState()
    const [isValid, setIsValid] = useState(false)
    const [detailts, setDetails] = useState({name: "", password: ""})
    const dispatch = useDispatch()
    const submitHandle = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        getAdmin.on("value", snapshot => {
            const list = []
            snapshot.forEach(value => {
                list.push(value.val())
            })
            setUser(list)
        })
        setIsValid(false)
    }, [])

    const login = (e) => {
        e.preventDefault()
        user.forEach(value => {
            if(detailts.name == value.name && detailts.password == value.password){
                dispatch(loginStatus())
                setUser({
                    name: detailts.name,
                    password: detailts.password
                })
                localStorage.setItem("accessToken", true)
                history.replace(PATH_ADMIN)
                setIsValid(false)
            }else{
                setIsValid(true)
            }
        })
    }
    return (
        <div className="body body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
            <header className="max-w-lg mx-auto">
                <a href="#">
                <h1 className="text-4xl font-bold text-white text-center">Food & Drink</h1>
                </a>
            </header>
            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section className="text-center">
                <h3 className="font-bold text-2xl">Welcome to Admin</h3>
                <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section>
                <section className="mt-10">
                <form onSubmit={submitHandle} className="flex flex-col">
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="name">User</label>
                        <input onChange={(e) => setDetails({...detailts, name: e.target.value})} value={detailts.name} type="text" id="name" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" required/>
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                        <input onChange={(e) => setDetails({...detailts, password: e.target.value})} value={detailts.password} type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" required/>
                    </div>
                    <button onClick={login} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
                    {isValid && (<div className="text-md font-bold mt-2 text-red-500">Mật khẩu hoặc tài khoản không hợp lệ</div>)}
                </form>
                </section>
            </main>
        </div>

    );
};



export default FormLogin;