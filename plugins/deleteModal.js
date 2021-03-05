$.deleteModal = function (options) {
    return new Promise ((resolve, reject) => {
        const modal = $.modal({
            title: options.title ,
            closable: false,
            width: '400px',
            content: options.content,
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {
                    text: 'yes', type: 'danger', handler() {
                        modal.close()
                        resolve()
                    }
                },
                {
                    text: 'cancel', type: 'secondary', handler() {
                        modal.close()
                        reject()
                    }
                }
            ]
        })

        setTimeout(() => modal.open(), 100) 
    })
}