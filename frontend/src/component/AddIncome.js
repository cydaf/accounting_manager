import * as React from "react";
import { Link } from "react-router-dom";

import {
    Card,
    CardContent,
    Box,
    Chip,
    Autocomplete,
    Avatar,
    Container,
    TextareaAutosize,
    Button,
    Tab, Tabs,
    Typography,
    TabsContext
} from "@mui/material";

import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Stack from "@mui/material/Stack";
import Icon from '@mui/material/Icon';
import AppMenu from "../component/AppMenu";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
// datePicker
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


export default function AddIncome(props) {

    const [value, setValue] = React.useState(options[0].label);
    const [inputValue, setInputValue] = React.useState('');
    const [costValue, setCostValue] = React.useState(null);
    const [dataValue, setDateValue] = React.useState(new Date());
    const [descValue, setDescValue] = React.useState('');


    const handleChange = (event) => {
        setCostValue(event.target.value);
    };


    // const [record, setRecord] = React.useState({date:new Date(), cost:null, category:options[0].label, desc:""});
    // const handleClick = function(e){

    //     setRecord({...record,[e.target.name]:e.target.value})

    //   }
    //   const add = function(){
    //     props.update(record);
    //     console.log(record.date, record.cost, record.category, record.desc);
    //   }

    // const add = (e) => {
    //     onAdd({ inputValue, costValue, dataValue, descValue });

    //     setInputValue('')
    //     setCostValue(null)
    //     setDateValue(new Date())
    //     setDescValue('')
    // }


    return (
        <Box>
            {/* <AppMenu /> */}
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Card sx={{ minWidth: 275 }} >
                    <CardContent>
                        <Stack spacing={3} sx={{ width: 500 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="進款日期"
                                        value={dataValue}
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
                                    {/* <TextField id="input-with-sx" label="消費金額" variant="standard"
                                        value={costValue}
                                        onChange={(event, newCostValue) => {
                                            setCostValue(newCostValue);
                                        }}
                                    // value={record.cost}
                                    // onChange={handleClick}
                                    /> */}
                                    <TextField
                                        id="input-with-sx"
                                        label="進款金額"
                                        type="number"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={costValue}
                                        onChange={(e) => {
                                            setCostValue(e.target.value)
                                        }
                                        }
                                        // value={record.cost}
                                        // onChange={handleClick}
                                        name="cost"
                                    />
                                </Box>
                                <Autocomplete
                                    size="small"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    // value={record.category}
                                    // onChange={handleClick}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    // value={record.category}
                                    // onChange={handleChange}
                                    name="category"
                                    id="controllable-states-demo"
                                    options={options}
                                    // getOptionLabel={(option) => option.label}
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
                                // defaultValue=""
                                className="textarea"
                                value={descValue}
                                onChange={(e) => {
                                    setDescValue(e.target.value)
                                }
                                }

                                name="desc"
                            // onChange={handleClick}
                            // value={record.desc}
                            />
                        </Stack>
                        <Button variant="outlined" startIcon={<HighlightOffIcon />} sx={{ mt: 3, mr: 2 }} component={Link} to="../">取消</Button>
                        <Button variant="contained" endIcon={<SaveIcon />} sx={{ mt: 3 }} >儲存</Button>
                    </CardContent>
                    <div>
                        <div>{`進款日期： ${dataValue !== null ? `'${dataValue.getFullYear()}/${dataValue.getMonth() + 1}/${dataValue.getDate()}'` : 'null'}`}</div>
                        <div>{`進款金額： ${costValue !== null ? `'${costValue}'` : 'null'}`}</div>
                        {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div> */}
                        <div>{`類別: '${inputValue}'`}</div>
                        <div>{`細項: '${descValue}'`}</div>

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
