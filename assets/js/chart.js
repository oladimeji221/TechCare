let api = "https://fedskillstest.coalitiontechnologies.workers.dev/";
let chart = document.getElementById("lineChart");
let resRateDocument = document.getElementById("resRate");
let resLevelDocument = document.getElementById("respLevel");
let tempRateDocument = document.getElementById("tempRate");
let tempLevelDocument = document.getElementById("tempLevel");
let heartRateDocument = document.getElementById("heartRate");
let heartLevelDocument =  document.getElementById("heartLevel");
let username = 'coalition';
let password = 'skills-test';
let auth =btoa(`${username}:${password}`);
let firstItem = null;
let systolicData =[];
let diagnoseData = [];
let labelsData =[];
let resRate = 0;
let resLevel ="";
let tempRate =0;
let tempLevel ="";
let heartRate =0;
let heartLevel = "";


function getChartData(name,name2){
  let populatedData =[];
let value = {label:name,data: systolicData, borderWidth: 1 }
let value2 = {label:name2,data: diagnoseData, borderWidth: 1 }
populatedData.push(value);
populatedData.push(value2);
return populatedData;

}
function addData(diagnosis_history){

  for(let i=0; i< diagnosis_history.length; i++){
    systolicData.push(diagnosis_history[i].blood_pressure.systolic.value);
    diagnoseData.push(diagnosis_history[i].blood_pressure.diastolic.value);
    labelsData.push(diagnosis_history[i].month +" "+ diagnosis_history[i].year);
    if(diagnosis_history[i].month === "March"){
     resLevel =diagnosis_history[i].respiratory_rate.levels;
     resRate =diagnosis_history[i].respiratory_rate.value;
     tempLevel = diagnosis_history[i].temperature.levels;
     tempRate = diagnosis_history[i].temperature.value;
     heartLevel = diagnosis_history[i].heart_rate.levels;
     heartRate = diagnosis_history[i].heart_rate.value;
    }
    
  }
}
function createChart(datasets){
  new Chart(chart, {
    type: 'line',
    data: {
      labels: labelsData,
      datasets: datasets,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }}
);

resLevelDocument.innerText = resLevel;
resRateDocument.innerText = resRate;
tempLevelDocument.innerText = tempLevel;
tempRateDocument.innerText = tempRate;
heartLevelDocument.innerText = heartLevel;
heartRateDocument.innerText = heartRate;
}
function sendRequest(){
  let request = new XMLHttpRequest();
  request.onreadystatechange= function(){
  
    if(this.status == 200 && this.readyState == 4){
   let data = FindByName(this.response);
   addData(data.diagnosis_history);
  datasets = getChartData("Systolic","Diastolic");
  createChart(datasets);
 
    }
  }
  request.onerror = function(error){
    console.log(error);
  }
  console.log("open");
  request.open("GET",api);
  
  request.setRequestHeader("Authorization","Basic " + auth);
  request.send();
}


function FindByName(jsonObject){
  const data = JSON.parse(jsonObject);
  for(let index=0; index < data.length; index++){
     let value = data[index];
     if(value.name == "Jessica Taylor"){
      return value;
     }
  }
}
sendRequest();