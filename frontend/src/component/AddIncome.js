import * as React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
    Card,
    CardContent,
    Box,
    Autocomplete,
    Container,
    TextareaAutosize,
    Button,
} from "@mui/material";

import PropTypes from 'prop-types';
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


export default function AddIncome(props) {

    const [value, setValue] = React.useState(options[0].label);
    const [inputValue, setInputValue] = React.useState('');
    const [priceValue, setPriceValue] = React.useState(null);
    const [dateValue, setDateValue] = React.useState(new Date());
    const [descsValue, setDescsValue] = React.useState('');

    const handleChange = (event) => {
        setPriceValue(event.target.value);
    };

    const handleClick = function (e) {
        // setRecord({...record)
        if (e) {
            console.log(e, e.target.name);
        }
    }

    const update = async function () {
        const record = { date: dateValue, price: priceValue, category: inputValue, descs: descsValue, revenue: 'income' };
        console.log(record)
        try {
            await axios.post("/Record", record);
        }
        catch (e) {
            console.log(e);
        }
        // props.close();
    }



    return (
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
                                        value={dateValue}
                                        minDate={new Date('2017-01-01')}
                                        onChange={(newValue) => {
                                            setDateValue(newValue);
                                        }}
                                        // value={record.date}
                                        // onChange={handleClick}
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
                                        value={priceValue}
                                        onChange={(e) => {
                                            setPriceValue(e.target.value)
                                        }
                                        }
                                        // value={record.cost}
                                        // onChange={handleClick}
                                        name="price"
                                    />
                                </Box>
                                <Autocomplete
                                    name="category"
                                    size="small"
                                    // value={record.category}
                                    // onChange={handleClick}
                                    value={value}
                                    onChange={(event, newInputValue) => {
                                        setValue(newInputValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    // inputValue={record.category}
                                    // onInputChange={handleClick}
                                    id="controllable-states-demo"
                                    options={options}
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
                                value={descsValue}
                                onChange={(e) => {
                                    setDescsValue(e.target.value)
                                }
                                }
                                name="descs"
                            // onChange={handleClick}
                            // value={record.desc}
                            />
                        </Stack>
                        {/* <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} component={Link} to="../">取消</Button> */}
                        <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} onClick={() => props.close()}>取消</Button>
                        <Button variant="contained" endIcon={<SaveIcon />} sx={{ mt: 3 }} onClick={update}>儲存</Button>
                    </CardContent>
                    <div>
                    <div>{`消費日期： ${dateValue !== null ? `'${dateValue.getFullYear()}/${dateValue.getMonth() + 1}/${dateValue.getDate()}'` : 'null'}`}</div>
                        <div>{`進帳金額： ${priceValue !== null ? `'${priceValue}'` : 'null'}`}</div>
                        <div>{`類別: '${inputValue}'`}</div>
                        <div>{`細項: '${descsValue}'`}</div>
                        <br />
                    </div>
                </Card>
            </Container>
        </Box>

    );
}


const options = [
    { label: "薪資", iconName: "local_atm" },
    { label: "投資", iconName: "savings" },
    { label: "獎金", iconName: "grade" },
];
