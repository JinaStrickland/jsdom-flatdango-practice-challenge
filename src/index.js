const url = "http://localhost:3000/films/"
const filmsDiv = () => document.querySelector("#films")
const posterDiv = () => document.querySelector("#poster")
const showingDiv = () => document.querySelector("#showing")

document.addEventListener("DOMContentLoaded", () => {
    fetchFilm()
})

function fetchFilm() {
    fetch(url + "1")
    .then(res => res.json())
    .then(film => displayFilm(film))
}

function displayFilm(film) {
    const filmDiv = document.querySelector("div.card")
    const filmTitle = document.querySelector("#title")
        filmTitle.innerText = film.title
    const filmRuntime = document.querySelector("#runtime")
        filmRuntime.innerText = film.runtime
    const filmInfo = document.querySelector("#film-info")
        filmInfo.innerText = film.description
    const filmShowtime = document.querySelector("#showtime")
        filmShowtime.innerText = film.showtime
    const filmTicketsold = document.querySelector("#ticket-num")
        filmTicketsold.innerText = film.capacity - film.tickets_sold
    
    const buyButton = document.querySelector("div.ui.orange.button")
        buyButton.addEventListener("click", () => {
                if((film.capacity - film.tickets_sold) > 0) {
                    fetch(url + film.id, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify({
                            tickets_sold: --film.tickets_sold
                        })
                    })
                    .then(res => res.json())
                    .then(updatedTicket => {
                        film = updatedTicket
                        filmTicketsold.innerText = updatedTicket.capacity - updatedTicket.tickets_sold
                    })
                } else {
                    return console.log("Tickets are sold out")
                }
        })

    const divFilm = document.querySelector("div.film.item")
        divFilm.innerText = film.title

}



{/* <div class="ui divided list" id="films">
<div class="film item">
  Don't worry about this div until you've completed the base deliverables.
</div>
<div class="film item">
  Movie titles will go here.
</div>
</div> */}