import { createContext, useContext, useEffect, useReducer } from "react";
import reducerMonHoc, { initDataMonHoc } from "../reducer/reducerMonHoc";

const MonHocContext = createContext();

export const MonHocProvider = ({ children }) => {
  const dataTrangThai = ["MO", "DANG_DANG_KY", "DONG"];
  const dataHinhThuc = ["TRADITIONAL", "ONLINE", "BLEND", "TRUC_TUYEN"];
  const [stateMonHoc, dispatchMonHoc] = useReducer(
    reducerMonHoc,
    initDataMonHoc
  );

  return (
    <MonHocContext.Provider
      value={{ stateMonHoc, dispatchMonHoc, dataTrangThai, dataHinhThuc }}
    >
      {children}
    </MonHocContext.Provider>
  );
};

export const useQuanLyMonHoc = () => useContext(MonHocContext);
