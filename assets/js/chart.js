document.addEventListener("DOMContentLoaded", () => {
    
    let username = 'coalition';
    let password = 'skills-test';
    let auth = btoa(`${username}:${password}`);
    
    fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
    
      let diagnosisHistory = data.diagnosis_history;
      
      let systolicData = diagnosisHistory[0].blood_pressure.systolic.value;
      let diastolicData = diagnosisHistory[0].blood_pressure.diastolic.value;
      
      
      updateChart(systolicData, diastolicData);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  
    
    function updateChart(systolicData, diastolicData) {
      new ApexCharts(document.querySelector("#reportsChart"), {
        series: [{
          name: 'Systolic',
          data: [systolicData]
        }, {
          name: 'Diastolic',
          data: [diastolicData]
        }],
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false
          },
        },
        markers: {
          size: 4
        },
        colors: ['#E66FD2', '#8C6FE6'],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.4,
            stops: [0, 90, 100]
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z"]  
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        }
      }).render();
    }
  });
  

