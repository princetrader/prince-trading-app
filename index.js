const express = require("express");
const axios = require("axios");


const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {

let btc = "Loading...";
let eth = "Loading...";
let bnb = "Loading...";

try {

const btcData = await axios.get(
"https://api.binance.us/api/v3/ticker/price?symbol=BTCUSDT"
);

const ethData = await axios.get(
"https://api.binance.us/api/v3/ticker/price?symbol=ETHUSDT"
);

const bnbData = await axios.get(
"https://api.binance.us/api/v3/ticker/price?symbol=BNBUSDT"
);

btc = Number(btcData.data.price).toFixed(2);
eth = Number(ethData.data.price).toFixed(2);
bnb = Number(bnbData.data.price).toFixed(2);

} catch (err) {
console.log(err);
}

res.send(`

<!DOCTYPE html>
<html>

<head>

<title>PRINCE AI TRADING TERMINAL</title>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
background:#0d1117;
color:white;
}

.sidebar{
position:fixed;
left:0;
top:0;
width:240px;
height:100vh;
background:#111827;
padding:20px;
box-shadow:0 0 20px rgba(0,255,255,0.3);
}

.sidebar h2{
color:cyan;
margin-bottom:30px;
}

.sidebar a{
display:block;
padding:12px;
margin:12px 0;
background:#1e293b;
border-radius:10px;
text-decoration:none;
color:white;
}

.sidebar a:hover{
background:cyan;
color:black;
}

.main{
margin-left:260px;
padding:20px;
}

.topbar{
display:flex;
justify-content:space-between;
align-items:center;
background:#111827;
padding:20px;
border-radius:15px;
margin-bottom:20px;
}

.topbar h1{
color:cyan;
}

.market-status{
background:green;
padding:10px 20px;
border-radius:30px;
font-weight:bold;
}

.login-box{
background:#111827;
padding:20px;
width:320px;
border-radius:15px;
box-shadow:0 0 15px rgba(0,255,255,0.3);
}

.login-box input{
width:100%;
padding:12px;
margin-top:10px;
border:none;
border-radius:8px;
}

.login-box button{
width:100%;
padding:12px;
margin-top:10px;
background:cyan;
border:none;
border-radius:8px;
cursor:pointer;
font-weight:bold;
}

.cards{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
margin-top:20px;
}

.card{
background:#111827;
padding:20px;
border-radius:15px;
box-shadow:0 0 15px rgba(0,255,255,0.2);
}

.card h2{
margin-bottom:10px;
}

.price{
font-size:28px;
font-weight:bold;
color:#59ff7e;
}

.time{
margin-top:20px;
font-size:22px;
color:orange;

}

#dashboard{
    min-height:100vh;
}

.login-box{
    margin-top:40px;
}
</style>

</head>

<body>

<div class="sidebar">

<h2>⚡ PRINCE</h2>

<a href="#">🏠 Dashboard</a>
<a href="#">📈 Live Market</a>
<a href="#">💹 Signals</a>
<a href="#">💼 Portfolio</a>
<a href="#">🤖 AI Signals</a>
<a href="#" onclick="showScanner()">📈 NSE Scanner</a>
<a href="#">⚙️ Settings</a>

</div>

<div class="main">

<div class="topbar">

<h1>🤖 PRINCE AI TRADING TERMINAL</h1>

<div class="market-status">
🟢 MARKET OPEN
</div>

</div>

<div class="login-box main" id="loginBox">


</div>

<h2>Login</h2>

<input
type="text"
id="user"
placeholder="Username">

<input
type="password"
id="pass"
placeholder="Password">

<button onclick="login()">
LOGIN
</button>

</div>
<div id="scannerPage" style="display:none; padding:20px;">

<h2>📈 NSE TOP 50 SCANNER</h2>

<div id="scannerCards">
<h3>TEST CARD</h3>
<p>Scanner Working</p>
</div>

</div>

<div id="dashboard" class="main" style="display:none;">

<h1>
🚀 LIVE CRYPTO MARKET
</h1>

<div class="cards">

<div class="card">
<h2>BTC/USDT</h2>
<div class="price">
$${btc}
</div>

</div>

<div class="card">
<h2>ETH/USDT</h2>
<div class="price">
$${eth}
</div>

</div>

<div class="card">
<h2>BNB/USDT</h2>
<div class="price">
$${bnb}
</div>

</div>

<div class="card">
<h2>🤖 AI SIGNAL</h2>
<div class="price">
🟢 BUY
</div>

</div>

<div class="time">
Current Time:
<span id="clock"></span>
</div>
<div id="chartContainer" style="display:none;">
<h2 style="margin-top:30px;">📊 BTC Live Chart</h2>

<div style="margin-top:30px;">


</div>

<div id="marketCards"
class="cards">

</div>

</div>

</div>

<script>

function showScanner(){

    document.getElementById("scannerPage").style.display="block";

    document.getElementById("loginBox").style.display="none";
    
    loadScanner();
}
async function loadScanner(){

    console.log("Market API Called");

    const response = await fetch("/market");
    console.log(response);

    const data = await response.json();
    console.log(data);

    let html = "";

    data.forEach(stock => {

        const signal =
        parseFloat(stock.change) > 0
        ? "BUY 🟢"
        : "SELL 🔴";

      html +=
"<div class='card'>" +
"<h3>" + stock.name + "</h3>" +
"<p>Price: ₹" + stock.price + "</p>" +
"<p>Change: " + stock.change + "%</p>" +
"<p>Signal: " + signal + "</p>" +
"</div>";
    });

 document.getElementById("scannerCards").innerHTML = html;
} 

function login(){

const user =
document.getElementById("user").value;

const pass =
document.getElementById("pass").value;

if(
user === "admin" &&
pass === "1234"
){

document.getElementById(
"loginBox"
).style.display="none";

document.getElementById(
"dashboard"
).style.display="block";

document.getElementById(
"chartContainer"
).style.display="block";
document.getElementById("scannerPage").style.display="none";
document.getElementById("dashboard").style.display="block";
alert("Login Success ✅");
}else{

alert(
"Wrong Username / Password ❌"
);

}

}

function updateClock(){

document.getElementById(
"clock"
).innerHTML =
new Date().toLocaleTimeString();

}

setInterval(updateClock,1000);
updateClock();

</script>

<div class="tradingview-widget-container">
  <div id="tradingview_btc"></div>

  <script src="https://s3.tradingview.com/tv.js"></script>

  <script>
  new TradingView.widget({
      width: "100%",
      height: 650,
      symbol: "BINANCE:BTCUSDT",
      interval: "15",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      container_id: "tradingview_btc"
  });
  </script>
</div>

</body>
</html>
`);

});

app.get("/market", async (req,res)=>{

try{

const stocks = [
"RELIANCE.NS",
];

let result = [];

for(const stock of stocks){

const response = await axios.get(
  "https://query1.finance.yahoo.com/v8/finance/chart/" + stock,
  {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  }
);

const data = response.data.chart.result[0].meta;
result.push({

name: stock,

price: data.regularMarketPrice,

change: (
  (
    (data.regularMarketPrice - data.chartPreviousClose) /
    data.chartPreviousClose
  ) * 100
).toFixed(2)
});

}

res.json(result);

}catch(err){

console.error("MARKET ERROR:", err);
res.json([]);

}

});

app.listen(PORT, ()=>{

console.log(
"🚀 Server Running On Port " + PORT
);

});
