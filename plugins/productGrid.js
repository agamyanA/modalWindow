const toHTML = fruit => `
    <div class="card-container" data-price>
        <div class="card">
            <img src="${fruit.img}" class="card-img-top" style="height: 270px">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <button class="btn btn-primary" data-btn="price" data-id="${fruit.id}">see price</button>
                <button class="btn btn-danger" data-btn="delete" data-id="${fruit.id}">delete</button>
            </div>
        </div>
    </div>    
`


function _creatProductGrid(data) {

    const productGrid = document.querySelector('.productGrid')

    const html = data.map(toHTML).join('')
    productGrid.innerHTML = html
}

$.renderProductGrid = function (data) {
    _creatProductGrid(data)
}