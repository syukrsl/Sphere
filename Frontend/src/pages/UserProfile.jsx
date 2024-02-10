import React, { useState } from "react";
import "./UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function UserProfile() {
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState("John Doe");
  const [role, setRole] = useState("Employee");
  const [email, setEmail] = useState("john.doe@example.com");
  const [contactNumber, setContactNumber] = useState("123456789");
  const [dateOfBirth, setDateOfBirth] = useState("06 Feb 2022");
  const [address, setAddress] = useState("Tampines St");
  const [employeeId, setEmployeeId] = useState("00399");
  const [photoUrl, setPhotoUrl] = useState("");
  const [nameBackup, setNameBackup] = useState("");
  const [roleBackup, setRoleBackup] = useState("");
  const [emailBackup, setEmailBackup] = useState("");
  const [contactNumberBackup, setContactNumberBackup] = useState("");
  const [dateOfBirthBackup, setDateOfBirthBackup] = useState("");
  const [addressBackup, setAddressBackup] = useState("");
  const [employeeIdBackup, setEmployeeIdBackup] = useState("");


  const toggleEdit = () => {
    if (isEditable) {
      setName(nameBackup);
      setRole(roleBackup);
      setEmployeeId(employeeIdBackup);
      setEmail(emailBackup);
      setContactNumber(contactNumberBackup);
      setDateOfBirth(dateOfBirthBackup);
      setAddress(addressBackup);
     
    } else {
      setNameBackup(name);
      setRoleBackup(role);
      setEmployeeId(employeeId);
      setEmailBackup(email);
      setContactNumberBackup(contactNumber);
      setDateOfBirthBackup(dateOfBirth);
      setAddress(address);
    }

    setIsEditable((prevIsEditable) => !prevIsEditable);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPhotoUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    setNameBackup(name);
    setRoleBackup(role);
    setEmailBackup(email);
    setContactNumberBackup(contactNumber);
    setDateOfBirthBackup(dateOfBirth);
    setAddressBackup(address);
    setEmployeeIdBackup(employeeId);

    setIsEditable(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
      <FontAwesomeIcon icon={faUser} flip size="2xl" />
      <h1 className="profile-title">User Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-photo">
          <div className="photo-box">
            {photoUrl ? (
              <img src={photoUrl} alt="User" />
            ) : (
              <div className="photo-placeholder">
                {isEditable ? (
                  <>
                    <label htmlFor="photo-upload" className="photo-upload-label">
                      Upload your photo
                    </label>
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="photo-upload"
                    />
                  </>
                ) : (
                  "Upload your photo here"
                )}
              </div>
            )}
          </div>
        </div>
        <div className="profile-details">
          <div className="detail">
            <label>Name: </label>
            {isEditable ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{name}</span>
            )}
          </div>
          <div className="detail">
            <label>Role/Position: </label>
            {isEditable ? (
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{role}</span>
            )}
          </div>
          <div className="detail">
            <label>Employee ID: </label>
            {isEditable ? (
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{employeeId}</span>
            )}
          </div>
          <div className="detail">
            <label>Email: </label>
            {isEditable ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{email}</span>
            )}
          </div>
          <div className="detail">
            <label>Contact Number: </label>
            {isEditable ? (
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{contactNumber}</span>
            )}
          </div>
          <div className="detail">
            <label>Date of Birth: </label>
            {isEditable ? (
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{dateOfBirth}</span>
            )}
          </div>
          <div className="detail">
            <label>Address: </label>
            {isEditable ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{address}</span>
            )}
          </div>
          
        </div>
      </div>
      <div className="profile-actions">
        {isEditable ? (
          <>
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={toggleEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={toggleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
