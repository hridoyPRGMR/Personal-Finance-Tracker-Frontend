import * as React from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoneyOffCsredIcon from '@mui/icons-material/MoneyOffCsred';

export default function Summary({summaryData}) {

    return (
        <>  
            <div className="row p-2">
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title"><AttachMoneyIcon/> Total Income</div>
                            <div className="card-text">
                                {summaryData.totalIncome}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title"><MoneyOffIcon/> Total Expense</div>
                            <div className="card-text">
                                {summaryData.totalExpense}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title"><AccountBalanceIcon/> Total Debts</div>
                            <div className="card-text">
                                Without Interest: {summaryData.totalDebtsWithoutInterest} <br/>
                                With Interest: {summaryData.totalDebtsWithInterest}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title"><MoneyOffCsredIcon/>Repayable Debt</div>
                            <div className="card-text">
                                {summaryData.payOff}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}