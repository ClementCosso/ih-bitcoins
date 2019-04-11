
var ctx = document.getElementById('myChart').getContext('2d');

let start = moment().subtract(1, 'month');
let end = moment();

let chart = null;

axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start.format("YYYY-MM-DD")}&end=${end.format("YYYY-MM-DD")}`)
.then(response => {
  console.log(response.data)
  chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(response.data.bpi),
        datasets: [{
          label: 'Cours du bticoin',
          data: Object.values(response.data.bpi),
          backgroundColor: 'rgba(0, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          fill: true
        }],
      },
      options: {
          responsive: true,
          title: {
              display: true,
              text: 'Chart.js'
          },
          scales: {
              xAxes: [{
                  display: true
              }],
              yAxes: [{
                  display: true
              }]
          }
      }
    })

})  


let updateChart = () => {
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start.format("YYYY-MM-DD")}&end=${end.format("YYYY-MM-DD")}`)
  .then(response => {
    // console.log(response.data)
    // for (var i=0; i < chart.data.labels.length; i++) {
    //   chart.data.labels.pop()      
    // }
    // Object.keys(response.data.bpi).forEach(l => chart.data.labels.push(l))
    chart.data.labels = Object.keys(response.data.bpi)
    chart.data.datasets[0].data = Object.values(response.data.bpi)
    chart.update()
  })  
}

let startBtn = document.getElementById('start');
let endBtn = document.getElementById('end');
startBtn.value = start.format("YYYY-MM-DD")
endBtn.value = end.format("YYYY-MM-DD")

startBtn.onchange = () => {
  console.log(startBtn.value)
  start = moment(startBtn.value)
  updateChart()  
};

endBtn.onchange = () => {
  end = moment(endBtn.value)
  updateChart()  
};
