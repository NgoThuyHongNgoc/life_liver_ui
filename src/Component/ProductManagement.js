import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductManagement = () => {

    const [la, setLa] = useState([])
    const [page, setPage] = useState({
        current: 0,
        start: 0,
        end: 5,
    })


    const deletLaThuoc = (maLa) => {
        axios.delete(`http://127.0.0.1:8000/lathuoc/${maLa}/`)
            .then((res) => {
                toast.success('Xoá thành công')
                setLa(la.filter((l) => l.maLa !== maLa))
            })
            .catch((res) => {
                toast.error('Xoá thất bại')
            })
    }

    const onChangePage = (num) => {
        const i = page.current + num
        setPage(
            {
                ...page,
                current: i,
                start: i * 5,
                end: i * 5 + 5,
            })
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/lathuoc/`)
            .then((res) => setLa(res.data))
        setPage({ ...page, count: Math.ceil(la.length / 5) })
    }, [])

    return (
        <>
            <p className="bread">
                <span>Quản lý sản phẩm</span>
            </p>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Tên lá</th>
                            <th scope="col">Giá bán</th>
                            <th scope="col">Số lượng còn (1 gói - 100 gram)
                                <Link to='/Manager/Product/Add'><button className="btn btn-feature add">
                                    <i class="bi bi-plus-lg"></i>
                                </button></Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {la.length === 0 ?
                            <tr>
                                <td colSpan={3}>Chưa có sản phẩm</td>
                            </tr> :
                            la.slice(page.start, page.end).map((l) =>
                                <tr key={l.maLa}>
                                    <td>{l.tenLa}</td>
                                    <td>{l.giaBan}</td>
                                    <td>{l.soLuongCon}
                                        <div style={{ display: 'inline' }}>
                                        </div>
                                        <Link to={`/Manager/Product/Update/${l.maLa}`}>
                                            <button className="btn btn-feature edit" >
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                        </Link>
                                        <button onClick={() => deletLaThuoc(l.maLa)} className="btn btn-feature delete">
                                            <i class="bi bi-x-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'end' }}>
                                <button className="btn" onClick={() => onChangePage(-1)}><i class="bi bi-caret-left"></i></button>
                                {page.current + 1} - {Math.ceil(la.length / 5)}
                                <button className="btn" onClick={() => onChangePage(1)}><i class="bi bi-caret-right"></i></button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </>
    )

}

export default ProductManagement;