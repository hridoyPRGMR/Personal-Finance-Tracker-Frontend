import Sidebar from "../sidebar/Sidebar";

export default function MainLayout({children}){

    return(
        <div className="AppLayout">
            <Sidebar/>
            <div className="MainContent">
                {children}
            </div>
        </div>
    )

}