//Guardo los nodos de la barra de busqueda y el botón.
const boton = document.getElementById('buscar');
const busqueda = document.getElementById('busqueda');
const contenedor = document.getElementById('contenedor')

async function buscando(){

    let miBusqueda = busqueda.value;
    let resultado = '';
    if (miBusqueda.includes(' ')){
        resultado = '<p>Solo es valido la búsqueda de una palabra a la vez, sin espacios.<p>'
    }else{
        try{
        let respuesta = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ miBusqueda);
        json = (await respuesta.json())[0];
        let meanings = '';
        let definitions = '';
        json.meanings.forEach((meaning)=>{
            meaning.definitions.forEach((def)=>{
                definitions += `
                <li> ${def.definition}</li>
                `
            })
            meanings += `<li>\'${meaning.partOfSpeech}\': definitions: <ul>${definitions}</ul>
            `
        })

        resultado = `
        <h2>${json.word}</h2>
        <h3>Meanings:<h3>
        <ul>
            ${meanings}
        </ul>
        `
}catch(error){
    resultado = `no se encontró ${miBusqueda} en el diccionario, asegurese de estar buscando una palabra en inglés.`
}
    contenedor.innerHTML = resultado;

}}


boton.addEventListener('click', (e)=>{
    e.preventDefault();
    buscando();
})