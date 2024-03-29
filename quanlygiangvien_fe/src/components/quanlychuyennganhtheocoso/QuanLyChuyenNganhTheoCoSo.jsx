import { createContext, useContext, useEffect, useReducer } from 'react';
import { Typography } from "antd";
import { toast } from 'react-toastify';

import ListChuyenNganhTheoCoSo from './components/List';
import FilterChuyenNganhTheoCoSo from './components/Filter';
import ModalAddChuyenNganhTheoCoSo from './components/ModalAdd';
import ModalEditChuyenNganhTheoCoSo from './components/ModalEdit';

import { 
    setData, 
    setDataBoMon, 
    setDataBoMonTheoCoSo, 
    setDataChuyenNganh,
    setDataCoSo, 
    setDataNhanVien, 
    setLoading, 
    setPageSize, 
    setTotalElement 
} from './reducer/action';
import reducer, { initData } from './reducer/reducer';
import listService from './services/ListService';
import initDataService, { TYPE_DATA } from './services/InitDataService';

const QuanLyChuyenNganhTheoCoSoContext = createContext();

const QuanLyChuyenNganhTheoCoSo = () => {
    const [state, dispatch] = useReducer(reducer, initData);

    useEffect(() => {
        initDataService(TYPE_DATA.BM_AND_CS)
            .then(response => {
                if(response?.boMon) {
                    dispatch(setDataBoMon(response.boMon));
                }

                if(response?.coSo) {
                    dispatch(setDataCoSo(response.coSo));
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể lấy dữ liệu bộ môn và cơ sở");
            });

        initDataService(TYPE_DATA.CN_AND_BMTCS)
            .then(response => {
                if(response?.boMonTheoCoSo) {
                    dispatch(setDataBoMonTheoCoSo(response.boMonTheoCoSo));
                }

                if(response?.chuyenNganh) {
                    dispatch(setDataChuyenNganh(response.chuyenNganh));
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể lấy dữ liệu bộ môn theo cơ sở và chuyên ngành");
            });

        initDataService(TYPE_DATA.NHANVIEN)
            .then(response => {
                dispatch(setDataNhanVien(response));
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể lấy dữ liệu nhân viên");
            });
    }, []);

    useEffect(() => {
        dispatch(setLoading(true));
        listService(state.filter, state.page)
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
    }, [state.filter, state.page, state.isReload]);


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