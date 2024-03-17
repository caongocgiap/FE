import { requestPut } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { URL_API } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";


const updateService = async (id, idBoMonTheoCoSo, idChuyenNganh, idTruongMon) => {
    const response = await requestPut(URL_API.update + '/' + id, {
        idBoMonTheoCoSo,
        idChuyenNganh,
        idTruongMon
    });
    return response;
};

export default updateService;