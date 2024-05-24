import React, {useEffect, useState} from 'react';
import {useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubjectExams = () => {
const navigate = useNavigate()
    const [exams, setExams] = useState([]);
    const {subjectId} = useParams();


    useEffect(() => {
        axios.get(`http://localhost:5000/quizzes/${subjectId}`)
            .then((response) => {
                console.log(response)
                setExams(response.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [subjectId]);


    const enterQuiz = (quizId) => {
        // console.log(quizId)
        navigate(`/student/enterQuiz/${quizId}`)
    }



    return (
        <div>
            <div className={'container'}>
                <div style={{marginTop: '50px'}}>

                    <div className="row">
                        {exams.map((exam, index) => (
                            <div
                                className={'col-12 col-sm-6 col-md-4 mt-2 '}
                                key={exam.id}
onClick={()=> enterQuiz(exam.id)}
                            >
                                <Card style={{cursor: 'pointer'}}>
                                    <Card.Img variant="top" src={'../../images/exam.png'} alt={'avatar'}/>
                                    <Card.Body>
                                        <Card.Title>
                                            <div className={'row'}>
                                                <div className={'col-6'}>
                                                    {exam.title}
                                                </div>
                                                <div className={'col-6 text-end'}>
                                                    {exam.start_time} - {exam.end_time}
                                                </div>
                                            </div>

                                        </Card.Title>
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

export default SubjectExams;