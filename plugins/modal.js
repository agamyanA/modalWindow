function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const button = document.createElement('button')
        button.textContent = btn.text
        button.classList.add('btn')
        button.classList.add(`btn-${btn.type || 'secondary'}`)
        button.onclick = btn.handler || noop

        wrap.appendChild(button)
    })

    return wrap
}

function _creatCard(options) {
    const DEFAULT_HEIGHT = '450px'
    const productGrid = document.createElement('section')
    productGrid.classList.add('productGrid')
    document.body.appendChild(productGrid)

    for (let i = 0; i < options.length; i++) {

        const card = document.createElement('div')
        card.classList.add('row')
        document.body.appendChild(card)

        for (let j = 0; j < options[i].length; j++) {
            card.insertAdjacentHTML('afterbegin', `
            <div class="col">
                <div class="container">
                    <div class="card" style="height: ${DEFAULT_HEIGHT}">
                        <img src="${options[i][j].img}" class="card-img-top" style="height: 270px">
                        <div class="card-body">
                        <h5 class="card-title">${options[i][j].title}</h5>
                        <p class="card-text">${options[i][j].price}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>        
            </div>
    `)     
        }  
    
        productGrid.appendChild(card)
    }
    
    return productGrid
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'window'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    modal.querySelector('[data-content]').after(footer)
    document.body.appendChild(modal)
    return modal
}

$.card = function (options) {
    _creatCard(options) 
}

$.modal = function (options) {
    const ANIMATION_SPEED = 200
    const modal = _createModal(options)
    let closing = false
    let destroyed = false

    const $modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed');
            }
            !closing && modal.classList.add('open')
        },

        close() {
            closing = true
            modal.classList.remove('open')
            modal.classList.add('hide')
            setTimeout(() => {
                modal.classList.remove('hide')
            }, ANIMATION_SPEED)
            closing = false
        }
    }

    const listener = event => {
        if (event.target.dataset.close) {
            $modal.close()
        }
    }

    modal.addEventListener('click', listener)

    return Object.assign($modal, {
        destroy() {
            modal.remove()
            destroyed = true
        },
        setContent(html) {
            modal.querySelector('[data-content]').innerHTML = html
        }
    })
}