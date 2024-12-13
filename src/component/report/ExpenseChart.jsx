import { useEffect, useState } from "react";
import ExpenseFilter from "./ExpenseFilter";
import Api from "../../api/Api";
import { Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { months } from "../helpers/CommonData";

export default function ExpenseChart(){

    const currentDate = new Date();

    const [filterby,setFilterby] = useState('1');
    const [month,setMonth] = useState(currentDate.getMonth()+1);
    const [year,setYear] = useState(currentDate.getFullYear());

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const [data,setData] = useState([]);
    const [xData,setXdata] = useState([]);

    const initialValues = {
        filterby:'1',
        month: currentDate.getMonth()+1,
        year: currentDate.getFullYear()
    }

    const handleFormSubmit = (values) => {
        setFilterby(values.filterby);
        setMonth(values.month);
        setYear(values.year);
    };

    useEffect(()=>{
        const fetchingExpenseData = async () =>{
            setLoading(true);
            setError(null);

            await Api.get(`/report/expense`, { month, year })
                .then(response=>{
                    setLoading(false);

                    if(filterby==="1"){
                        const datas = prepareMonthData(response);
                        setData(datas.amount);
                        setXdata(datas.days);
                    }
                    else if(filterby==="2"){
                        const datas = prepareYearData(response);
                        setData(datas.amount);
                        setXdata(datas.month);
                    }

                })
                .catch(error=>{
                    console.log(error);
                    setLoading(false);
                    setError("Failed to load data. Please try again.")
                })
        }
        fetchingExpenseData();

    },[month,year])

    return(
       <div className="expenseChart">
            <div className="row">
                <ExpenseFilter
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                />
            </div>
            <div className="row" style={{ marginTop: '100px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', color: 'blue' }}>
                        Loading data...
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', color: 'red' }}>
                        {error}
                    </div>
                ) : (
                    <Stack sx={{ width: '100%' }}>
                        <LineChart
                            xAxis={[{ data: xData, scaleType: 'point' }]}
                            series={[{ data, connectNulls: true }]}
                            height={200}
                            margin={{ top: 10, bottom: 20 }}
                        />
                    </Stack>
                )}
            </div>
       </div>
    )
}

function prepareYearData(data) {
    const datas = {
        month: [],
        amount: []
    };

    Object.entries(data).forEach(([key, val]) => {
        datas.month.push(months.get(parseInt(key, 10))); 
        datas.amount.push(val);
    });

    return datas;
}

function prepareMonthData(data){

    const datas = {
        days:[],
        amount:[]
    }

    Object.entries(data).forEach(([key,val])=>{
        datas.days.push(key);
        datas.amount.push(val);
    })

    return datas;
}