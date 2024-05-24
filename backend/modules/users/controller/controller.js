const {validationResult} = require('express-validator');
const {addSubjectInput} = require("../input/add_subject_input");
const {addSubject , getSubjects , getUsers} = require("../services/service");
const {v4: uuidv4} = require('uuid');
const db = require("../../../db");


const addSubjectUsingPost = async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
       return res.status(422).json(
        {
            result:errors
        }
       )
    }
    const name = req.body.name;
    const userId = uuidv4();
    // console.log(userId)
    let subject = new addSubjectInput(userId,name);
    const added =   await addSubject(subject);
    res.json(
        {
            result:added
        }
    )

}

const getAllSubjects = async (req,res)=> {

    const {userId} = req.params;
    // console.log(userId)
    const subjects = await getSubjects(userId);

    res.json(
        {
            result:subjects
        }
    )
}

const getAllUsersInSubject = async (req,res)=>{
    const subjectId = req.params.subjectId;

let students = await getUsers(subjectId);

    res.json(
        {
            result:students
        }
    )
}

module.exports={
    addSubjectUsingPost , getAllSubjects , getAllUsersInSubject
}
