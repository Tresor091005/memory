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

    add () {
        document.querySelector(".game").append(this.card)
    }

    isOpen () {
        return this.card.firstElementChild.classList.contains('is-flipped')
    }

    markFinish () {
        this.card.firstElementChild.classList.add('card--validate')
    }

    markClose () {
        this.card.firstElementChild.classList.remove('is-flipped')
    }
}

class cardPair {
    constructor (name) {
        this.firstElement = new cardElement(name)
        this.secondElement = new cardElement(name)
        this.elementList = [this.firstElement, this.secondElement]
    }

    List() {
        return this.elementList
    }

    finish() {
        this.firstElement.markFinish()
        this.secondElement.markFinish()
    }

    close() {
        this.firstElement.markClose()
        this.secondElement.markClose()
    } 

    isValidate() {
        return(this.firstElement.isOpen() && this.secondElement.isOpen())
    }

    
}

class game {
    constructor () {
        this.symbol = ["👌", "😍", "😎", "😋", "😁"]
        this.main = createPairs(this.symbol)  // liste des pairs
        this.gameElement = createElementList(this.main) // liste des éléments de chaque pair

        /* this.main.forEach((pair) => {
            pair.addPair()
        }) */

        this.gameElement.forEach((element) => {
            element.add()
        })
        
        /* document.querySelector('body').addEventListener('click', () => {
            this.main[0].isValidate()
        }) */
    }

    log () {
        console.log(this.main)
    }

    rule() {
        let n = 0
        let cards = document.querySelectorAll('.card');

        cards.forEach((card) => {
            card.addEventListener("click", () => {
                if (!card.classList.contains('is-flipped')) {
                    card.classList.add("is-flipped");
                    n++ 
                    console.log(n)
                }

                if ((n%2) === 0) {
                   this.main.forEach((pair) => {
                    if (pair.isValidate()) {
                        pair.finish()
                    } else {
                        setTimeout(() =>{
                            pair.close()
                        }, 500)
                    }
                   }) 
                }

                if (
                    this.main[0].isValidate() && this.main[1].isValidate() && this.main[2].isValidate()
                ) {
                   console.log('fini')
                }
            });
        });
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

function createElementList(mainList) {
    mainArray = []
    alreadyUsed = []
    do {
        let element = randomElement(randomElement(mainList).List())
        if (!alreadyUsed.includes(element)) {
            mainArray.push(element)
            alreadyUsed.push(element)
        }
    } while (mainArray.length < (mainList.length*2))

    return mainArray
}

let g = new game()
g.rule()


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