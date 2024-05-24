import React from 'react';
import {Outlet, NavLink} from "react-router-dom";
import Subjects from "../../Subjects/subjects";

const TeacherHome = () => {
    return (
        <div>
           <Subjects />
        </div>
    );
};

export default TeacherHome;