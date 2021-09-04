import React from 'react';
import { useState } from 'react';

const ManagerOrders = () => {
    const [isFormDelete, setIsFormDelete] = useState(false)

    const handleClickDelete = () => {
        setIsFormDelete(!isFormDelete)
    }
    return (
        <div className="relative">
            <h1 className="text-center text-2xl font-bold ">Quản lý Đặt Hàng</h1>
            <div className="w-full my-10 flex">               
                <div className="bg-white h-full w-full mr-7">
                    <table className="min-w-full bg-white ">
                        <thead className="bg-gray-500 text-white">
                            <tr>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Id</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Tên</th>
                                <th className="w-3/12 text-left py-3 px-4 uppercase font-semibold text-sm">Mô tả</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Ảnh</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Giá</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Đánh giá</th>
                                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 ">   
                            <tr style={{borderBottom:"1px solid gray"}}>
                                <td className="text-left py-3 px-4">1</td>
                                <td className="text-left py-3 px-4">Pizza</td>
                                <td className="text-left py-3 px-4">Ngon ngon</td>
                                <td className="text-left py-3 px-4">jonsmith@mail.com</td>
                                <td className="text-left py-3 px-4">100000</td>
                                <td className="text-left py-3 px-4">4</td>
                                <td>
                                <button onClick={handleClickDelete} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-7">Xóa</button>
                                </td>
                            </tr>                
                        </tbody>
                    </table>
                </div>
            </div>
            <h2 className="text-right mr-8 text-2xl">Tổng giá: 300000000 VND</h2>
            {isFormDelete ? (
                <form className="absolute top-1/2 left-1/2 transform -translate-x-2/4 bg-white shadow-sm rounded-2xl px-8 pt-6 pb-8 mb-4 w-1/4 z-10">
                    <h1 className="text-center text-2xl font-bold mb-8">Bạn có chắc chắn muốn xóa không?</h1>
                    <div className="flex justify-center">
                        <button onClick={handleClickDelete} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6 mr-4">
                            Xác nhận
                        </button>
                        <button onClick={handleClickDelete} className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 rounded-full mt-6">
                            Hủy bỏ
                        </button>
                    </div>
                </form>
            ): null}
        </div>
    );
};

export default ManagerOrders;