import { requestPost } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { URL_API } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";


const addService = async (name) => {
    const response = await requestPost(URL_API.add, {
        ten: name
    });
    return response;
};

export default addService;