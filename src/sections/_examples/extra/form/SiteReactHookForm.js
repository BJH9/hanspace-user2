import * as Yup from "yup";
import { useRef, useEffect, useState } from "react";

// @mui
import {
  Stack,
  Grid,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
  Chip,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  Tooltip,
  Select,
  MenuItem,
  InputLabel,
  FormLabel,
} from "@mui/material";
import { LoadingButton, Masonry } from "@mui/lab";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { DatePicker } from "@mui/x-date-pickers";
// utils
import { fTimestamp } from "../../../../utils/formatTime";
import { fData } from "../../../../utils/formatNumber";
// components
import Iconify from "../../../../components/iconify";
import FormProvider, {
  RHFEditor,
  RHFCheckbox,
  RHFTextField,
} from "../../../../components/hook-form";
import OurTextField from "../../../../pages/components/mui/OurTextField";
import { Box } from "@mui/material";
import { Block } from "../../Block";
import { saveSiteInfo } from "src/api/site";
import BtnUpload from "src/components/FileUpload/BtnUpload";
import UpdateUpload from "src/components/FileUpload/UpdateUpload";

// ----------------------------------------------------------------------

export default function SiteReactHookForm({
  imageUrl,
  setImageUrl,
  file,
  setFile,
  t,
  hashtags,
  setHashTags,
  editSiteInfo,
  site,
  user,
  siteUser,
  setSiteUser,
  tempSiteInfo,
  setTempSiteInfo,
  closeMethod,
  setIm,
}) {
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [onTag, setOnTag] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [update, setUpdate] = useState(false);
  const [tu, setTu] = useState("30");
  const [photoURL, setPhotoURL] = useState();
  const [unit, setUnit] = useState("30");
  // const [imageUrl, setImageUrl] = useState(null);
  // const [file, setFile] = useState(null);
  const scrollRef = useRef(null);

  const tooltipText = (
    <>
      "제약없음"은 로그인한 모든 사용자들이 서비스를 이용할 수 있습니다.
      <br />
      <br />
      "제약있음"은 관리자의 별도 허가가 있어야 사용자들이 서비스를 이용할 수
      있습니다.
      <br />
      <br />
      "일부제약"은 관리자와 같은 도메인 사용자들은 별도 허가 없이도 이용할 수
      있습니다.
    </>
  );

  useEffect(() => {
    if (site) {
      // console.log(tempSiteInfo);
      if (tempSiteInfo) {
        // const arr = tempSiteInfo.tagList.map((tag) => tag.name);

        console.log("inner tempSiteInfo");
        console.log(tempSiteInfo);
        setTagList(tempSiteInfo.tagList);
        // console.log(tempSiteInfo.tagList);
        // setTagList(tempSiteInfo.tagList);
      }
    }
  }, []);

  // useEffect(() => {
  //   console.log("TagList");
  //   console.log(tagList);
  // }, [tagList]);

  const handleUnitChange = (event) => {
    setTempSiteInfo({
      ...tempSiteInfo,
      timeUnit: event.target.value,
    });
  };

  const handleClickAttachPhoto = () => {
    fileInputRef.current?.click();
    // console.log(fileInputRef.current?.click();)
  };

  const clickTags = () => {
    setOnTag(!onTag);
  };

  const handleKeyDown = (e) => {
    if (e.code !== "Enter" && e.code !== "NumpadEnter") return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.target.value)) {
      setInputValue("");
    }
  };
  const accessLevel = [
    {
      name: "제약 없음",
      value: "2",
    },
    {
      name: "제약 있음",
      value: "1",
    },
    {
      name: "일부 제약",
      value: "3",
    },
  ];

  const addHashTag = (e) => {
    const allowedCommand = ["Enter", "NumpadEnter"];
    if (!allowedCommand.includes(e.code)) return;

    if (e.target.value.trim() == "") {
      return setInputValue("");
    }

    let newHashTag = e.target.value.trim();
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, "");
    }
    if (newHashTag.includes(",")) {
      newHashTag = newHashTag.split(",").join("");
    }

    if (newHashTag === "") return;

    // setHashTags((prevHashTags) => {
    //   return [...new Set([...prevHashTags, newHashTag])];
    // });
    setTagList((prevHashTags) => {
      const newHashTags = new Set([...prevHashTags, newHashTag]);

      setTempSiteInfo((prevTempSavedInfo) => ({
        ...prevTempSavedInfo,
        tagList: newHashTags,
      }));

      return [...newHashTags];
    });

    setInputValue("");
    if (scrollRef.current) {
      const div = scrollRef.current;
      const isScrolledToEnd =
        div.scrollLeft + div.offsetWidth === div.scrollWidth;
      setTimeout(() => {
        if (isScrolledToEnd) {
          div.scrollLeft = div.scrollWidth;
        }
      }, 0);
    }
  };

  // const handleUnitChange = (event) => {
  //   setUnit(parseInt(event.target.value));
  // };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleDelete = (index) => {
    console.info("You clicked the icon.");
    console.log(index);

    // let temp = tempSiteInfo.tagList;
    let temp = Array.from(tempSiteInfo.tagList);
    temp.splice(index, 1);
    console.log("temp");
    console.log(temp);
    setTempSiteInfo({
      ...tempSiteInfo,
      tagList: temp,
    });
    setTagList(temp);
    setUpdate(!update);
  };

  useEffect(() => {
    console.log("tagList");
    console.log(tagList);
  }, [tagList]);

  const onSubmit = async (data) => {
    console.log("들어옴");
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(
      JSON.stringify(
        {
          ...data,
          photo: data.photo,
          siteName: data.siteName,
          companyName: data.companyName,
          availableDays: data.availableDays,
          timeUnit: tu,
          totalTime: data.totalTime,
          link: data.link,
          extraQuestion1: data.extraQuestion1,
          extraQuestion2: data.extraQuestion2,
          // hashTags: hashTags,
        },
        null,
        2
      )
    );

    // reset();
  };
  const style = {
    "& > *": { my: "8px !important" },
  };
  const variant = "outlined";

  if (site) {
    return (
      <Masonry
        height="auto"
        columns={{ xs: 1, md: 1 }}
        sx={{ p: 1, mt: 3, ml: 0.5 }}
      >
        <Block title="내 사이트" sx={style}>
          {/* <Typography variant="p" sx={{ fontWeight: "bold" }}>
                권한: {auth[siteUser.authority]}
              </Typography>
              <br />
              <Typography variant="p" sx={{ fontWeight: "bold" }}>
                상태: {status[siteUser.status]}{" "}
              </Typography> */}
          <TextField
            variant={variant}
            required
            fullWidth
            label="회사 이름"
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                company: event.target.value,
              });
            }}
            value={tempSiteInfo.company}
          />
          <TextField
            variant={variant}
            required
            fullWidth
            label="사이트 이름"
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                name: event.target.value,
              });
            }}
            value={tempSiteInfo.name}
          />
          <TextField
            variant={variant}
            required
            fullWidth
            label="사이트 설명"
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                description: event.target.value,
              });
            }}
            value={tempSiteInfo.description}
          />
          {/* <label>
            예약 단위 선택:
            <select value={unit} onChange={handleUnitChange}>
              <option value={30}>30분</option>
              <option value={60}>60분</option>
              <option value={90}>90분</option>
              <option value={120}>120분</option>
            </select>
          </label> */}
          <TextField
            variant={variant}
            required
            fullWidth
            label="최대 예약 가능 날짜 (일)"
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                maxDate: event.target.value,
              });
            }}
            value={tempSiteInfo.maxDate}
          />
          {/* <OurTextField setTu={setTu}/> */}
          {/* <TextField
                variant={variant}
                required
                fullWidt
                label="예약 시간 단위"
                onChange={(event) => {
                  setTempSavedInfo({
                    ...tempSavedInfo,
                    purpose: event.target.value,
                  });
                }}
                value={tempSavedInfo.purpose}
              /> */}
          <TextField
            variant={variant}
            required
            fullWidth
            label="총 예약 가능 시간 (분)"
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                maxTime: event.target.value,
              });
            }}
            value={tempSiteInfo.maxTime}
          />
          <TextField
            id="reservation-unit"
            select
            label="예약 단위"
            value={tempSiteInfo.timeUnit}
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                timeUnit: event.target.value,
              });
            }}
            fullWidth
            required
          >
            <MenuItem value={30}>30분</MenuItem>
            <MenuItem value={60}>60분</MenuItem>
            <MenuItem value={90}>90분</MenuItem>
            <MenuItem value={120}>120분</MenuItem>
          </TextField>
          {/* <TextField
                variant={variant}
                required
                fullWidth
                label="사용자 제약 여부"
                onChange={(event) => {
                  setTempSavedInfo({
                    ...tempSavedInfo,
                    contact: event.target.value,
                  });
                }}
                value={tempSavedInfo.contact}
              /> */}
          <FormControl component="fieldset">
            <FormLabel component="legend">사용자 제약 여부</FormLabel>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RadioGroup
                aria-label="사용자 제약 여부"
                name="reservationUnit"
                value={tempSiteInfo.restriction.toString()}
                onChange={(event) => {
                  setTempSiteInfo({
                    ...tempSiteInfo,
                    restriction: parseInt(event.target.value),
                  });
                }}
              >
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="제약 없음"
                  labelPlacement="end"
                  title='"제약없음"은 로그인한 모든 사용자들이 서비스를 이용할 수 있습니다.'
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="제약 있음"
                  labelPlacement="end"
                  title='"제약있음"은 관리자의 별도 허가가 있어야 사용자들이 서비스를 이용할 수
                있습니다.'
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="일부 제약"
                  labelPlacement="end"
                  title='"일부제약"은 관리자와 같은 도메인 사용자들은 별도 허가 없이도
                이용할 수 있습니다.'
                />
                {/* <FormControlLabel value="120" control={<Radio />} label="120분" /> */}
              </RadioGroup>
              <Tooltip title={tooltipText}>
                <Box sx={{ width: "30px", marginLeft: "20px" }}>
                  <AiOutlineInfoCircle />
                </Box>
              </Tooltip>
            </Box>
          </FormControl>
          <TextField
            variant={variant}
            required
            fullWidth
            label="링크"
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                link: event.target.value,
              });
            }}
            value={tempSiteInfo.link}
          />

          <div style={{ overflowX: "auto" }} ref={scrollRef}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {tagList.length > 0 &&
                tagList.map((hashTag, index) => {
                  return (
                    <Chip
                      key={index}
                      variant={"Filled"}
                      icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
                      label={hashTag}
                      onDelete={() => handleDelete(index)}
                      color="secondary"
                    />
                  );
                })}
            </Stack>
          </div>

          <TextField
            fullWidth
            placeholder={
              "#태그를 등록해보세요. 입력하시고 엔터를 치시면 됩니다."
            }
            value={inputValue}
            onChange={handleInput}
            onKeyUp={addHashTag}
            onKeyDown={handleKeyDown}
          ></TextField>
          <Typography style={{ color: "#AAAAAA" }}>
            로고 선택 (jpg, jpeg, png 만 가능합니다.)
          </Typography>
          <div
            style={{
              marginTop: "10px",
              textAlign: "center",
              width: "100px",
              height: "100px",
            }}
          >
            <img src={tempSiteInfo.logo} alt="uploaded" />
          </div>
          <UpdateUpload
            file={file}
            setFile={setFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            tempSiteInfo={tempSiteInfo}
          ></UpdateUpload>
          <TextField
            variant={variant}
            required
            fullWidth
            label="추가 질문 1"
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                question1: event.target.value,
              });
            }}
            value={tempSiteInfo.question1}
          />
          <TextField
            variant={variant}
            required
            fullWidth
            label="추가 질문 2"
            onChange={(event) => {
              setTempSiteInfo({
                ...tempSiteInfo,
                question2: event.target.value,
              });
            }}
            value={tempSiteInfo.question2}
          />
        </Block>
      </Masonry>
      // </>
    );
  }
}
