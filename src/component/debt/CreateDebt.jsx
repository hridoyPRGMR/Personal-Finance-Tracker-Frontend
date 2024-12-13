import Api from "../../api/Api";
import DebtForm from "./DebtForm";


export default function CreateDebt(){

    const initialValues = {
        debtType:'',
        creditor:'',
        outstandingBalance:'',
        borrowingDate:'',
        loanTenure:'',
        interestRate:'',
        interestType:'',
        installmentType:'',
        day:'',
        date:'',
        month:'',
        minimumPayment:'',
        note:''
    }

    const onSubmit = (values,{resetForm}) =>{
       Api.post("/debt",values)
        .then(response=>{
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
    }


    return (
        <>
           <div className="card">
                <div className="card-header">
                    Create Debt
                </div>
                <div className="card-body">
                    <DebtForm
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        mode='create'
                    />
                </div>
           </div>
        </>
    )

}