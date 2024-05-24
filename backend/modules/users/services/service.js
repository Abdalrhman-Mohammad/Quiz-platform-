const db = require('../../../db');
const addSubject = async (subject) => {
    const result = db.query(
        'INSERT into Subject(id,name) values (?,?)', [subject.id, subject.name]);

    return "subject added successfully";
};


const getSubjects = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT subject.name , subject.id FROM subject INNER JOIN user_subject ON subject.id = user_subject.subject_id WHERE user_subject.user_id = ?',
            [userId],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

const getUsers = (subjectId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT user.name, user.id ,user.type FROM user INNER JOIN user_subject ON user.id = user_subject.user_id WHERE user_subject.subject_id = ? ',
            [subjectId],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });

};
module.exports = {
    addSubject, getSubjects , getUsers
}