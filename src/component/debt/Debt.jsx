import React, { useEffect, useState } from 'react';
import { Label } from "@mui/icons-material"
import DynamicTabs from '../tab/DynamicTabs';
import CreateDebt from './CreateDebt'
import DebtList from './DebtList';
import Breadcrumbs from '../Breadcrumbs';


export default function Debt() {

    const tabsData = [
        { label: "Save Debt", content: <CreateDebt/> },   
        { label: "Debt List", content: <DebtList/> }

    ]

    return (
        <div>
           <DynamicTabs tabsData={tabsData}></DynamicTabs>
        </div>
    )
}