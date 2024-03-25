import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import room from "../../../../assets/img/뉴턴220호.jpg";
import RoomDetail from "../../../../pages/RoomDetail";
import KakaoShareBtn from "./KakaoShareBtn";
const RoomDetailInfo = (props) => {
  const [isOpen, setIsOpen] = useState();
  const openModal = () => setIsOpen(!isOpen);

  const { name, reservation, time, waiting } = props;

  const [RoomDetail, setRoomDetail] = useState([
    "실험",
    "전자칠판",
    "빔 프로젝터",
  ]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          openModal();
        }}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            zIndex: "100",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgb(0, 0, 0, 0.55)",
          },
          content: {
            position: "absolute",
            top: "15%",
            left: "15%",
            right: "15%",
            bottom: "10%",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <div>
          <div>
            <img src={room} />
          </div>
          <div
            style={{
              marginTop: "10px",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            {name}
          </div>
          {RoomDetail.map((r, i) => {
            return <div style={{ marginLeft: "25%" }}>{"- " + r}</div>;
          })}
          <div style={{ display: "flex", marginTop: "40px" }}>
            <div
              style={{
                width: "50%",
                textAlign: "center",
                borderRight: "1px solid gray",
              }}
            >
              <div style={{ color: "gray" }}>예약 날짜</div>
              <div style={{ marginTop: "10px" }}>{reservation}</div>
            </div>
            <div style={{ width: "50%", textAlign: "center" }}>
              <div style={{ color: "gray" }}>예약 시간</div>
              <div style={{ marginTop: "10px" }}>{time}</div>
            </div>
          </div>
          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              paddingTop: "10px",
            }}
          >
            승인상태
          </div>
          <div
            style={{
              marginTop: "10px",
              textAlign: "center",
              color:
                waiting == "승인"
                  ? "green"
                  : waiting == "거절"
                  ? "red"
                  : "lightGray",
            }}
          >
            [ {waiting} ]
          </div>
          {/* <div
            style={{
              textAlign: "center",
              marginTop: "70px",
            }}
          >
            공유하기
          </div> */}
          {/* <button onClick={() => KakaoShareBtn(name)}>카카오톡 공유</button> */}
          <KakaoShareBtn />
        </div>
      </Modal>

      <div
        onClick={openModal}
        style={{
          textAlign: "center",
          border: "1px solid gray",
          borderRadius: "20px",
          padding: "5px",
        }}
      >
        {"상세보기 >>"}
      </div>
    </div>
  );
};

export default RoomDetailInfo;
