import * as Yup from 'yup';
import { useRef, useEffect, useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import roomImage from '../../../../assets/img/뉴턴220호.jpg';
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
    Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
// utils
import { fTimestamp } from '../../../../utils/formatTime';
import { fData } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import FormProvider, { RHFEditor, RHFCheckbox, RHFTextField } from '../../../../components/hook-form';
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const dummy_data = [{type:1} , {type:2}, {type:3}];

const MAX_FILE_SIZE = 2 * 1000 * 1000; // 2 Mb

const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export const defaultValues = {
    fullName: '',
    email: '',
    age: '',
    startDate: "2023-03-22",
    endDate: "2023-03-22",
    password: '',
    confirmPassword: '',
    editor: '',
    photo: null,
    terms: false,
};

export const FormSchema = Yup.object().shape({
    groupName: Yup.string()
        .required('모임명을 적어주셔야 합니다.'),
    groupPurpose: Yup.string()
        .required('모임 목적을 적어주셔야 합니다.'),
    name : Yup.string()
        .required('이름을 적어주셔야 합니다.'),
    number: Yup.string()
        .required('연락처를 적어주셔야 합니다.'),
    // email: Yup.string().required('Email is required').email('That is not an email'),
    startDate: Yup.date().nullable().required('시작시간을 적어주셔야 합니다.'),
    endDate: Yup.date()
        .required('끝시간을 적어주셔야 합니다.')
        .nullable()
        .min(Yup.ref('startDate'), '끝시간이 시작시간보다 더 늦어야 합니다.'),
    // editor: Yup.string().required('Editor is required'),
    // terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
    // photo: Yup.mixed()
    //     .required('Photo is is required')
    //     .test('fileSize', 'The file is too large', (file) => file && file.size <= MAX_FILE_SIZE)
    //     .test('fileFormat', 'Unsupported Format', (file) => file && FILE_FORMATS.includes(file.type)),
});

export default function OneReactHookForm() {
    const fileInputRef = useRef(null);

    // const [showPassword, setShowPassword] = useState(false);

    const [open, setOpen] = useState(false);

    const methods = useForm({
        mode: 'onTouched',
        resolver: yupResolver(FormSchema),
        defaultValues,
    });

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
        if (values.editor === '<p><br></p>') {
            resetField('editor');
        }
    }, [resetField, values.editor]);

    const handleClickAttachPhoto = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (data) => {

        await new Promise((resolve) => setTimeout(resolve, 500));
        // alert(
        //     JSON.stringify(
        //         {
        //             ...data,
        //             photo: data.photo,
        //             startDate: data.startDate && fTimestamp(data.startDate),
        //             endDate: data.endDate && fTimestamp(data.endDate),
        //         },
        //         null,
        //         2
        //     )
        // );

        if (!Object.keys(errors).length) {
            setOpen(true);
        }
        // reset();
    };

    const handleClickOpen = () => {
        if (!Object.keys(errors).length) {
            setOpen(true);
        }



    };
    const movePage = useNavigate();
    const handleClose = () => {
        setOpen(false);

    };
    const handleApply = () => {
        setOpen(false);
        alert("예약 완료되었습니다.");
        movePage('/');
    };
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Stack spacing={3}>

                        <RHFTextField name="groupName" label="모임명" />
                        <RHFTextField name="groupPurpose" label="대여목적" />
                        <RHFTextField name="name" ph="이인혁" label="신청인 이름" />
                        <RHFTextField name="number" ph="010-3376-7640" label="신청인 번호" />

                        <Stack spacing={{ xs: 2, sm: 3 }} direction={{ xs: 'column', sm: 'row' }}>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <DatePicker
                                        {...field}
                                        label="시작 시간"
                                        inputFormat="yyyy/MM/dd"
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                                        )}
                                    />
                                )}
                            />

                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <DatePicker
                                        {...field}
                                        label="끝 시간"
                                        inputFormat="yyyy/MM/dd"
                                        renderInput={(params) => (
                                            <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                                        )}
                                    />
                                )}
                            />
                        </Stack>

                        {/*여기 조건부로 바꾸기*/}
                        {/*{dummy_data.map((type)=>)}*/}
                        {/*<b>영수증 업로드 하기</b>*/}
                        {/*<div>*/}
                        {/*    <Button*/}
                        {/*        color="warning"*/}
                        {/*        variant="contained"*/}
                        {/*        onClick={handleClickAttachPhoto}*/}
                        {/*        startIcon={<Iconify icon="eva:cloud-upload-fill" />}*/}
                        {/*    >*/}
                        {/*        Upload photo*/}
                        {/*    </Button>*/}

                        {/*    <div>*/}
                        {/*        {values.photo?.name && <Typography variant="subtitle2">{values.photo.name}</Typography>}*/}
                        {/*        {values.photo?.size && (*/}
                        {/*            <Typography variant="caption" sx={{ color: 'text.secondary' }}>*/}
                        {/*                {fData(values.photo.size)}*/}
                        {/*            </Typography>*/}
                        {/*        )}*/}
                        {/*    </div>*/}

                        {/*    <input*/}
                        {/*        {...register('photo')}*/}
                        {/*        ref={fileInputRef}*/}
                        {/*        type="file"*/}
                        {/*        onChange={(event) => {*/}
                        {/*            const file = event.target.files?.[0];*/}
                        {/*            setValue('photo', file);*/}
                        {/*        }}*/}
                        {/*        style={{ display: 'none' }}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/*<Box sx={{display:"flex"}}>*/}
                        {/*    <Button sx={{width:"50%", margin:"4px"}} color="secondary" variant={"contained"} size={"large"} type={"submit"}>뒤로가기</Button>*/}
                        {/*    */}
                        {/*    <LoadingButton sx={{width:"50%", margin:"4px"}} color="info" size="large" type="submit" variant="contained">*/}
                        {/*        예약하기*/}
                        {/*    </LoadingButton>*/}
                        {/*</Box>*/}

                    </Stack>
                </Grid>


            </Grid>
            <div>


                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>예약하시겠습니까?</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            뉴턴 220호 (1월 7일)
                            13:00 ~ 14:00
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button color="error" onClick={handleClose} autoFocus>취소</Button>
                        <Button onClick={handleApply}>
                            예약
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </FormProvider>


    );
}
