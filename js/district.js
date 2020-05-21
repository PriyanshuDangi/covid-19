// const messageOne = document.getElementById('message-1')
// const messageTwo = document.getElementById('message-2')
// const messageThree = document.getElementById('message-3')
// const messageFour = document.getElementById('message-4')

const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const messageThree = document.getElementById('message-3')
const messageFour = document.getElementById('message-4')
const messageFive = document.getElementById('message-5')
const messageSix = document.getElementById('message-6')

const districtInput = document.getElementById('districtInput')
const section = document.querySelector('section')
const error = document.getElementById('error')
const dateSpan = document.getElementById('dateSpan')
const dateDiv = document.getElementById('datediv')
const statesInput = document.getElementById('statesDropdown')
const loading = document.getElementById('loading')


const statesDropdown = document.querySelector('#states')
const districtsDropdown = document.querySelector('#districtsDropdown')
let wholeData;

fetch('https://api.covid19india.org/state_district_wise.json').then((response)=>{
    response.json().then((data)=>{
        wholeData = data;
        let states = Object.keys(data)
        // console.log(states)
        let stateHTML = '<option> Please Select your state</option>'
        let p;
        for(p = 1; p < states.length; p++){
            stateHTML += `<option value = "${states[p]}">${states[p]}</option>`
        }
        statesDropdown.innerHTML = stateHTML
        loading.textContent = ''
        statesInput.style.display = "block";
    })
}).catch((error)=>{
    loading.textContent = 'failed to load. Please check your connection!'
    // console.log('failed to load. Please check your connection!')
})


let districts;
let stateHTML;
let districtsData;
let districtName;
statesDropdown.addEventListener('change', ()=>{

    section.style.display = "none";
    if(!wholeData[statesDropdown.value]){
        // return document.getElementById('error').textContent = "please select a valid option"
        return districtsDropdown.textContent = "please select a valid option"
    }

    districts = Object.keys(wholeData[statesDropdown.value].districtData)
    districtsData = wholeData[statesDropdown.value].districtData

    districtHTML = '<select name="districts" id="districts">'
    let p;
    for(p=0; p<districts.length; p++){
        districtHTML += `<option value = "${districts[p]}">${districts[p]}</option>`
    }
    districtHTML += '</select>'
    districtsDropdown.innerHTML = districtHTML
    
    document.getElementById('districts').addEventListener('change', ()=>{
        districtName = document.getElementById('districts').value
        var data = districtsData[districtName];
        console.log(data)

            // messageOne.textContent = data.confirmed;
            // messageTwo.textContent = data.active;
            // messageThree.textContent = data.recovered;
            // messageFour.textContent = data.deceased;
            messageOne.textContent = data.confirmed;
            messageTwo.textContent = data.deceased;
            messageThree.textContent = data.recovered;
            messageFour.textContent = data.delta.confirmed;
            messageFive.textContent = data.delta.deceased;
            messageSix.textContent = data.delta.recovered;
            section.style.display = "block";
    })
})


function india(){
    loading.textContent = 'loading...'
    // statesInput.style.display = "none";
    districtInput.style.display = "none"
    section.style.display = "none"
    fetch('https://api.covid19india.org/data.json').then((response)=>{
    response.json().then((data=>{
        console.log(data.cases_time_series.splice(-1)[0])
        var data = data.cases_time_series.splice(-1)[0];
            // error.textContent = ""
            loading.textContent = 'Last Updated:' + data.date
            messageOne.textContent = data.totalconfirmed;
            messageTwo.textContent = data.totaldeceased;
            messageThree.textContent = data.totalrecovered;
            messageFour.textContent = data.dailyconfirmed;
            messageFive.textContent = data.dailydeceased;
            messageSix.textContent = data.dailyrecovered;
            section.style.display = "block";
            // dateDiv.style.display = "block";
    }))
    })
}