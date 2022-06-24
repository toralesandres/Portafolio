// SPA - 1
console.log(document.title + '\n---------------------------')

let links

function ajax (url, method = 'get') {
    let xhr = new XMLHttpRequest
    xhr.open(method, url)
    xhr.send()

    return xhr
}

let fileName = getFileName('navbar')
let xhr = ajax(fileName)
xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
        let template = xhr.response

        document.querySelector('body > header').innerHTML = template
        
        getTemplates()
    }
})




function getFileName(id) {
    // Con operador ternario:
    // return 'templates/' + ( id ? id : 'inicio') + '.html'
    
    // Con short circuit evaluation
    return 'templates/' + (id || 'home') + '.html'
}

function setActiveLink(id) {
    console.log('links:', links)
    links.forEach(link => {
        if (id === link.id) {
            link.classList.add('active')
            link.ariaCurrent = 'page'
        } else {
            link.classList.remove('active')
            // link.ariaCurrent = ''
            link.removeAttribute('aria-current')
        }
    })
}

function getTemplates() {
    links = document.querySelectorAll('nav a')
    console.log(links)

    let id = location.hash ? location.hash.slice(1) : 'home'

    setActiveLink(id)

    let fileName = getFileName(id)
    let xhr = ajax(fileName)
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            let template = xhr.response
            document.querySelector('main').innerHTML = template
        }
    })

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            const id = link.id
            console.log(id)


            location.hash = id

        })
    })

    window.addEventListener('hashchange', () => {
        console.log('Cambió la URL')

        let id = location.hash.slice(1) // Se toma desde el segundo caracter en adelante

        setActiveLink(id)

        let fileName = getFileName(id)
        let xhr = ajax(fileName)
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let template = xhr.response
                document.querySelector('main').innerHTML = template
            }
        })

    })
}

