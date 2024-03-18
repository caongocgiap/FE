import { requestDelete } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { URL_API } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";


const deleteService = async (id) => {
    const response = await requestDelete(URL_API.delete + '/' + id);
    return response;
};

export default deleteService;