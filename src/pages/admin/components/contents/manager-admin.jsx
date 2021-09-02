import React from 'react';

const ManagerAdmin = () => {
    return (
        <div>
            <h1 className="text-center text-2xl font-bold ">Quản lý Tài Khoản</h1>
            <div className="w-full mt-10 flex">               
                <div className="bg-white h-full w-3/4 mr-7">
                    <table className="min-w-full bg-white ">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Id</th>
                                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Tên</th>
                                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Tài khoản</th>
                                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Mật khẩu</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm"></th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-700 ">
                            <tr style={{borderBottom:"1px solid gray"}}>
                                <td className="text-left py-3 px-4">1</td>
                                <td className="text-left py-3 px-4">Chiến</td>
                                <td className="text-left py-3 px-4">admin</td>
                                <td className="text-left py-3 px-4">admin</td>
                                <td>
                                <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-8">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <form className="bg-white shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-1/4">
                    <h1 className="text-center text-2xl font-bold mb-8">Thêm mới tài khoản</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            ID
                        </label>
                        <input className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tên
                        </label>
                        <input className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tài khoản
                        </label>
                        <input className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Mật khẩu
                        </label>
                        <input className="shadow border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline" id="" type="text"/>
                    </div>
                    <div className="flex justify-center">
                        <button className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6">
                            Thêm mới
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};


export default ManagerAdmin;