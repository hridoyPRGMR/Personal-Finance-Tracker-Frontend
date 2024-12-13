import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: "/home"
    },
    {
        title: "Income",
        icon: <AttachMoneyIcon/>,
        link: "/income"
    },
    {
        title: "Expense",
        icon: <MoneyOffIcon/>,
        link: "/expense"
    },
    {
        title: "Debt",
        icon: <AccountBalanceIcon/>,
        link: "/debt"
    },
    {
        title: "Report",
        icon: <AssessmentIcon/>,
        link: "/report"
    },
    
]

