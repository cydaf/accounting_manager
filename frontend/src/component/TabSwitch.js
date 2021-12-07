import * as React from "react";
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
} from "@mui/material";

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AppMenu from "../component/AppMenu";
import PropTypes from 'prop-types';
import AddExpenditure from './AddExpenditure';
import AddIncome from './AddIncome';


export default function TabSwitch(props) {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <AppMenu />

            <Box sx={{ width: '100%' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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

            {/* <TabsContext value={selectedTab}>
                <TabList onChange={HandleChange} aria-label="lab ex">
                    <Tab label="支出" value="1"></Tab>
                    <Tab label="收入" value="2"></Tab>
                </TabList>
                <TabPanel value="1">
                    <AddExpenditure />
                </TabPanel>
                <TabPanel value="2">
                    <AddIncome />
                </TabPanel>

            </TabsContext> */}

        </Box>

    );
}


