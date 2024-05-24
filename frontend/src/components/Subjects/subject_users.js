import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const SubjectUsers = () => {
    const [students, setStudents] = useState([]);
    const {subjectId} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/subject/users/${subjectId}`)
            .then((response) => {
                setStudents(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className={'container'}>
                <div className={'mt-5'}>
                    <table className="table table-responsive table-striped ">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roles</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.type}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubjectUsers;
