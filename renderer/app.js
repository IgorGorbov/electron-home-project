const { ipcRenderer } = require('electron')

$('.open-add-modal').click(() => {
    $('#add-modal').addClass('is-active')
})

$('.close-add-modal').click(() => {
    $('#add-modal').removeClass('is-active')
})

$('#add-button').click(() => {
    let newItemURL = $('#item-input').val()
    if (newItemURL) {
        $('#item-input').prop('disable', true)
        $('#add-button').addClass('is-loading')
        $('.close-add-modal').addClass('is-disable')

        ipcRenderer.send('new-item', newItemURL)
    }
})

$('#item-input').keyup(e => {    
    if (e.key === "Enter") $('#add-button').click()
})

ipcRenderer.on("new-item-success", (e, item) => {
    console.log(item);

    $('#add-modal').removeClass('is-active')
    $('#item-input').prop('disable', false).val('')
    $('#add-button').removeClass('is-loading')
    $('.close-add-modal').removeClass('is-disable')
})