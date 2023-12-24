class cardElement {
    constructor(name) {
        const newCard = document.createElement("div")
        newCard.innerHTML = 
        `
        <div class="card">
            <div class="card_face card_face--front"></div>
            <div class="card_face card_face--back">${name}</div>
        </div>
        `
        newCard.classList.add("scene", "scene--card")

        this.card = newCard
    }

    add() {
        document.querySelector(".game").append(this.card)
    }

    isOpen() {
        return this.card.firstElementChild.classList.contains('is-flipped')
    }
}

class cardPair {
    constructor (name) {
        this.firstElement = new cardElement(name)
        this.secondElement = new cardElement(name)
    }

    addPair() {
        this.firstElement.add()
        this.secondElement.add()
    }

    isValidate() {
        console.log(this.firstElement.isOpen() && this.secondElement.isOpen())
        return(this.firstElement.isOpen() && this.secondElement.isOpen())
    }

    
}
class game {
    constructor () {
        this.symbol = ["👌", "😍", "😎", "😋", "😁"]
        this.main = createPairs(this.symbol)

        this.main.forEach((pair) => {
            pair.addPair()
        })
        
        let cards = document.querySelectorAll('.card');
        
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                card.classList.toggle("is-flipped");
            });
        });
        
        document.querySelector('body').addEventListener('click', () => {
            this.main[0].isValidate()
        })
    }

    log () {
        console.log(this.main)
    }
}

function randomElement(array) {
    // renvoie un élément aléatoire d'un tableau
    const randomClue = Math.floor(Math.random() * array.length)
    return array[randomClue]
}

function createPairs(symbole) {
    // Crée le tableau principal contenant les pairs
    mainArray = []
    alreadyUsed = []
    do {
        let element = randomElement(symbole)
        if (!alreadyUsed.includes(element)) {
            mainArray.push(new cardPair(element))
            alreadyUsed.push(element)
        }
    } while (mainArray.length < 3)

    return mainArray
}

let g = new game()


/*
let pair1 = new cardPair("1")
let pair2 = new cardPair("2")
let pair3 = new cardPair("3")

allPairs = [pair1, pair2, pair3]

allPairs.forEach((pair) => {
    pair.addPair()
})

let cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("is-flipped");
    });
});

document.querySelector('body').addEventListener('click', () => {
    pair1.isValidate()
})

*/