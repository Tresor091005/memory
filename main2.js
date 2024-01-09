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

    isCompleted () {
        return this.card.firstElementChild.classList.contains('card--validate')
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

    isValidate() {
        // les 2 sont ouverts
        return(this.firstElement.isOpen() && this.secondElement.isOpen())
    }

    onceOpen() {
        // au moins 1 est ouvert
        return(this.firstElement.isOpen() || this.secondElement.isOpen())
    }

    canBeClosed() {
        // 1 uniquement est ouvert
        if(!this.isValidate() && this.onceOpen()) {
            return true
        } else {
            return false
        }
    }

    isFinish() {
        return(this.firstElement.isCompleted() && this.secondElement.isCompleted())
    }

    finish(o, length) {
        this.firstElement.markFinish()
        this.secondElement.markFinish()
        if (o !== length) {
            if (o%2 === 1) {
                audio1.play()
            } else {
                audio2.play()
            }
            
        }
    }

    close() {
        audio3.play()
        setTimeout(() =>{
            this.firstElement.markClose()
            this.secondElement.markClose()
        }, 500)
    }  
}

class game {
    constructor () {
        this.symbol = ["👌", "😍", "😎", "😋", "😁"]
        this.main = createPairs(this.symbol)  // liste des pairs
        this.gameElement = createElementList(this.main) // liste des éléments de chaque pair

        this.gameElement.forEach((element) => {
            element.add()
        })
    }

    log () {
        console.log(this.main)
    }

    rule() {
        let n = 0
        let o = 0
        let cards = document.querySelectorAll('.card')

        cards.forEach((card) => {
            card.addEventListener("click", () => {
                if (!card.classList.contains('is-flipped')) {
                    card.classList.add("is-flipped")
                    n++ 
                    console.log(n)
                } else {
                    audio4.play()
                }

                if ((n%2) === 0) {
                   this.main.forEach((pair) => {
                    if (pair.isValidate() && !pair.isFinish()) {
                        o++
                        pair.finish(o, this.main.length)
                    } else if (pair.isValidate() && pair.isFinish()) {
                        //rien
                    } else if (pair.canBeClosed()) {
                        pair.close()                     
                    }
                   }) 
                }

                if (
                    this.main[0].isValidate() && this.main[1].isValidate() && this.main[2].isValidate()
                ) {
                    let temps = '19'
                    window.location.href = 'win.html?n=' + n + '&temps=' + temps
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

const audio1 = document.getElementById("instant-win1")
const audio2 = document.getElementById("instant-win2")
const audio3 = document.getElementById("instant-warn")
const audio4 = document.getElementById("instant-warn2")

let g = new game()
g.rule()