function fetchAllData(){
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(response => response.json())
    .then(data => getAllCard(data.data.tools.slice(0, 6)));

}


const getAllCard = data =>{
    const allCards = document.getElementById('AllCard');
    allCards.innerHTML = "";
    data.forEach(getAllCard=>{
        const {id, image, published_in, name} = getAllCard;

        var newArray = [];

        data.forEach(singleElement =>{
            newArray.push(singleElement.published_in);
        });
        console.log(newArray);
        
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
        <div class="card">
                        <div class="card-area">
                            <img src=${image} class="img-fluid card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">Features</h5>
                            <ol class="card-list">
                                <li class="${getAllCard.features[0] === undefined ? 'd-none' : ''}"> ${getAllCard.features[0]}</li>
                                <li class="${getAllCard.features[1] === undefined ? 'd-none' : ''}"> ${getAllCard.features[1]}</li>
                                <li class="${getAllCard.features[2] === undefined ? 'd-none' : ''}"> ${getAllCard.features[2]}</li>
                                <li class="${getAllCard.features[3] === undefined ? 'd-none' : ''}"> ${getAllCard.features[3]}</li>
                            </ol> <hr>
                            <div class="card-foot d-flex justify-content-between align-items-center">
                           <div>
                            <h5 class="card-features">${name}</h5>
                            <p class="card-date"><i class="fas fa-calendar-alt"></i> ${published_in}</p>
                           </div>
                           <div>
                            <a href="#exampleModal" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchCardDetail('${id}')"><i class="fa-solid fa-arrow-right"></i></a>
                           </div>
                        </div>
                        </div>
                        </div>
                    </div>`

       

        allCards.appendChild(card);
           
    });

     // Stop Spinner or Loader
     toggleSpinner(false);

}


const fetchCardDetail = id =>{
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data => showCardDetail(data.data))
}

const showCardDetail = cardDetail =>{
    const { image_link, input_output_examples, description, accuracy, pricing, features, integrations} = cardDetail;



    document.getElementById('modal-body').innerHTML = `
    
    <div class="container">
           
            <div class="row row-cols-1 row-cols-lg-2 row-cols-md-2 justify-content-between align-items-center" id="modalBody">
                <div class="col modal-left border border-danger border-2 rounded-2">
                    <h2>${description}</h2>
                    <div class="sub-charge d-flex flex-row justify-content-center text-center p-2 gap-3 mr-2 mt-3 align-items-center">
                        <div class="border border-white sub-charging"><p>${pricing ? pricing[0].price : 'Free of Cost'}</p><p>${pricing ? pricing[0].plan : 'No Plan Available'}<p></div>
                        <div class="border border-white sub-charging"><p>${pricing ? pricing[0].price : 'Free of Cost'}</p><p>${pricing ? pricing[1].plan : 'No Plan Available'}<p></div>
                        <div class="border border-white sub-charging"><p>${pricing ? pricing[0].price : 'Free of Cost'}</p><p>${pricing ? pricing[2].plan : 'No Plan Available'}<p></div>
                    </div>

                    <div class="modal-left-footer">
                        <div class="row row-cols-1 row-cols-lg-2 row-cols-md-2 justify-content-between mt-3">
                            <div class="col">
                                <h5>Features</h5>
                                    <ul id="features-list">

                                    <li class="${features[1].feature_name === '' ? 'd-none' : ''}">${features[1].feature_name}</li>
                                    <li class="${features[2].feature_name === '' ? 'd-none' : ''}">${features[2].feature_name}</li>
                                    <li class="${features[3].feature_name === '' ? 'd-none' : ''}">${features[3].feature_name}</li>

                                    
                                    
                                       
                                    </ul> 
                            </div>
                            <div class="col">
                                <h5>Integrations</h5>
                                    <ul>
                                    <li class="${integrations[0] === undefined ? 'd-none' : ''}">${integrations[0]}</li>
                                    <li class="${integrations[1] === undefined ? 'd-none' : ''}">${integrations[1]}</li>
                                    <li class="${integrations[2] === undefined ? 'd-none' : ''}">${integrations[2]}</li>
                                    <li class="${integrations[3] === undefined ? 'd-none' : ''}">${integrations[3]}</li>
                                    <li class="${integrations[4] === undefined ? 'd-none' : ''}">${integrations[4]}</li>
                                    </ul> 
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col modal-right text-center position-relative">
                    
                    <div><img src=${image_link[0]} class="image-fluid rounded mb-3" ></div>
                    <span id="accuracy" class="badge text-bg-danger position-absolute top-0 end-0 ${accuracy.score ? accuracy.score * 100 +'% accuracy' : 'd-none'}">${accuracy.score ? accuracy.score * 100 +'% accuracy' : ' '} </span>
                    <h5 class="mb-3">${input_output_examples[0].input ? input_output_examples[0].input : 'No Data Found'}</h5>
                    <p>${input_output_examples[0].output}</p>
                </div>
            </div>
          </div>
    
    `

   
}



const showAllDataHere = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(response => response.json())
    .then(data => getAllCard(data.data.tools));
}

document.getElementById('showAll').addEventListener('click', function(){
    toggleSpinner(true);
    const element = document.getElementById('showAll');
    element.classList.add('d-none');
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}