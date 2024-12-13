import { useState, useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import FilterForm from "./FilterForm";
import { LineChart } from "@mui/x-charts";
import Api from "../../api/Api";

export default function IncomeChart() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [incomeSource, setIncomeSource] = useState(0);
    const [data, setData] = useState([]);
    const [xData, setXData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const filterInitialValues = useMemo(() => ({
        year: new Date().getFullYear(),
        incomeSource: '',
    }), []);

    useEffect(() => {
        
        const fetchIncomeData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await Api.get(`/report/income`, { year, incomeSource });
                setData(response?.incomes || []);
                setXData(response?.months || []);
            } catch (err) {
                console.error("Error fetching income data:", err);
                setError("Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        
        if (year && incomeSource !== undefined) {
            fetchIncomeData();
        }

    }, [year, incomeSource]);

    const handleFormSubmit = (values) => {
        setYear(values.year);
        setIncomeSource(values.incomeSource);
    };

    return (
        <div className="incomeChart">
            <div className="row">
                <FilterForm
                    onSubmit={handleFormSubmit}
                    initialValues={filterInitialValues}
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
    );
}
