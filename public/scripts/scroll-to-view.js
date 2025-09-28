const buttons = document.getElementsByTagName('button');

// Uses shorthand for loop to iterate over button tag elements, in this case only 1 is present. Help from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
for (button of buttons) {
    
    // Listens for a click and runs function
    button.addEventListener('click', () => {
        console.log('clicked');

        // Gets all cards and chooses the first card template instance
        const targetCard = document.querySelectorAll('.card');
        const targetPoint = targetCard[1];

        // Action refered to from: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView 
        targetPoint.scrollIntoView({behavior: 'smooth', block:  'center', inline: 'center'});
    });
}