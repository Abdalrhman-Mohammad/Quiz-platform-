import React, {useState} from 'react';
import SubjectExams from "../../Subjects/subject_exams";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";

const Exams = () => {
    const {subjectId} = useParams();
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        subjectId: subjectId,
        title: '',
        start_time: '',
        end_time: '',
        questions: [
            {
                text: '',
                type: 'multiple-choice',
                correct_answer: 0,
                answers: [{content: ''}, {content: ''}, {content: ''}, {content: ''}]
            }
        ]
    });

    const toggleModal = () => {
        setShow(!show);
    }

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index][field] = value;
        setFormData({
            ...formData,
            questions: updatedQuestions
        });
    };

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].answers[answerIndex].content = value;
        setFormData({
            ...formData,
            questions: updatedQuestions
        });
    };


    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [
                ...formData.questions,
                {
                    text: '',
                    type: 'multiple-choice',
                    correct_answer: 0,
                    answers: [{content: ''}, {content: ''}, {content: ''}, {content: ''}]
                }
            ]
        });
    };
    const handleCorrectAnswerChange = (questionIndex, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].correct_answer = value;
        setFormData({
            ...formData,
            questions: updatedQuestions
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/quiz/`, formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <div className={'container'}>

            <div className="row mt-4" dir={'rtl'}>
                <button className="btn btn-success col-3 col-md-2" onClick={toggleModal}> Add Exam</button>
            </div>

            <div>
                <Modal show={show} onHide={toggleModal} dialogClassName="modal-fullscreen">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <form>

                            <div className={'row'}>
                                <div className={'col-12 col-md-3'}>
                                    <label className={'form-label'}>exam title</label>
                                    <input className={'form-control'}
                                           onChange={(e) => setFormData({...formData, title: e.target.value})}
                                           required/>
                                </div>

                                <div className={'col-12 col-md-3'}>
                                    <label className={'form-label'}>start time</label>
                                    <input className={'form-control'} type={'text'}
                                           onChange={(e) => setFormData({
                                               ...formData,
                                               start_time: e.target.value
                                           })} required/>
                                </div>
                                <div className={'col-12 col-md-3'}>
                                    <label className={'form-label'}>end time</label>
                                    <input className={'form-control'} type={'text'}
                                           onChange={(e) => setFormData({
                                               ...formData,
                                               end_time: e.target.value
                                           })} required/>
                                </div>
                            </div>

                            {formData.questions.map((question, qIndex) => (
                                <div key={qIndex}>
                                    <div className="mb-3">
                                        <Form.Label>{`Question ${qIndex + 1}`}</Form.Label>
                                        <Form.Control type="text" value={question.text}
                                                      onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                                                      required/>
                                    </div>
                                    {/* Form fields for answers */}
                                    {question.answers.map((answer, aIndex) => (
                                        <div key={aIndex} className="mb-2">
                                            <Form.Label>{`Answer ${aIndex + 1}:`}</Form.Label>
                                            <Form.Control type="text" value={answer.content}
                                                          onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                                          required/>
                                        </div>
                                    ))}
                                    {/* Select for correct answer */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select Correct Answer</Form.Label>
                                        <Form.Control as="select" value={question.correct_answer}
                                                      onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                                                      required>
                                            {question.answers.map((_, aIndex) => (
                                                <option key={aIndex}
                                                        value={aIndex}>{`Answer ${aIndex + 1}`}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            ))}
                            {/* Button to add more questions */}
                            <Button variant="secondary" onClick={addQuestion}>Add Question</Button>

                            <Button variant="primary float-end" type="submit"
                                    onClick={handleSubmit}>Submit</Button>

                        </form>
                    </Modal.Body>
                </Modal>
            </div>

            <SubjectExams />
        </div>
    );
};

export default Exams;