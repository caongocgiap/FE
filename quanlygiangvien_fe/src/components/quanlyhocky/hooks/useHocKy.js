import { getHocKyApi, getHocKyByIdApi, postHocKyApi } from '../../../apis/QuanLyHocKyAPI'

import { useState, useEffect } from "react";

export const useHocKy = () => {

    const [listHocKy, setListHocKy] = useState([]);

    const [totalPage, setTotalPage] = useState(1);

    const [pageSize, setPageSize] = useState(0);

    const [pageNum, setPageNum] = useState(0);

    const [tableLoading, setTableLoading] = useState(false);

    const [hocKy, setHocKy] = useState([])

    const getPaggingHocKy = async (page) => {
        setTableLoading(true);
        setPageNum(page);
        setTimeout(async () => {
            try {
                const response = await getHocKyApi(page);
                setListHocKy(response.data.content);
                setTotalPage(response.data.totalElements);
                setPageSize(response.data.size);
            } catch (e) {
            }
        }, [])
        setTableLoading(false);
    }

    useEffect(() => {
        getPaggingHocKy(pageNum);
    }, [tableLoading])

    const getHocKyById = async (idHocKy) => {
        try {
            const response = await getHocKyByIdApi(idHocKy);
            setHocKy(response.data);
        } catch (e) {
            console.log("Lỗi khi lấy dữ liệu từ API: ", e);
        }
    }

    const postHocKy = async (data) => {
        try {
            const response = await postHocKyApi(data);
            return response.data
        } catch (e) {
            console.log('Thêm thất bại', e);
        }
    }

    return {
        pageNum, listHocKy, setListHocKy, totalPage, pageSize, tableLoading, hocKy, getPaggingHocKy, getHocKyById, postHocKy
    }
}