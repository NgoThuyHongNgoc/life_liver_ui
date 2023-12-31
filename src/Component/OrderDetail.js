import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export const OrderDetail = () => {

    const params = useParams()
    const [order, setOrder] = useState([])
    const [customer, setCustomer] = useState([])
    const [orderDetail, setOrderDetail] = useState([])
    const options = ["Chưa giao", "Đã giao"]
    const option = useRef()

    useEffect(() => {
        const getOrderDetail = () => {
            axios.get(`http://127.0.0.1:8000/ctdonhang/get/${params.maDonHang}/`)
                .then((res) => {
                    setOrder(res.data.DonHang)
                    setOrderDetail(res.data.CTDonHang)
                    setCustomer(res.data.KhachHang)
                })
        }
        getOrderDetail()
        window.scrollTo(0, 0);
    }, [])

    const updateOrder = () => {
        const data = {
            trangThai: option.current.value
        }
        axios.patch(`http://127.0.0.1:8000/donhang/${params.maDonHang}/`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    return (
        <>
            <p className="bread">
                <span>Chi tiết đơn hàng: {params.maDonHang}</span>
            </p>
            <div className='container'>

                <div className='row'>
                    <div className='col-2'>
                        <p>Ngày lập:</p>
                    </div>
                    <div className='col-10'>
                        <p>{moment(order.ngayLap).format('DD-MM-YYYY')}</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Tên khách hàng:</p>
                    </div>
                    <div className='col-10'>
                        <p>{customer.tenKhachHang}</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Số điện thoại:</p>
                    </div>
                    <div className='col-10'>
                        <p>{customer.soDienThoai}</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Địa chỉ:</p>
                    </div>
                    <div className='col-10'>
                        <p>{customer.diaChi}</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Tổng tiền:</p>
                    </div>
                    <div className='col-10'>
                        <p>{order.tongTien}đ</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Trạng thái:</p>
                    </div>
                    <div className='col-10'>
                        {
                            order.trangThai !== undefined ?
                                <select defaultValue={order.trangThai} ref={option}>
                                    {
                                        options.map((o, i) =>
                                            <option key={i} value={i}>{o}</option>
                                        )
                                    }
                                </select>
                                : <></>
                        }
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Sản phẩm:</p>
                    </div>
                    <div className='col-10'>
                        <div className='container product-order'>
                            <table>
                                <tr>
                                    <th>Mã lá</th><th>Số lượng</th>
                                </tr>
                                {
                                    orderDetail.map((o) =>
                                        <tr>
                                            <td>{o.maLa}</td><td>{o.soLuong}</td>
                                        </tr>)
                                }
                            </table>
                        </div>
                    </div>
                </div>

                <div className='row' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={'/Manager/Order'}>
                        <button className='btn-submit btn' onClick={() => updateOrder()} >Thoát</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
