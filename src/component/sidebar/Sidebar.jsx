import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { SidebarData } from './SidebarData';
import { useAuth } from '../../security/AuthContext';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Sidebar() {
  
  const authContext = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();

    await authContext.logout();
}
  
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={`d-flex rowLi ${location.pathname === val.link ? 'active' : ''}`}
              onClick={() => navigate(val.link)} // Use navigate hook instead of window.location
            >
              <div className="icon">{val.icon}</div>
              <div className="title">{val.title}</div>
            </li>
          );
        })}
        <li
              className={`d-flex rowLi`}
              onClick={handleLogout}
            >
              <div className="icon"><LogoutOutlinedIcon/></div>
              <div className="title">Logout</div>
        </li>
      </ul>
      
    </div>
  );
}

export default Sidebar;
