
const loadData = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => showAllData(data.slice(0,15)));
}

const showAllData = (countries) => {
    const countryContainer = document.getElementById("countries-info"); 
    countryContainer.innerHTML = "";
    console.log(countries); 
    countries.forEach((country) => {
        const div = document.createElement('div');
        div.classList.add('col-md-4', 'card', 'mt-4', 'shadow',)
        div.innerHTML = `
        <div class="mt-5 p-2">
                <img class="img-fluid " src="${country.flags.png}" alt="" />
                <h3>${country.name.common}</h3>
                <p class="">Area: ${country.area}</p>
                <p class="">Population: ${country.population}</p>
                <button class="btn btn-info" onclick="showDetails('${country.cca2}')" data-bs-toggle="modal" data-bs-target="#exampleModal">More details</button>
        </div>
        `  
        countryContainer.appendChild(div);
    })
   
}

const showDetails =(id)=>{
    const URL = `https://restcountries.com/v3.1/alpha/${id}` 
    fetch(URL)
    .then(res => res.json())
    .then(data => viewDetails(data[0]))
}

const viewDetails = (id) =>{
    console.log(id);
    const currencyArray = Object.values(id.currencies); 
    const details = document.getElementById("modal_details")
    details.innerHTML = 
    `
    <div class="modal-header">
    <h1 class="modal-title fs-4 p-2 rounded text-black text-uppercase" id="exampleModalLabel">Country Details</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="d-md-flex flex-row-reverse p-4">
        <div class="me-3">
         <img class="img-fluid" src ="${id.flags.png}">
        </div>
        <div class="me-5 border">
        <h4>Name: ${id.name.common}</h4>
        <h6>Capital: ${id.capital[0]}</h6>
          <h6>Area: ${id.area}</h6>
          <h6>Region: ${id.region}</h6>
          <h6>Currencies: ${currencyArray[0].name }</h6>
        </div>
    </div>
    `
}

const showAllCountry = () =>{
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => showAllData(data));
    document.getElementById('seeMore').style.display = "none"; 
}; 
loadData();

async function connect() {
    var userText = document.getElementById('user-input').value; 
    var url = `https://restcountries.com/v3.1/name/${userText}`

    document.getElementById('user-input').value = ''; 
    document.getElementById('countries-info').textContent = ''; 

    document.getElementById('seeMore').style.display = "none"; 
    fetch(url)
    .then(res =>res.json())
    .then(data =>showAllData(data)
    )
    .catch(error => {
        console.error('Fetch failed', error); 
        showUserError(); 
    });   
}
function showUserError(){
    alert("Typing Error."); 
}