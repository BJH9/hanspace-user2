import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import room from "../../../../assets/img/뉴턴220호.jpg";
import kakao from "../../../../assets/img/share.jpg";
import RoomDetailInfo from "./RoomDetailInfo";
import Button from "@mui/material/Button";
import KakaoShareBtn from "./KakaoShareBtn";

const Product = (props) => {
  // const navigate = useNavigate();

  // const onClick = () => {
  //   navigate(`/dashboard/e-commerce/product`);
  // };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const now = new Date();
  const todayMonth = now.getMonth() + 1;
  const todayDate = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const { name, application, reservation, time, waiting, application2 } = props;

  const date1 = new Date(application2);

  return (
    <div
      style={{
        padding: "7px",
        borderRadius: "20px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color:
              waiting == "승인"
                ? "green"
                : waiting == "거절"
                ? "red"
                : "lightGray",
            // marginTop: "10px",
            fontSize: "15px",
            paddingTop: "7px",
            paddingBottom: "7px",
            marginBottom: "5px",
          }}
        >
          [ {waiting} ]
        </div>
        {/* <div
          style={{
            fontSize: "12px",
            marginTop: "7px",
            textAlign: "right",
          }}
        >
          {application + " 신청"}
        </div> */}
      </div>
      <div>
        <img src={room} />
      </div>
      <div
        style={{ marginTop: "10px", fontWeight: "bold", textAlign: "center" }}
      >
        {name}
      </div>
      {/* <div>{application2}</div> */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            marginTop: "7px",
            width: "50%",
            fontSize: "12px",
            textAlign: "center",
            borderRight: "3px solid white",
          }}
        >
          <div style={{ color: "gray" }}>{"예약 날짜"}</div>
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {reservation}
          </div>
        </div>
        <div
          style={{
            marginTop: "7px",
            width: "50%",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          <div style={{ color: "gray" }}>{"예약 시간"}</div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>{time}</div>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "10px", marginBottom: "10px" }}>
        {now < date1 && waiting != "거절" ? (
          <div
            style={{
              width: "48%",
              textAlign: "center",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            <Button style={{ backgroundColor: "#F08080" }} variant="contained">
              취소하기
            </Button>
            {/* {"취소하기"} */}
          </div>
        ) : (
          <div
            style={{
              width: "48%",
              textAlign: "center",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            {/* {"다시 대여"} */}
            <Button variant="contained">다시 대여</Button>
          </div>
        )}
        <div style={{ width: "4%" }}></div>
        <div style={{ width: "50%" }}>
          {/*<RoomDetailInfo*/}
          {/*  name={name}*/}
          {/*  reservation={reservation}*/}
          {/*  time={time}*/}
          {/*  waiting={waiting}*/}
          {/*/>*/}
          <div
            style={{
              textAlign: "center",
              borderRadius: "20px",
              padding: "5px",
            }}
          >
            <KakaoShareBtn />
            {/* {"카카오톡 공유"} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
