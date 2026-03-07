var formulario = document.querySelector('form')

formulario.addEventListener('submit', function (e) {
    e.preventDefault() //evita o refresh da página
    
    let urlForm = 'https://pokeapi.co/api/v2/pokemon/' //url da api
    let nome = document.getElementById('name')

    urlForm = urlForm + this.name.value
    urlForm = urlForm.toLocaleLowerCase()

    let resposta = document.getElementById('content')
    let imagem = document.getElementById('imgPokemon')
    let html = ''
    console.log(urlForm)

    fetch(urlForm)
    .then(resposta => resposta.json())
    .then(function (data) {
        html += 'Name: ' + Capitalizar(data.name)
        html += '<br>'
        html += 'Type: ' + Capitalizar(data.types[0].type.name)
        html += '<br>'
        html += 'Altura: ' + Number(data.height) * 2.5 + ' cm'
        resposta.innerHTML = html
        nome.value = ''
        imagem.innerHTML = "<img src='" + data.sprites.versions["generation-v"]["black-white"].animated.front_default + "'><img src='" + data.sprites.versions["generation-v"]["black-white"].animated.back_default + "'>"
        // imagem.innerHTML = "<img src='" + data.sprites.home.front_default + "'><img src='" + data.sprites.back_default + "'>"
    })
    .catch(function (err) {
        if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
            html = 'Pokémon não encontrado! 😒'
        } 
        
        else {
            html = err
        }
        resposta.innerHTML = html
    })
    // alert(urlForm)
})

function Capitalizar(texto){
    return texto[0].toUpperCase() + texto.substr(1)
}