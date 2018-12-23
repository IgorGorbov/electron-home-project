exports.toReadItems = JSON.parse(localStorage.getItem('toReadItems')) || []

exports.saveItems = () => {
    localStorage.setItem('toReadItems', JSON.stringify(this.toReadItems))
}

exports.selectItem = e => {
    $('.read-item').removeClass('is-active')
    $(e.currentTarget).addClass('is-active')
}
exports.changeItem = direction => {
    let activeItem = $('.read-item.is-active')

    let newItem = direction === 'down' ? activeItem.next('.read-item') : activeItem.prev('.read-item')

    if (newItem.length) {
        activeItem.removeClass('is-active')
        newItem.addClass('is-active')
    }
}

window.openItem = item => {
    if (!this.toReadItems.length) return

    let targetItem = $('.read-item.is-active')
    let contentURL = encodeURIComponent(targetItem.data('url'))

    let itemIndex = targetItem.index() - 1

    let renderWinURL =`file://${__dirname}/render.html?url=${contentURL}&itemIndex=${itemIndex}`
    let renderWin = window.open(renderWinURL, targetItem.data('title'))
}    



exports.addItem = item => {
    $('#no-items').hide()
    
    let itemHTML = `
        <a class="panel-block read-item" data-title="${item.title}" data-url="${item.url}"> 
            <figure class="image has-shadow is-64x64 thumb">
                <img src="${item.screenshot}">
            </figure>
            <h2 class="title is-10 is-size-4 column">${item.title}</h2>
        </a>
    `

    $('#read-list').append(itemHTML)

    $('.read-item')
        .off('click', 'dblclick')
        .on('click', this.selectItem)
        .on('dblclick', window.openItem)
}

window.deleteItem = (i = false) => {
    if (i === false) i = $('.read-item.is-active').index() - 1
    
    $('.read-item').eq(i).remove() 
    this.toReadItems = this.toReadItems.filter((_, index) => index !== i) 
    this.saveItems()
    if (this.toReadItems.length) {
        let newIndex = (i === 0) ? 0 : i - 1
        $('.read-item').eq(newIndex).addClass('is-active')
    } else {
        $('#no-items').show()
    }
}

window.openInBrowser = () => {
    if (!this.toReadItems.length) return

    let targetItem = $('.read-item.is-active')

    require('electron').shell.openExternal(targetItem.data('url'))
}