import { requestGet } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";
import { URL_API } from "../../../apis/QuanLyChuyenNganhTheoCoSoAPI";

const paramsSerializer = (params) => {
    return Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&');
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');
};

const listService = async (filter = {}, page) => {
    filter = Object.fromEntries(
      Object.entries(filter).filter(([key, value]) => value !== '' && value !== null)
    );
    const response = await requestGet(URL_API.list, {
        params: {
            page: page,
            ...filter
        },
        paramsSerializer
    });
    return response;
};

export default listService;