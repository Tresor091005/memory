let cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("is-flipped");
    });
});


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
        document.querySelector(".game").prepend(this.card)
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
}