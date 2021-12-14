import * as React from "react";
import {
    Box,
    Tab, 
    Dialog,
} from "@mui/material";

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AppMenu from "../component/AppMenu";
import AddExpenditure from './AddExpenditure';
import AddIncome from './AddIncome';


export default function TabSwitch(props) {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
        {/* <Dialog open={props.open}> */}
            <AppMenu />

            <Box sx={{ width: '100%' }} >
                <TabContext value={value}>
                    <Box sx={{ background: 'rgb(195, 205, 219)'}}>
                        <TabList centered onChange={handleChange} aria-label="收入/支出 新增">
                            <Tab label="支出" value="1" />
                            <Tab label="收入" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <AddExpenditure />
                    </TabPanel>
                    <TabPanel value="2">
                        <AddIncome />
                    </TabPanel>
                </TabContext>
            </Box>
        {/* </Dialog> */}
        </Box>
    );
}


