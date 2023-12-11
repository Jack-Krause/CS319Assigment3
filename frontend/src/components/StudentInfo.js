import React from "react";

const StudentInfoView = () => {
  return (
    <div className="parent-container">
      {/* Container for the information display */}
      <div className="container">
        <p>
          <strong>Course:</strong> SE/ComS319 Construction of User Interfaces,
          Fall 2023
        </p>
        <p>
          <strong>Date:</strong> December 13, 2023
        </p>
        <p>
          <strong>Professor:</strong> Dr. Abraham N. Aldaco Gastelum <br />
          <strong>Email:</strong> aaldaco@iastate.edu
        </p>
        <p>
          <strong>Name:</strong> Jack Krause <br />
          <strong>Email:</strong> jmkrause@iastate.edu
        </p>
        <p>
          <strong>Name:</strong> Jagger Gourley <br />
          <strong>Email:</strong> gourley@iastate.edu
        </p>
      </div>
    </div>
  );
};

export default StudentInfoView;