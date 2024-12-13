import { useEffect, useState } from "react";
import Api from "../../api/Api";
import Summary from "./Summary";
import { summaryFilterBy } from "../helpers/CommonData";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Home() {

    //summary
    const [summaryData, setSummaryData] = useState([]);
    const [summaryFilter, setSummaryFilter] = useState(1);

    //notification
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getSummaryData();
    }, [summaryFilter]);

    useEffect(() => {
        getNotification();
    }, [])


    //summary api
    const getSummaryData = () => {
        Api.get(`/home/summary?filterby=${summaryFilter}`)
            .then(response => {
                // console.log(response);
                setSummaryData(response);
            })
            .catch(error => {
                console.log(error);
            })
    }



    const getNotification = () => {
        Api.get("/notification")
            .then(response => {
                setNotifications(response);
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <>
            <div className="summary my-2">
                <div className="d-flex justify-content-end mx-2">
                    <select
                        onChange={(e) => { setSummaryFilter(e.target.value) }}
                        style={{ maxWidth: "150px" }}
                        name="" id=""
                        className="form-select">
                        {Array.from(summaryFilterBy).map(([key, val]) => (
                            <option key={key} value={key}>{val}</option>
                        ))}
                    </select>
                </div>
                <Summary
                    summaryData={summaryData}
                />
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card mx-2">
                        <div className="card-header"><NotificationsNoneIcon/> Notifications</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <li key={index} className="list-group-item">
                                            {notification.message}
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item text-muted">No notifications</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">

                </div>
            </div>
        </>
    )

}