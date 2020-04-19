const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

// Salva preço e index do filme selecionado
function setMovieData(movieIndex, moviePrice) {
    sessionStorage.setItem('selectedMovieIndex', movieIndex);
    sessionStorage.setItem('selectedMoviePrice', moviePrice);
}

// Atualiza total e contagem
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    sessionStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Pega dados do local storage e ppopula a UI
function populateUI() {
    const selectedSeats = sessionStorage.getItem('selectedSeats');
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = sessionStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = +movieSelect.value;
    }
}

// Evento seletor de filme
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Evento de click do assento
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    } 
});


// Contagem e total inicial
updateSelectedCount();