
function removePageEntries()  {
    removeElementsByClass("card bg-dark text-white");
}

/*
, {
	        'mode': 'no-cors',
	        'headers': {
            	'Access-Control-Allow-Origin': '*',
        	}
    	});
*/

async function fetchInfo(url) {
    try {
        let res = await fetch(url);
        let data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

const removeElementsByClass = (className) => {  
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function createCard(meeting) {
    const name = meeting.name;
    const description = meeting.description;
    
    /*<div class="card bg-dark text-white">
                    <img src="./img/océano-e1537912452874.jpg" class="card-img" alt="...">
                    <div class="card-img-overlay">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text">Last updated 3 mins ago</p>
                    </div>
                  </div>*/
    var card = document.createElement("div");
    card.className = "card bg-dark text-white";

    var cardOverlay = document.createElement("div");
    cardOverlay.className = "card-img-overlay";

    var cardName = document.createElement("h5")
    cardName.textContent = name;
    var cardDescription = document.createElement("p");
    cardDescription.textContent = description;

    card.appendChild(cardOverlay);
    card.appendChild(cardName);
    card.appendChild(cardDescription);


    return card;
}

async function updateMeetings() {
    removePageEntries();
    const meetings = await fetchInfo("http://localhost:3000/v1/meetings")
    
    meetings.forEach(meeting => {
        var container = document.getElementById("home")
        container.appendChild(createCard(meeting));
    });
}

//const meeting = new Meeting("Movement 1", "Pablo Neruda", "First movement for the seas!", ["ocean", "cleaning"], new Date(), new Date(), "Puerto Vallarta")

//MeetingsController.addMeeting(meeting);

updateMeetings();