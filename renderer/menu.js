const { remote, shell } = require('electron')

const template = [
    {
        label: 'Items',
        submenu: [
            {
                label: 'Add New',
                accelerator: 'CmdOrCtrl+O',
                click() {
                    $('.open-add-modal').click()
                }
            },
            {
                label: 'Read Item',
                accelerator: 'CmdOrCtrl+Enter',
                click() {
                    window.openItem()
                }
            },
            {
                label: 'Delete Item',
                accelerator: 'CmdOrCtrl+Backspace',
                click() {
                    window.deleteItem()
                }
            },
            {
                label: 'Open in Browser',
                accelerator: 'CmdOrCtrl+Shift+E+Enter',
                click() {
                    window.openInBrowser()
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Search Items',
                accelerator: 'CmdOrCtrl+S',
                click() {
                    $('#search').focus()
                }
            },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                role: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            },
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn more',
                click() {
                    shell.openExternal('https://electronjs.org/')
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: remote.app.getName(),
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                role: 'separator'
            },
            {
                role: 'hide'
            },        {
                role: 'hideothers'
            },        {
                role: 'unhide'
            },        {
                role: 'separator'
            },        {
                role: 'quit'
            },
        ]
    })

    template[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        },
    ]
}

const menu = remote.Menu.buildFromTemplate(template)
remote.Menu.setApplicationMenu(menu)