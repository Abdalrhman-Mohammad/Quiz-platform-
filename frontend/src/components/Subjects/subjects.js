import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";


const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        axios.get(`http://localhost:5000/subjects/${userId}`)
            .then((response) => {
                console.log(response)
                setSubjects(response.data.result);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const handleSubjectClick = (subjectId) => {
        if (localStorage.getItem("type") === "student") {
            navigate(`/student/exams/${subjectId}`);
        }
        else
        navigate(`/teacher/exams/${subjectId}`);
        // navigate(`/subject/users/${subjectId}`);
    };


    return (
        <div>
            <div className={'container'}>
                <div style={{marginTop: '50px'}}>
                    <div className="row">
                        {subjects.map((subject, index) => (
                            <div
                                className={'col-12 col-sm-6 col-md-4 mt-2 '}
                                 key={subject.id}
                                onClick={() => handleSubjectClick(subject.id)}
                            >
                                <Card style={{cursor: 'pointer'}}>
                                    <Card.Img variant="top" src={'../../../images/SubjectCardImg.png'} alt={'avatar'}/>
                                    <Card.Body>
                                        <Card.Title>{subject.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                                {(index + 1) % 3 === 0 && <div className="w-100"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Subjects;