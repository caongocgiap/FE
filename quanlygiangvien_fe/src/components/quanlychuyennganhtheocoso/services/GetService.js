import { requestGet } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { URL_API } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";


const getService = async (id) => {
    const response = await requestGet(URL_API.get + '/' + id);
    return response;
};

export default getService;