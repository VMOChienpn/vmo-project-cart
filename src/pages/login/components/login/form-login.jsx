import React from 'react';
import "./style.scss"
const FormLogin = () => {
    return (
        <div className="body body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
            <header className="max-w-lg mx-auto">
                <a href="#">
                <h1 className="text-4xl font-bold text-white text-center">Food & Drink</h1>
                </a>
            </header>
            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section className="text-center">
                <h3 className="font-bold text-2xl">Welcome to Startup</h3>
                <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section>
                <section className="mt-10">
                <form className="flex flex-col" method="POST" action="#">
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="email">User</label>
                        <input type="text" id="email" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                    </div>
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="password">Password</label>
                        <input type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
                </form>
                </section>
            </main>
            <footer className="max-w-lg mx-auto flex justify-center text-white">
                <a href="#" className="hover:underline">Contact</a>
                <span className="mx-3">•</span>
                <a href="#" className="hover:underline">Privacy</a>
            </footer>
        </div>

    );
};



export default FormLogin;