import { requestPut } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { URL_API } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";


const updateService = async (id, name) => {
    const response = await requestPut(URL_API.update + '/' + id, {
        ten: name
    });
    return response;
};

export default updateService;