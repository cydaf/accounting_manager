import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Box,
    Tab,
    Dialog,
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
import AppMenu from "../component/AppMenu";
import AddExpenditure from './AddExpenditure';
import AddIncome from './AddIncome';
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
    // console.log(props.record);
    // useEffect(() => setRecord(props.record), [props.record]);


    const handleOpen = props.open;
    const handleClose = props.onClose;

    const [tabValue, setTabValue] = useState('1');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [exValue, setExValue] = useState(optionsEx[0].label);
    const [inValue, setInValue] = useState(optionsIn[0].label);
    const [inputValue, setInputValue] = useState('');
    const [priceValue, setPriceValue] = useState(null);
    const [dateValue, setDateValue] = useState(new Date());
    const [descsValue, setDescsValue] = useState('');

    const date = new Date();
    const [record, setRecord] = useState({
        date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        price: 0,
        category: optionsEx[0].label,
        descs: "",
        revenue: "",
        user_id: "1"
    });


    const updateIn = async function () {
        // const record = { date: dateValue, price: priceValue, category: inputValue, descs: descsValue, revenue: 'income', user_id: "1" };
        // console.log(record);
        try {
            record.revenue = "income";
            console.log(record.user_id);
            await axios.post("/Record", record);
            alert("成功記一筆收入");
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
        try {
            if (record.id) {
                await axios.put("/Record", record);
                alert("修改支出");
            }
            else {
                record.revenue = "expense";
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
        console.log('record:',record)
      };

      const handleDate = function (value) {
        console.log(value);
        const newDate = value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate();
        setRecord({ ...record, date: newDate});
      };


    return (
        //<Box>
        <Dialog open={handleOpen}>
            {/* <AppMenu /> */}

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
                                                        // value={dateValue}
                                                        // onChange={(newValue) => {
                                                        //     // setDateValue(newValue);
                                                        //     console.log(newValue.getFullYear() + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate())
                                                        //     const newDate = newValue;
                                                        //     setRecord({ ...record, date: newDate });
                                                        // }}
                                                        minDate={new Date('2017-01-01')}
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
                                                        // value={priceValue}
                                                        // onChange={(e) => {
                                                        //     setPriceValue(e.target.value)
                                                        // }
                                                        // }
                                                    value={record.price}
                                                    onChange={handleClick}
                                                    />
                                                </Box>
                                                <Autocomplete
                                                    name="category"
                                                    size="small"
                                                    // value={record.category}
                                                    // value={exValue}
                                                    // onChange={(event, newInputValue) => {
                                                    //     setExValue(newInputValue);
                                                    // }}
                                                    onChange={handleCate}

                                                    // inputValue={inputValue}
                                                    // onInputChange={(event, newInputValue) => {
                                                    //     setInputValue(newInputValue);
                                                    // }}
                                                    // inputValue={record.category}
                                                    // onInputChange={handleClick}
                                                    id="controllable-states-demo"
                                                    options={optionsEx}
                                                    defaultValue={[optionsEx[0]]}
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
                                                // value={descsValue}
                                                // onChange={(e) => {
                                                //     setDescsValue(e.target.value)
                                                // }}
                                            onChange={handleClick}
                                            value={record.descs}
                                            />
                                        </Stack>
                                        {/* <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} component={Link} to="../">取消</Button> */}
                                        <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} onClick={handleClose}>取消</Button>
                                            <Button variant="contained" endIcon={<SaveIcon />} sx={{ mt: 3 }} onClick={updateEx}>
                                                {props.record.id?"修改":"新增"}
                                                {/* 儲存 */}
                                            </Button>
                                    </CardContent>
                                    <div>
                                        {/* <div>{`消費日期： ${dateValue !== null ? `'${dateValue.getFullYear()}/${dateValue.getMonth() + 1}/${dateValue.getDate()}'` : 'null'}`}</div>
                                        <div>{`消費金額： ${priceValue !== null ? `'${priceValue}'` : 'null'}`}</div>
                                        <div>{`類別: '${inputValue}'`}</div>
                                        <div>{`細項: '${descsValue}'`}</div> */}

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
                        {/* <AddIncome /> */}
                        <Box>
                            {/* <AppMenu /> */}
                            <Container maxWidth="sm" sx={{ mt: 5 }}>
                                <Card sx={{ minWidth: 275 }} >
                                    <CardContent>
                                        <Stack spacing={3}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Stack spacing={3}>
                                                    <DesktopDatePicker
                                                        label="進款日期"
                                                        // value={dateValue}
                                                        minDate={new Date('2017-01-01')}
                                                        // onChange={(newValue) => {
                                                        //     setDateValue(newValue);
                                                        // }}
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
                                                        // value={priceValue}
                                                        // onChange={(e) => {
                                                        //     setPriceValue(e.target.value)
                                                        // }
                                                        // }
                                                        value={record.price}
                                                        onChange={handleClick}
                                                        name="price"
                                                    />
                                                </Box>
                                                <Autocomplete
                                                    name="category"
                                                    size="small"
                                                    value={record.category}
                                                    onChange={handleCate}
                                                    // value={inValue}
                                                    // onChange={(event, newInputValue) => {
                                                    //     setInValue(newInputValue);
                                                    // }}
                                                    defaultValue={[optionsIn[0]]}
                                                    // inputValue={inputValue}
                                                    // onInputChange={(event, newInputValue) => {
                                                    //     setInputValue(newInputValue);
                                                    // }}
                                                    // inputValue={record.category}
                                                    // onInputChange={handleClick}
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
                                                // value={descsValue}
                                                // onChange={(e) => {
                                                //     setDescsValue(e.target.value)
                                                // }
                                                // }
                                                name="descs"
                                            onChange={handleClick}
                                            value={record.descs}
                                            />
                                        </Stack>
                                        {/* <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} component={Link} to="../">取消</Button> */}
                                        <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} onClick={handleClose}>取消</Button>
                                        <Button variant="contained" endIcon={<SaveIcon />} sx={{ mt: 3 }} onClick={updateIn}>儲存</Button>
                                    </CardContent>
                                    <div>
                                        {/* <div>{`消費日期： ${dateValue !== null ? `'${dateValue.getFullYear()}/${dateValue.getMonth() + 1}/${dateValue.getDate()}'` : 'null'}`}</div>
                                        <div>{`進帳金額： ${priceValue !== null ? `'${priceValue}'` : 'null'}`}</div>
                                        <div>{`類別: '${inputValue}'`}</div>
                                        <div>{`細項: '${descsValue}'`}</div> */}
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
        </Dialog>
        //</Box>
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
