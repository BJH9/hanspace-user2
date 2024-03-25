import * as Yup from "yup";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
// @mui
import {
  Stack,
  Grid,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  InputLabel,
  FormHelperText,
  MenuItem,
  Chip,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  Tooltip,
  Select,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
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

import CreateSiteUpload from "src/components/FileUpload/CreateSIteUpload";
import UploadImg from "src/components/FileUpload/UploadImg";

// ----------------------------------------------------------------------

const MAX_FILE_SIZE = 2 * 1000 * 1000; // 2 Mb

const FILE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const defaultValues = {
  photo: null,
  siteName: "",
  company: "",
  description: "",
  maxDate: "",
  timeUnit: 30,
  maxTime: "",
  link: "",
  extraQuestion1: "",
  extraQuestion2: "",
};

const style = {
  display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  flexWrap: "wrap",
  // "& > *": { mx: 1 },
  minHeight: "0 !important",
  padding: "0 0 10px 10px",
};
export const FormSchema = Yup.object().shape({
  siteName: Yup.string().required("사이트 이름을 입력해주셔야 합니다."),
  company: Yup.string().required("회사 이름을 입력해주셔야 합니다."),
  description: Yup.string().required("설명을 입력해주셔야 합니다."),
  maxDate: Yup.string().required("예약 가능 날짜를 입력해주셔야 합니다."),
  // timeUnit: Yup.string().required("예약 시간 단위를 입력해주셔야 합니다."),
  maxTime: Yup.string().required("예약 가능한 총 시간을 입력해주셔야 합니다."),
  link: Yup.string().required("링크를 입력해주셔야 합니다."),
  photo: Yup.mixed(),
  extraQuestion1: Yup.mixed(),
  extraQuestion2: Yup.mixed(),
  // .required('Photo is is required')
  // .test('fileSize', 'The file is too large', (file) => file && file.size <= MAX_FILE_SIZE)
  // .test('fileFormat', 'Unsupported Format', (file) => file && FILE_FORMATS.includes(file.type)),
});

export default function CreateSiteReactHookForm({
  setMySiteSettingOpen,
  user,
}) {
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [onTag, setOnTag] = useState(false);
  const [hashTags, setHashTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [update, setUpdate] = useState(false);
  const [tu, setTu] = useState("30");

  const methods = useForm({
    // mode: "onTouched",
    mode: "onChange",
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const tooltipText = (
    <>
      "제약있음"은 관리자의 별도 허가가 있어야 사용자들이 서비스를 이용할 수
      있습니다.
      <br />
      <br />
      "제약없음"은 로그인한 모든 사용자들이 서비스를 이용할 수 있습니다.
      <br />
      <br />
      "일부제약"은 관리자와 같은 도메인 사용자들은 별도 허가 없이도 이용할 수
      있습니다.
    </>
  );
  const {
    watch,
    reset,
    control,
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (values.editor === "<p><br></p>") {
      resetField("editor");
    }
  }, [resetField, values.editor]);

  const handleClickAttachPhoto = () => {
    fileInputRef.current?.click();
  };

  const clickTags = () => {
    setOnTag(!onTag);
  };

  // const putTags = (value) => {
  //     setTags([...tags, value]);
  //     // console.log(tags);
  // }
  // const handleKeyDown = (event) => {
  //
  //     if(event.key === 'Enter') {
  //         event.preventDefault();
  //         console.log("들어온값 : " + event.target.value);
  //         const value = event.target.value.trim();
  //         if (value) {
  //             setTags([...tags, value]);
  //         }
  //
  //         event.target.value = '';
  //
  //         // setTags([...tags, event.target.value]);
  //         // putTags(event.target.value);
  //         // event.target.value= ' ';
  //     }
  // }
  const inputTag = (event) => {
    // console.log(event.target.value);
    // const temp = event.target.value;
    // setTags(inputValue);
    // console.log(inputValue);
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
      value: "0",
    },
    {
      name: "제약 있음",
      value: "1",
    },
    {
      name: "일부 제약",
      value: "2",
    },
  ];

  const [imageUrl, setImageUrl] = useState(null);

  const [file, setFile] = useState(null);

  const addHashTag = (e) => {
    const allowedCommand = ["Comma", "Enter", "Space", "NumpadEnter"];
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

    setHashTags((prevHashTags) => {
      return [...new Set([...prevHashTags, newHashTag])];
    });

    setInputValue("");
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleDelete = (index) => {
    console.info("You clicked the icon.");
    console.log(index);
    let temp = hashTags;
    temp.splice(index, 1);
    setHashTags(temp);
    setUpdate(!update);
  };
  const onSubmit = async (data) => {
    console.log("들어옴");
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(
      JSON.stringify(
        {
          ...data,
          photo: data.photo,
          siteName: data.siteName,
          company: data.company,
          description: data.description,
          maxDate: data.maxDate,
          timeUnit: tu,
          maxTime: data.maxTime,
          link: data.link,
          extraQuestion1: data.extraQuestion1,
          extraQuestion2: data.extraQuestion2,
          hashTags: hashTags,

          //   startDate: data.startDate && fTimestamp(data.startDate),
          //   endDate: data.endDate && fTimestamp(data.endDate),
        },
        null,
        2
      )
    );

    reset();
  };

  const inItData = {
    siteName: "",
    company: "",
    description: "",
    logo: "a",
    link: "",
    maxDate: 0,
    maxTime: 0,
    timeUnit: 0,
    question1: "",
    question2: "",
    restriction: 0,
    userId: user.id,
  };

  const [createData, setCreateData] = useState(inItData);

  const handleChange = (e) => {
    setCreateData({
      ...createData,
      [e.target.name]: e.target.value,
    });
  };

  const createSite = async () => {
    console.log("createData", createData);
    const response = await axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/site/create-site`,
        JSON.stringify(createData),
        {
          method: "POST",
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res));
    window.location.reload();
  };

  const [error, setError] = useState(false);

  const [maxDateInput, setMaxDateInput] = useState(30);
  const handleMaxDateChange = (event) => {
    setMaxDateInput(event.target.value);
    setCreateData({
      ...createData,
      maxDate: event.target.value,
    });
  };

  const [maxTimeInput, setMaxTimeInput] = useState(60);
  const handleMaxTimeChange = (event) => {
    setMaxTimeInput(event.target.value);
    setCreateData({
      ...createData,
      maxTime: event.target.value,
    });
  };

  const [maxTimeUnitInput, setMaxTimeUnitInput] = useState(30);
  const handleTimeUnitChange = (event) => {
    setMaxTimeUnitInput(event.target.value);
    setCreateData({
      ...createData,
      timeUnit: event.target.value,
    });
    setError(event.target.value > maxTimeInput);
  };

  const [RestrictionInput, setRestrictionInput] = useState(0);
  const handleRestrictionChange = (event) => {
    setRestrictionInput(event.target.value);
    setCreateData({
      ...createData,
      restriction: event.target.value,
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Stack spacing={3}>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="회사이름"
                variant="outlined"
                name="company"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="사이트명"
                variant="outlined"
                name="siteName"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="설명"
                variant="outlined"
                name="description"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            {/* <Tooltip title={tooltipText}>
              <Box sx={{ width: "30px", marginLeft: "20px" }}>
                <AiOutlineInfoCircle />
              </Box>
            </Tooltip> */}
            {/* <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="최대 예약가능 날짜"
                variant="outlined"
                name="maxDate"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box> */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  최대 예약 가능 날짜
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="최대 예약가능 날짜"
                  name="maxDate"
                  value={maxDateInput}
                  onChange={handleMaxDateChange}
                >
                  <MenuItem value={30}>30일</MenuItem>
                  <MenuItem value={60}>60일</MenuItem>
                  <MenuItem value={90}>90일</MenuItem>
                  <MenuItem value={180}>180일</MenuItem>
                  <MenuItem value={360}>360일</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <Tooltip title={tooltipText}>
              <Box sx={{ width: "30px", marginLeft: "20px" }}>
                <AiOutlineInfoCircle />
              </Box>
            </Tooltip> */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  최대 예약 가능 시간
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="최대 예약가능 시간"
                  name="maxTime"
                  value={maxTimeInput}
                  onChange={handleMaxTimeChange}
                >
                  <MenuItem value={60}>1시간</MenuItem>
                  <MenuItem value={120}>2시간</MenuItem>
                  <MenuItem value={180}>3시간</MenuItem>
                  <MenuItem value={360}>6시간</MenuItem>
                  <MenuItem value={720}>12시간</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <OurTextField setTu={setTu} onChange={handleChange} /> */}
            {/* <Tooltip title={tooltipText}>
              <Box sx={{ width: "30px", marginLeft: "20px" }}>
                <AiOutlineInfoCircle />
              </Box>
            </Tooltip> */}
            {/* <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="최대 예약가능 시간"
                variant="outlined"
                name="maxTime"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box> */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">시간 단위</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="시간 단위"
                  name="timeUnit"
                  value={maxTimeUnitInput}
                  onChange={handleTimeUnitChange}
                >
                  <MenuItem value={30}>30분</MenuItem>
                  <MenuItem value={60}>1시간</MenuItem>
                  <MenuItem value={90}>1시간 30분</MenuItem>
                  <MenuItem value={120}>2시간</MenuItem>
                  <MenuItem value={150}>2시간 30분</MenuItem>
                </Select>
              </FormControl>
              {error && (
                <p style={{ color: "red" }}>
                  최대 예약 시간보다 작은 값을 선택해주세요.
                </p>
              )}
            </Box>

            <Block title="사용자 제약 여부" sx={style}>
              <FormControl component="fieldset">
                <RadioGroup row defaultValue="top">
                  {accessLevel.map((level) => (
                    <FormControlLabel
                      key={level.name}
                      value={level.value}
                      label={level.name}
                      labelPlacement={"start"}
                      control={
                        <Radio
                          name="restriction"
                          onChange={handleRestrictionChange}
                        />
                      }
                      sx={{ textTransform: "capitalize" }}
                    />
                  ))}
                </RadioGroup>

                <Tooltip title={tooltipText}>
                  <Box sx={{ width: "30px", marginLeft: "20px" }}>
                    <AiOutlineInfoCircle />
                  </Box>
                </Tooltip>
              </FormControl>
            </Block>

            {/* <Tooltip title={tooltipText}>
              <Box sx={{ width: "30px", marginLeft: "20px" }}>
                <AiOutlineInfoCircle />
              </Box>
            </Tooltip> */}
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="링크"
                variant="outlined"
                name="link"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>

            {/* <Tooltip title={tooltipText}>
              <Box sx={{ width: "30px", marginLeft: "20px" }}>
                <AiOutlineInfoCircle />
              </Box>
            </Tooltip> */}
            {/* <div style={{ overflowX: "auto" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {hashTags.length > 0 &&
                  hashTags.map((hashTag, index) => {
                    return (
                      <Chip
                        key={hashTag}
                        variant={"Filled"}
                        icon={
                          <Iconify width={24} icon="eva:smiling-face-fill" />
                        }
                        label={hashTag}
                        onDelete={() => handleDelete(index)}
                        color="secondary"
                      />
                    );
                  })}
              </Stack>
            </div>
            <TextField
              placeholder={
                "#태그를 등록해보세요. 입력하시고 엔터를 치시면 됩니다."
              }
              value={inputValue}
              onChange={handleInput}
              onKeyUp={addHashTag}
              onKeyDown={handleKeyDown}
            ></TextField> */}

            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="질문1"
                variant="outlined"
                name="question1"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>
            <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
              <TextField
                id="outlined-basic"
                label="질문2"
                variant="outlined"
                name="question2"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </Box>

            <UploadImg
              file={file}
              setFile={setFile}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              // createData={createData}
              setCreateData={setCreateData}
            />

            {/* <div>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Button
                  color="warning"
                  variant="contained"
                  onClick={handleClickAttachPhoto}
                  startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                >
                  로고 사진
                </Button>

                <div>
                  {values.photo?.name && (
                    <Typography variant="subtitle2">
                      {values.photo.name}
                    </Typography>
                  )}
                  {values.photo?.size && (
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {fData(values.photo.size)}
                    </Typography>
                  )}
                </div>

                <input
                  {...register("photo")}
                  ref={fileInputRef}
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setValue("photo", file);
                  }}
                  style={{ display: "none" }}
                />
              </Stack>

              {!!errors?.photo && (
                <FormHelperText sx={{ px: 2, display: "block" }} error>
                  {errors?.photo?.message}
                </FormHelperText>
              )}
            </div> */}

            {!error ? (
              <LoadingButton
                fullWidth
                color="info"
                size="large"
                type="submit"
                variant="contained"
                onClick={createSite}
              >
                완료
              </LoadingButton>
            ) : (
              <Typography color="red">
                유효성 에러를 해결해야 사이트 생성이 가능합니다.
              </Typography>
            )}

            <Stack
              spacing={{ xs: 2, sm: 3 }}
              direction={{ xs: "column", sm: "row" }}
            ></Stack>
          </Stack>
        </Grid>

        {/*<Grid item xs={12} md={6}>*/}

        {/*</Grid>*/}
      </Grid>
    </FormProvider>
  );
}
