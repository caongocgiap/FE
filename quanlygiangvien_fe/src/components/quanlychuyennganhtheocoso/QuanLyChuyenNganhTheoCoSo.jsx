import { createContext, useContext, useEffect, useReducer } from 'react';
import { Typography } from "antd";
import { toast } from 'react-toastify';

import ListChuyenNganhTheoCoSo from './components/List';
import FilterChuyenNganhTheoCoSo from './components/Filter';
import ModalAddChuyenNganhTheoCoSo from './components/ModalAdd';
import ModalEditChuyenNganhTheoCoSo from './components/ModalEdit';

import { 
    setData, 
    setLoading, 
    setPageSize, 
    setTotalElement 
} from './reducer/action';
import reducer, { initData } from './reducer/reducer';
import listService from './services/ListService';

const QuanLyChuyenNganhTheoCoSoContext = createContext();

const QuanLyChuyenNganhTheoCoSo = () => {
    const [state, dispatch] = useReducer(reducer, initData);

    useEffect(() => {
        dispatch(setLoading(true));
        listService(state.idCoSo, state.page)
            .then(response => {
                dispatch(setData(response.content));
                dispatch(setPageSize(response.pageable.pageSize));
                dispatch(setTotalElement(response.totalElements));
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể GET danh sách chuyên ngành theo cơ sở");
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [state.idCoSo, state.page, state.isReload]);


    return(
        <QuanLyChuyenNganhTheoCoSoContext.Provider value={{ state, dispatch }}>
            <Typography.Title level={3}>Quản lý chuyên ngành theo cơ sở</Typography.Title>
            <FilterChuyenNganhTheoCoSo />
            <ListChuyenNganhTheoCoSo />

            <ModalAddChuyenNganhTheoCoSo />
            <ModalEditChuyenNganhTheoCoSo />

        </QuanLyChuyenNganhTheoCoSoContext.Provider>
    );
};

export const useQuanLyChuyenNganhTheoCoSo = () => useContext(QuanLyChuyenNganhTheoCoSoContext);
export default QuanLyChuyenNganhTheoCoSo;