import "../modal/register-product-modal.js"

function loadSearchInput() {
    fetch('./components/buttons/searchInputAndButton.html')
        .then(response => response.text())
        .then(html => {
            const modalContainer = document.getElementById('search-container');
            modalContainer.innerHTML = html;
        })
}

loadSearchInput();
