import DynamicTabs from "../tab/DynamicTabs"
import IncomeChart from "./IncomeChart"
import ExpenseChart from "./ExpenseChart"
import Breadcrumbs from "../Breadcrumbs"

export default function Report(){

    const tabsData = [
        {label: "Income Chart",content: <IncomeChart/>},
        {label: "Expense Chart",content: <ExpenseChart/>},

    ]

    return(
        <div>
           <DynamicTabs tabsData={tabsData}/>
        </div>
    )

}