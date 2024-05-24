const validation = (values) => {
    let errors = {};
    if (values.name === "") {
        errors.name = "Name is required"
    } else if (values.email === "") {
        errors.email = "Email is required"
    } else if (!values.email.endsWith('@gmail.com')) {
        errors.email = "Email is invalid (should be gmail account)"
    } else if (values.password === "") {
        errors.password = "Password is required"
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters"
    }

    return errors;

}

export default validation