import { requestGet } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { URL_API } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";

export const TYPE_DATA = {
    BM_AND_CS: 'init_data_bm_and_cs',
    CN_AND_BMTCS: 'init_data_cn_and_bmtcs',
    NHANVIEN: 'init_data_nhanvien'
};

const initDataService = async (type_data) => {
    const response = await requestGet(URL_API[type_data]);
    return response;
};

export default initDataService;