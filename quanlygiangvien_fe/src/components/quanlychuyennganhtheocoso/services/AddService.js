import { requestPost } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { URL_API } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";


const addService = async (idBoMonTheoCoSo, idChuyenNganh, idTruongMon) => {
    const response = await requestPost(URL_API.add, {
        idBoMonTheoCoSo,
        idChuyenNganh,
        idTruongMon
    });
    return response;
};

export default addService;