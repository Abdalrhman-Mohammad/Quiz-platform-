import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const EnterQuiz = () => {
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        // Fetch quiz data from the backend API
        axios.get(`http://localhost:5000/quiz/${quizId}`)
            .then(response => {
                setQuizData(response.data.result);
            })
            .catch(error => {
                console.error('Error fetching quiz data:', error);
            });
    }, [quizId]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer('');
        } else {
            setShowResult(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
            setSelectedAnswer('');
        }
    };

    const handleSelectAnswer = (answerId) => {
        setSelectedAnswer(answerId);
    };

    const submitQuiz = () => {
        // Logic to submit quiz answers
        console.log('Submitted quiz answers:', selectedAnswer);
    };

    return (
        <div className='container'>
            {quizData && !showResult && (
                <div>
                    <h2>{quizData.quizTitle} exam</h2>
                    <p>Question {currentQuestionIndex + 1} of {quizData.questions.length}</p>
                    <Card>
                        <Card.Body>
                            <Card.Title>q{currentQuestionIndex + 1} : {quizData.questions[currentQuestionIndex].questionText}</Card.Title>
                            <ul className="list-unstyled">
                                {quizData.questions[currentQuestionIndex].answers.map(answer => (
                                    <li key={answer.answerId}>
                                        <label className={'form-label'}>
                                            <input
                                                className={'form-check-input me-2'}
                                                type="radio"
                                                name="answer"
                                                value={answer.answerId}
                                                checked={selectedAnswer === answer.answerId}
                                                onChange={() => handleSelectAnswer(answer.answerId)}
                                            />
                                            {answer.answerText}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                    <div className="mt-3">
                        <Button variant="secondary me-2" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                        {currentQuestionIndex === quizData.questions.length - 1 ? (
                            <Button variant="primary float-end" onClick={submitQuiz}>Submit</Button>
                        ) : (
                            <Button variant="primary float-end" onClick={handleNextQuestion}>Next</Button>
                        )}
                    </div>
                </div>
            )}
            {showResult && (
                <div>
                    <h2>Quiz Result</h2>
                    <Button variant="primary" onClick={submitQuiz}>Submit</Button>
                </div>
            )}
        </div>
    );
};

export default EnterQuiz;
