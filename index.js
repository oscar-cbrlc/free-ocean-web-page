const GETALL_URL = "https://freeoceanapi.azurewebsites.net/v1/meetings";


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
async function fetchInfoPost(url, _data) {
    try {
        let res = await fetch(url, {
            method:'POST', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(_data), 
            mode: 'no-cors'
        });
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
    const meetings = await fetchInfo(GETALL_URL);
    console.log(meetings);
    var container = document.getElementById("home");
    meetings.forEach(meeting => {
        container.appendChild(createCard(meeting));
    });
    console.log(container);
}


async function createMeetingForm() {
    const name = document.getElementById("meetingName").textContent;
    const organizer = document.getElementById("meetingOrganizer").textContent
    const description = document.getElementById("meetingDescription").textContent;
    const tags = document.getElementById("meetingTags").textContent;
    const date = document.getElementById("meetingDate").textContent;

    const meeting = {
        name:name, 
        org:organizer, 
        desc:description, 
        tags:tags
    }
    await fetchInfoPost("https://freeoceanapi.azurewebsites.net/v1/add", meeting);
    updateMeetings();
}

//const meeting = new Meeting("Movement 1", "Pablo Neruda", "First movement for the seas!", ["ocean", "cleaning"], new Date(), new Date(), "Puerto Vallarta")

//MeetingsController.addMeeting(meeting);

updateMeetings();