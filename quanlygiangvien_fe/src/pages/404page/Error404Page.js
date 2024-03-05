import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const Error404Page = () => {
    return (
        <Container
            className={"d-flex justify-content-center align-items-center p-5"}
        >
            <div>
                <h2>Có vẻ như có điều gì đó không đúng...</h2>
                <h5>
                    Trang bạn đang cố mở không tồn tại.
                </h5>
                <Link to={"/bandaotao"} className={"btn btn-outline-info"}>
                    Quay về trang chủ
                </Link>
            </div>
        </Container>
    );
}

export default Error404Page