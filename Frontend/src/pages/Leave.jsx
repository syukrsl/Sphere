import React, { useState } from 'react';
import './Leave.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

function Leave() {
  const [activeTab, setActiveTab] = useState('ApplyLeave');

  const handleTabChange = (tab) => {
    console.log("Changing to tab: ", tab); // For debugging
    setActiveTab(tab);
  };

  const renderApplyLeave = () => {
    return (
      <form className="apply-leave-form">
        <div className="form-group">
          <label>Leave type:</label>
          <select>
            <option>Annual Leave</option>
            <option>Hospitalisation Leave</option>
            <option>Medical Leave</option>
            <option>Childcare Leave</option>
            <option>No-Pay Leave</option>
          </select>
        </div>

        <div className="form-group">
          <label>From Date:</label>
          <DatePicker className="date-picker" />
        </div>

        <div className="form-group">
          <label>To Date:</label>
          <DatePicker className="date-picker" />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select>
            <option>Full-day</option>
            <option>Half-day</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Document (optional):</label>
          <input type="file" />
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  };

  const renderLeaveStatus = () => {
    return (
      <div>
        <div className="year-selector">
          <label>Select year:</label>
          <select>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <button type="button">Go</button>
        </div>

        <table className="status-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee (name)</th>
              <th>Leave Type</th>
              <th>Leave Period</th>
              <th>Leave Status</th>
              <th>No. of Days Applied</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123456</td>
              <td>Syukri</td>
              <td>Annual Leave</td>
              <td>2023-01-01 to 2023-01-10</td>
              <td>Approved</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderLeaveBalance = () => {
    return (
      <div>
        <div className="year-selector">
          <label>Select year:</label>
          <select>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
          <button type="button">Go</button>
        </div>

        <table className="balance-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee (name)</th>
              <th>Annual</th>
              <th>Hospitalisation</th>
              <th>Medical</th>
              <th>Childcare</th>
              <th>No-Pay</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123456</td>
              <td>Syukri</td>
              <td>10 days</td>
              <td>5 days</td>
              <td>8 days</td>
              <td>12 days</td>
              <td>0 days</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="leave-container">
      <h1 className="leave-header">
      <FontAwesomeIcon icon={faCalendarAlt} flip size="xs" className='leave-icon'/>
      Leave Management
      </h1>
      <div className="tabs">
        <label className={`tab ${activeTab === 'ApplyLeave' ? 'active' : ''}`} onClick={() => handleTabChange('ApplyLeave')}>Apply Leave</label>
        <label className={`tab ${activeTab === 'LeaveStatus' ? 'active' : ''}`} onClick={() => handleTabChange('LeaveStatus')}>Leave Status</label>
        <label className={`tab ${activeTab === 'LeaveBalance' ? 'active' : ''}`} onClick={() => handleTabChange('LeaveBalance')}>Leave Balance</label>
      </div>
      <div className="panels">
        <div className={`panel ${activeTab === 'ApplyLeave' ? 'active' : ''}`}>
          {activeTab === 'ApplyLeave' && renderApplyLeave()}
        </div>
        <div className={`panel leave-status-panel ${activeTab === 'LeaveStatus' ? 'active' : ''}`}>
          {activeTab === 'LeaveStatus' && renderLeaveStatus()}
        </div>
        <div className={`panel leave-balance-panel ${activeTab === 'LeaveBalance' ? 'active' : ''}`}>
          {activeTab === 'LeaveBalance' && renderLeaveBalance()}
        </div>
      </div>
    </div>
  );
}

export default Leave;
