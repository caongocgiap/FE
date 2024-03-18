import { Modal } from "antd";
import { useQuanLyChuyenNganhTheoCoSo } from "../QuanLyChuyenNganhTheoCoSo";
import { showModalEdit } from "../reducer/action";

import UpdateChuyenNganhTheoCoSo from "./Update";


const ModalEditChuyenNganhTheoCoSo = () => {
    const { state, dispatch } = useQuanLyChuyenNganhTheoCoSo();

    return (
        <Modal
            open={state.isShowEdit}
            title="Cập nhật chuyên ngành theo cơ sở"
            onCancel={() => {
                dispatch(showModalEdit(false));
            }}
            footer={null}
        >
            <UpdateChuyenNganhTheoCoSo />
        </Modal>
    );
};

export default ModalEditChuyenNganhTheoCoSo;