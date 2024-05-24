import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../login/login";
import Register from "../register/register";
import Subjects from "../Subjects/subjects";
import TeacherHome from "../Teacher/Home/teacher_home";
import StudentHome from "../Student/Home/student_home";
import SubjectUsers from "../Subjects/subject_users";
import Exams from "../Teacher/exams/exams";
import StudentExams from "../Student/exam/student_exams";
import EnterQuiz from "../Student/enterQuiz/enterQuiz";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path={'/subjects'} element={<Subjects/>}/>
                <Route path={'/teacher/home'} element={<TeacherHome/>}/>
                <Route path={'/student/home'} element={<StudentHome/>}/>
                <Route path={'/subject/users/:subjectId'} element={<SubjectUsers/>}/>
                <Route path={'/teacher/exams/:subjectId'} element={<Exams/>}/>
                <Route path={'/student/exams/:subjectId'} element={<StudentExams/>}/>
                <Route path={'/student/enterQuiz/:quizId'} element={<EnterQuiz/>}/>



            </Routes>
        </div>
    );
};

export default Router;