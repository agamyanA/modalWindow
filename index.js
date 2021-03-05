let data = [
    { id: 1, title: 'Apple', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348' },
    { id: 2, title: 'Orange', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg' },
    { id: 3, title: 'Mango', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg' }
]

const priceModal = $.modal({
    title: 'Price',
    closable: true,
    width: '400px',
    footerButtons: [
        {
            text: 'OK', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})

const renderProductGrid = (data) => $.renderProductGrid(data)
renderProductGrid(data)

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    
    if (btnType === 'price') {
        const product = data.find(product => product.id === id)
        priceModal.setContent(`
            <p>Price for ${product.title}: <strong>${product.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'delete') {
        $.deleteModal({
            title: 'Delete',
            content: `<p>Are you sure?</p>`
        }).then(() => {
            data = data.filter(product => product.id !== id)
            renderProductGrid(data)
        })
    }
})