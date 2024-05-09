import React, { useState, useEffect } from "react";
import Trainer2 from "./trainer2.gif";
import Trainer3 from "./trainer3.gif";

function AboutUs(props) {
  useEffect(() => {
    document.body.style.backgroundColor = "tan"; // Set background when component mounts
    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);
  const goBack = () => {
    props.onBack();
  };

  // Sample data for students and instructors
  const courseInfo = {
    courseName: "SE/ComS319 Construction of User Interfaces, Spring 2024",
    currentDate: new Date().toLocaleDateString(), // You can format this date as needed
    students: [
      { name: "Bo Oo", email: "bhoo@iastate.edu" },
      { name: "Ponciano Ramirez", email: "pramirez4@iastate.edu" },
    ],
    instructor: [{ name: "Dr. Ali Jannesari", email: "ajannesari@isu.edu" }],
  };

  return (
    <div className="container mx-auto px-4">
      <button
        onClick={goBack}
        className="mb-4 mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Go Back
      </button>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold mb-2">{courseInfo.courseName}</h1>
        <p>Date: {courseInfo.currentDate}</p>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mt-4">Students</h2>
        {courseInfo.students.map((student) => (
          <p key={student.email} className="text-center">
            {student.name} - {student.email}
          </p>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold mt-4">Instructors</h2>
        {courseInfo.instructor.map((instructor) => (
          <p key={instructor.email} className="text-center">
            {instructor.name} - {instructor.email}
          </p>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <h3 className="text-lg font-semibold">Team Member Photos</h3>
        <div className="flex">
          <img src={Trainer2} alt="Team Member" className="w-50 h-50 rounded" />
          <img
            src={Trainer3}
            alt="Team Member2"
            className="w-50 h-50 ml-4 rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
