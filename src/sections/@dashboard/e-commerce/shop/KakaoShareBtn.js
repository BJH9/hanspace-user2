import react, { useEffect } from "react";
import room from "../../../../assets/img/뉴턴220호.jpg";
import kakao from "../../../../assets/img/kakao.png";
import Button from "@mui/material/Button";

const KakaoShareBtn = (title) => {
  // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
  // const r = { room };
  // if (window.Kakao) {
  //   const kakao = window.Kakao;
  //   if (!kakao.isInitialized()) {
  //     kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
  //   }
  //   kakao.Link.sendDefault({
  //     objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
  //     content: {
  //       title: title, // 인자값으로 받은 title
  //       description: title, // 인자값으로 받은 title
  //       imageUrl: `${room}`,
  //       link: {
  //         mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
  //         webUrl: route,
  //       },
  //     },
  //     buttons: [
  //       {
  //         title: "title",
  //         link: {
  //           mobileWebUrl: route,
  //           webUrl: route,
  //         },
  //       },
  //     ],
  //   });
  // }
  const handleShare = () => {
    const kakao = window.Kakao;
    kakao.init("74d35d13db199391c076b1b00db84ce4");

    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "Check out this website!",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imageUrl: "http://localhost:3000/dashboard/e-commerce/product",
        link: {
          mobileWebUrl: "http://localhost:3000/dashboard/e-commerce/product",
          webUrl: "http://localhost:3000/dashboard/e-commerce/product",
        },
      },
      buttons: [
        {
          title: "Visit website",
          link: {
            mobileWebUrl: "http://localhost:3000/dashboard/e-commerce/product",
            webUrl: "http://localhost:3000/dashboard/e-commerce/product",
          },
        },
      ],
    });
  };

  return (
    // <div style={{ marginTop: "30px" }}>
    //   <img
    //     onClick={handleShare}
    //     src={kakao}
    //     style={{ width: "50px", height: "50px" }}
    //   />
    //   공유하기
    // </div>
    <div onClick={handleShare}>
      <Button style={{ backgroundColor: "#FEE500" }} variant="contained">
        카카오톡 공유
      </Button>
    </div>
  );
};

export default KakaoShareBtn;
