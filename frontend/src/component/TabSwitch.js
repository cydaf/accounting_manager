import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Box,
    Tab,
    Card,
    CardContent,
    Autocomplete,
    Container,
    TextareaAutosize,
    Button,
} from "@mui/material";

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from "@mui/material/TextField";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Stack from "@mui/material/Stack";
import Icon from '@mui/material/Icon';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
// datePicker
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


export default function TabSwitch(props) {

    const handleClose = props.onClose;

    const [tabValue, setTabValue] = useState('1');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const nowDate = new Date();
    let month = nowDate.getMonth() + 1 > 10 ? nowDate.getMonth() + 1 : "0" + (nowDate.getMonth() + 1);
    let day = nowDate.getDate() > 10 ? nowDate.getDate() : "0" + nowDate.getDate();

    const [record, setRecord] = useState({
        date: nowDate.getFullYear() + "-" + month + "-" + day,
        price: 0,
        category: "",
        descs: "",
        revenue: "",
        user_id: "1"
    });


    const updateIn = async function () {
        // const record = { date: dateValue, price: priceValue, category: inputValue, descs: descsValue, revenue: 'income', user_id: "1" };
        // console.log(record);
        // let auth = {auth: {
        //     username: account,
        //     password: password
        //   }}
        try {
            if (record.id) {
                record.user_id = 18;
                await axios.put("/Record", record);

                alert("修改收入");
            }
            else {
                record.revenue = "income";
                record.user_id = 18;
                await axios.post("/Record", record);
                alert("成功記一筆收入");
            }
        }
        catch (e) {
            console.log(e);
            alert("紀錄失敗");
        }
        handleClose();
    }

    const updateEx = async function () {
        // const record = { date: dateValue, price: priceValue, category: inputValue, descs: descsValue, revenue: 'expense', user_id: "1" };
        // console.log(record);
        // let auth = {auth: {
        //     username: account,
        //     password: password
        //   }}
        try {
            if (record.id) {
                record.user_id = 18;

                await axios.put("/Record", record);
                alert("修改支出");
            }
            else {
                record.revenue = "expense";
                record.user_id = 18;

                await axios.post("/Record", record);
                alert("成功記一筆支出");
            }
        }
        catch (e) {
            console.log(e);
            alert("紀錄失敗");
        }
        handleClose();
    }

    const handleClick = function (e) {
        setRecord({ ...record, [e.target.name]: e.target.value });
    };
    const handleCate = function (e, value) {
        console.log(value.label);
        setRecord({ ...record, category: value.label.toString() });
        console.log('record:', record)
    };

    const handleDate = function (value) {
        console.log(value);
        let month = value.getMonth() + 1 > 10 ? value.getMonth() + 1 : "0" + (value.getMonth() + 1);
        let day = value.getDate() > 10 ? value.getDate() : "0" + value.getDate();
        const newDate = value.getFullYear() + "-" + month + "-" + day;
        setRecord({ ...record, date: newDate });
    };


    useEffect(() => {
        setRecord(props.record);
        if (props.record.revenue == "expense") {
            props.record.revenue = '1';
        } else if (props.record.revenue == "income") {
            props.record.revenue = '2';
        } else if (props.record.revenue == "") {
            props.record.revenue = '1';
        }
        setTabValue(props.record.revenue);
    }, [props.record, props.record.revenue]);



    return (
        <Box>
            <Box sx={{ width: '100%' }} >
                <TabContext value={tabValue}>
                    <Box sx={{ background: 'rgb(195, 205, 219)' }}>
                        <TabList centered onChange={handleChange} aria-label="收入/支出 新增">
                            <Tab label="支出" value="1" />
                            <Tab label="收入" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {/* <AddExpenditure /> */}
                        <Box>
                            <Container maxWidth="sm" sx={{ mt: 5 }}>
                                <Card sx={{ minWidth: 275 }} >
                                    <CardContent>
                                        <Stack spacing={3}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                                <Stack spacing={3} >
                                                    <DesktopDatePicker
                                                        label="消費日期"
                                                        minDate={new Date('2017-01-01')}
                                                        inputFormat="yyyy/MM/dd"
                                                        value={record.date}
                                                        onChange={handleDate}
                                                        name="date"
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '50vw' }}>
                                                    <MonetizationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                    <TextField
                                                        id="input-with-sx"
                                                        name="price"
                                                        label="消費金額"
                                                        type="number"
                                                        variant="standard"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        value={record.price}
                                                        onChange={handleClick}
                                                    />
                                                </Box>
                                                <Autocomplete
                                                    name="category"
                                                    size="small"
                                                    onChange={handleCate}
                                                    id="controllable-states-demo"
                                                    options={optionsEx}
                                                    // defaultValue={props.record.category != ""? optionsEx.find(v => v.label[1]):optionsEx.find(v => v.label[0])}
                                                    // getOptionSelected = {(option, v) => option.label === v.label}
                                                    getOptionLabel={(option) => option.label || ""}
                                                    sx={{ width: '50vw' }}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > Icon': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <Icon sx={{ mr: 2 }} color="primary">{option.iconName}</Icon>
                                                            {option.label}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => <TextField {...params} label="類別" inputProps={{
                                                        ...params.inputProps,
                                                        
                                                    }} />}
                                                />
                                            </Box>


                                            <TextareaAutosize
                                                name="descs"
                                                minRows={10}
                                                aria-label="maximum height"
                                                placeholder="寫點備註吧..."
                                                className="textarea"
                                                onChange={handleClick}
                                                value={record.descs}
                                            />
                                        </Stack>
                                        <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} onClick={handleClose}>取消</Button>
                                        <Button variant="contained" endIcon={<SaveIcon />} sx={{ mt: 3 }} onClick={updateEx}>
                                            {record.id ? "修改" : "新增"}
                                        </Button>
                                    </CardContent>
                                    <div>
                                        <div>{`消費日期： ${record.date !== "" ? `'${record.date}'` : 'null'}`}</div>
                                        <div>{`消費金額： ${record.price !== "" ? `'${record.price}'` : 'null'}`}</div>
                                        <div>{`類別: '${record.category}'`}</div>
                                        <div>{`細項: '${record.descs}'`}</div>

                                        <br />
                                    </div>
                                </Card>
                            </Container>
                        </Box>
                    </TabPanel>
                    <TabPanel value="2">
                        <Box>
                            <Container maxWidth="sm" sx={{ mt: 5 }}>
                                <Card sx={{ minWidth: 275 }} >
                                    <CardContent>
                                        <Stack spacing={3}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Stack spacing={3}>
                                                    <DesktopDatePicker
                                                        label="進款日期"
                                                        minDate={new Date('2017-01-01')}
                                                        inputFormat="yyyy/MM/dd"
                                                        value={record.date}
                                                        onChange={handleClick}
                                                        name="date"
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '50vw' }}>
                                                    <MonetizationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                    <TextField
                                                        id="input-with-sx"
                                                        label="進款金額"
                                                        type="number"
                                                        variant="standard"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        value={record.price}
                                                        onChange={handleClick}
                                                        name="price"
                                                    />
                                                </Box>
                                                <Autocomplete
                                                    name="category"
                                                    size="small"
                                                    onChange={handleCate}
                                                    defaultValue={[optionsIn[0]]}
                                                    id="controllable-states-demo"
                                                    options={optionsIn}
                                                    getOptionLabel={(option) => option.label || ""}
                                                    sx={{ width: '50vw' }}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > Icon': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <Icon sx={{ mr: 2 }} color="primary">{option.iconName}</Icon>
                                                            {option.label}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => <TextField {...params} label="類別" inputProps={{
                                                        ...params.inputProps,
                                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }} />}
                                                />
                                            </Box>

                                            <TextareaAutosize
                                                minRows={10}
                                                aria-label="maximum height"
                                                placeholder="寫點備註吧..."
                                                className="textarea"
                                                name="descs"
                                                onChange={handleClick}
                                                value={record.descs}
                                            />
                                        </Stack>
                                        <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} onClick={handleClose}>取消</Button>
                                        <Button variant="contained" endIcon={<SaveIcon />} sx={{ mt: 3 }} onClick={updateIn}>{record.id ? "修改" : "新增"}</Button>
                                    </CardContent>
                                    <div>
                                        <div>{`消費日期： ${record.date !== "" ? `'${record.date}'` : 'null'}`}</div>
                                        <div>{`消費金額： ${record.price !== "" ? `'${record.price}'` : 'null'}`}</div>
                                        <div>{`類別: '${record.category}'`}</div>
                                        <div>{`細項: '${record.descs}'`}</div>
                                        <br />
                                    </div>
                                </Card>
                            </Container>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}

const optionsEx = [
    { label: "飲食", iconName: "restaurant" },
    { label: "交通", iconName: "commute" },
    { label: "娛樂", iconName: "sports_esports" },
    { label: "購物", iconName: "shopping_cart" },
];

const optionsIn = [
    { label: "薪資", iconName: "local_atm" },
    { label: "投資", iconName: "savings" },
    { label: "獎金", iconName: "grade" },
];
