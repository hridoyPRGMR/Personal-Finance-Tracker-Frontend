import { Box, Tab, Tabs } from "@mui/material";
import Breadcrumbs from '../Breadcrumbs'
import PropTypes from 'prop-types';
import { useState } from "react";
import IncomeSources from "./IncomeSources";
import IncomeData from "./IncomeData";

export default function Income() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="Income">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Income">
                        <Tab label="Income" {...a11yProps(0)} />
                        <Tab label="Income Sources" {...a11yProps(1)} />
                    </Tabs>
                </Box>
             
                <TabPanel value={value} index={0}> 
                    <IncomeData/>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <IncomeSources />
                </TabPanel>
            </Box>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>} {/* Corrected from assignment (=) to comparison (===) */}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}
