import {useEffect, useState} from "react";
import {getAllHocKy_API} from "../../../apis/QuanLyNhanVienAPI";
import {toast} from "react-toastify";


export const useHocKy = () => {

    const [listHocKy,setListHocKy] = useState([]);

    const getAllHocKy = async () => {
        try {
            const response = await getAllHocKy_API();
            setListHocKy(response.data);
        }catch (e){
            toast.error("Không lấy được danh sách học kỳ!")
        }
    }

    useEffect(() => {
        getAllHocKy();
    }, []);

    return {listHocKy};
}
