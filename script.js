function searchFunction() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let destinations = document.getElementsByClassName("destination");

    for (let i = 0; i < destinations.length; i++) {
        let title = destinations[i].getElementsByTagName("h3")[0];
        let text = title.textContent.toLowerCase();

        if (text.includes(input)) {
            destinations[i].style.display = "";
        } else {
            destinations[i].style.display = "none";
        }
    }
}

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");
const cards = document.querySelectorAll(".destination");

// MAIN UPDATE FUNCTION
function updateDestinations() {

    let search = searchInput.value.toLowerCase();
    let filter = filterSelect.value;

    let cardArray = Array.from(cards);

    // FILTER + SEARCH
    cardArray.forEach(card => {

        let title = card.querySelector("h3").textContent.toLowerCase();
        let type = card.getAttribute("data-type");

        let matchesSearch = title.includes(search);
        let matchesFilter = (filter === "all" || type === filter);

        if (matchesSearch && matchesFilter) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    // SORT BY PRICE
    if (sortSelect.value !== "default") {

        let container = cards[0].parentElement;

        cardArray.sort((a, b) => {

            let priceA = parseInt(a.getAttribute("data-price"));
            let priceB = parseInt(b.getAttribute("data-price"));

            return sortSelect.value === "low"
                ? priceA - priceB
                : priceB - priceA;
        });

        cardArray.forEach(card => container.appendChild(card));
    }
}


if (searchInput && filterSelect && sortSelect) {

    searchInput.addEventListener("input", updateDestinations);
    filterSelect.addEventListener("change", updateDestinations);
    sortSelect.addEventListener("change", updateDestinations);
}