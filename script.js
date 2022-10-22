let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; //The elements which will be used in the game

let positionPossibities = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] // Position possibilities to be used in the distribution of the ramdom numbers

const btns = document.querySelectorAll('.btn'); //Select all buttons
var y = 16, // initial numbers length
    x = 16; // initial positionPossibilities length

    let revealedCard = 0; //parameter to know how many card are showing

//Card position by id
let positions = {
    id1: '?',
    id2: '?',
    id3: '?',
    id4: '?',
    id5: '?',
    id6: '?',
    id7: '?',
    id8: '?',
    id9: '?',
    id10: '?',
    id11: '?',
    id12: '?',
    id13: '?',
    id14: '?',
    id15: '?',
    id16: '?',
}

// Arrays that will save the numbers that was clicked
let lastNumbersReveald = [];
let lastIds = [];

let points = 0;

//Distributes ramdom numbers to each card
function numbersDistributor() {
    for(var i = 0; i < 16; i++) {
        let n = Math.floor(Math.random()*x);
        let position = 'id'+ positionPossibities[n];
        let m = Math.floor(Math.random()*y);
        positions[position] = numbers[m]
        positionPossibities.splice(n, 1);
        numbers.splice(m, 1);
        y--;
        x--
    } 
};
numbersDistributor();



// Functions that will work to each card
Array.from(btns).forEach(number => {

    // Click event
    number.addEventListener("click", function() {
        
        //Hide the card
        revealedCard++;
        if(revealedCard === 3) {
            Array.from(btns).forEach(el => {
                if(el.className === 'btn'){
                    el.innerHTML = "?"
                }
            });
            revealedCard = 1;
        }

        //Show the card
        let cardId = 'id' + this.id;
        document.getElementById(this.id).innerHTML = positions[cardId];

        lastNumbersReveald.push(positions[cardId]);
        lastIds.push(this.id);

        // Check if the two last numbers are the same
        if(lastNumbersReveald.length === 2) {
            if(lastNumbersReveald[0] === lastNumbersReveald[1]) {
                document.getElementById(lastIds[0]).className = 'used';
                document.getElementById(lastIds[1]).className = 'used';
                document.getElementById(lastIds[0]).disabled = 'true'
                document.getElementById(lastIds[1]).disabled = 'true'

                points++;
                console.log(points);
            }
            lastIds = []; // Return to the original valor
            lastNumbersReveald = [];
        }

        // Win conditional
        if(points === 8) {
            document.getElementById('win-modal').style.display = 'grid'
            document.getElementById('modal-background').style.display = 'inherit'
        }
    })
    
})
