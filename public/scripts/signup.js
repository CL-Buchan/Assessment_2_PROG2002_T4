// Declare constant variables
const form = document.querySelector('.signup');
const firstName = document.getElementsByName('first-name')[0];
const lastName = document.getElementsByName('last-name')[0];
const email = document.getElementsByName('email')[0];
const err = document.querySelector('.err-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const signUp = () => {

        // Checks for if the variables have values
        if (firstName.value == '' && lastName.value == '' && email.value == '') {
            err.style.color = 'red';
            err.innerHTML = 'Enter valid values in input boxes.';
            return;
        }

        // Make structure for new signup
        const newPerson = {
            fname: firstName.value,
            lname: lastName.value,
            email: email.value
        };
    
        // Add newPerson object to people array
        people.push(newPerson);

        err.style.color = 'green';
        err.innerHTML = `Signup Sucessful! Thankyou for signing up ${firstName.value}!`;

        // Reset form
        firstName.value = '';
        lastName.value = '';
        email.value = '';
    }

    signUp();
});