const express = require("express");
const yahooFinance = require("yahoo-finance2").default;
const axios = require("axios");

const app = express();

app.get("/", async (req, res) => {

try {

const btc = await axios.get(
"https://api.binance.us/api/v3/ticker/price?symbol=BTCUSDT"
);

const eth = await axios.get(
"https://api.binance.us/api/v3/ticker/price?symbol=ETHUSDT"
);

const bnb = await axios.get(
"https://api.binance.us/api/v3/ticker/price?symbol=BNBUSDT"
);

res.send(`

<!DOCTYPE html>

<html>

<head>

<title>PRINCE LIVE MARKET</title>

<style>

body{
margin:0;
font-family:Arial;
background:#0d1117;
color:white;
}

.sidebar{
position:fixed;
left:0;
top:0;
width:220px;
height:100%;
background:#111827;
padding:20px;
box-shadow:0 0 15px cyan;
}

.sidebar h2{
color:cyan;
margin-bottom:30px;
}

.sidebar a{
display:block;
padding:12px;
margin:15px 0;
background:#1e293b;
color:white;
text-decoration:none;
border-radius:10px;
transition:0.3s;
}

.sidebar a:hover{
background:cyan;
color:black;
}

.main{
margin-left:260px;
padding:20px;
}

.login-box{
background:#1e293b;
padding:20px;
border-radius:15px;
width:250px;
box-shadow:0 0 15px cyan;
}

.login-box input{
width:100%;
padding:10px;
margin-top:10px;
border:none;
border-radius:5px;
}

.login-box button{
width:100%;
padding:10px;
margin-top:10px;
background:#59ff7e;
border:none;
border-radius:5px;
cursor:pointer;
}

h1{
color:cyan;
}

.cards{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(300px,1fr));

gap:25px;

margin-top:25px;

align-items:stretch;

}

.card{

background:#111827;

padding:25px;

border-radius:18px;

min-height:180px;

box-shadow:
0 0 15px rgba(0,255,255,0.3);

transition:0.3s;

display:flex;

flex-direction:column;

justify-content:center;

}
.ai-box{

background:linear-gradient(
135deg,
#111827,
#1e293b
);

border:2px solid cyan;

box-shadow:
0 0 25px rgba(0,255,255,0.5);

}

.ai-box h2{

color:#00ffff;

font-size:28px;

margin-bottom:15px;

}

.ai-box p{

font-size:20px;

margin:10px 0;

font-weight:bold;

}
.card:hover{

transform:translateY(-5px);

box-shadow:0 0 25px cyan;

}

.market-movers{

display:grid;

grid-template-columns:1fr 1fr;

gap:25px;

margin-top:25px;

}

.gainers,
.losers{

min-height:180px;

background:#111827;

padding:20px;

border-radius:18px;

box-shadow:0 0 15px rgba(0,255,255,0.3);

}
.card:hover{

transform:translateY(-5px);

box-shadow:0 0 25px cyan;

}
.price{
font-size:25px;
color:#59ff7e;
font-weight:bold;
}

.time{
margin-top:20px;
font-size:20px;
color:orange;
}

.trade-panel{
margin-top:30px;
background:#1e293b;
padding:20px;
border-radius:15px;
width:500px;
box-shadow:0 0 15px cyan;
}

.trade-panel input{
padding:10px;
margin:10px;
border:none;
border-radius:5px;
}

.trade-panel button{
padding:10px;
border:none;
border-radius:5px;
cursor:pointer;
}

.buy{
background:green;
color:white;
}

.sell{
background:red;
color:white;
}

.signal-box{
margin-top:30px;
background:#1e293b;
padding:20px;
border-radius:15px;
width:350px;
box-shadow:0 0 15px cyan;
}

#signal{
font-size:28px;
font-weight:bold;
margin:20px 0;
color:yellow;
}

.portfolio{
margin-top:30px;
background:#1e293b;
padding:20px;
border-radius:15px;
width:350px;
box-shadow:0 0 15px cyan;
}
.search-box{
margin-top:20px;
margin-bottom:20px;
}

.search-box input{
padding:10px;
width:250px;
border:none;
border-radius:5px;
}

.search-box button{
padding:10px;
background:cyan;
border:none;
border-radius:5px;
cursor:pointer;
}
.market-movers{
display:flex;
gap:20px;
margin-top:20px;
}

.gainers,
.losers{
background:#111827;
padding:20px;
border-radius:10px;
width:300px;
box-shadow:0 0 10px cyan;
}

.gainers h2{
color:lime;
}

.losers h2{
color:red;
}

.gainers ul,
.losers ul{
list-style:none;
padding:0;
}

.gainers li,
.losers li{
margin:10px 0;
font-size:18px;
}
.topbar{

display:flex;

justify-content:space-between;

align-items:center;

background:#111827;

padding:20px;

border-radius:15px;

margin-bottom:20px;

box-shadow:0 0 15px rgba(0,255,255,0.3);

}

.topbar h1{

color:cyan;

font-size:32px;

}

.market-status{

background:#16a34a;

padding:10px 20px;

border-radius:30px;

font-weight:bold;

font-size:18px;

}
.news-panel{

background:#111827;

padding:18px;

border-radius:15px;

margin-top:20px;

margin-bottom:20px;

box-shadow:0 0 15px rgba(0,255,255,0.3);

overflow:hidden;

}

.news-title{

color:cyan;

font-size:24px;

font-weight:bold;

margin-bottom:10px;

}

.news-scroll{

font-size:18px;

color:white;

font-weight:bold;

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

<a href="#">⚙️ Settings</a>

<a href="#nifty">📈 NSE Stocks</a>

<a href="#bse">🏦 BSE Stocks</a>

</div>

<div class="main">
<div class="topbar">

<h1>🤖 PRINCE AI TRADING TERMINAL</h1>

<div class="market-status">

🟢 Market Open

</div>

</div>

<div class="login-box" id="loginBox">

<h2>Login</h2>

<input type="text" id="user" placeholder="Username">

<input type="password" id="pass" placeholder="Password">

<button onclick="login()">Login</button>

</div>

<div id="dashboard" style="display:none;">

<h1>🚀 PRINCE LIVE MARKET</h1>

<div id="tradingview_chart"></div>
<div class="search-box">

<input type="text"
id="stockInput"
placeholder="Search NSE Stock">

<button onclick="loadChart()">
Open Chart
</button>

</div>
<div class="news-panel">

<div class="news-title">

📰 LIVE MARKET NEWS

</div>

<div class="news-scroll">

<marquee behavior="scroll" direction="left">

🔥 RELIANCE bullish after strong earnings |

📈 TCS wins US deal |

⚠️ HDFC faces selling pressure |

🚀 SBIN breakout expected |

💰 INFY positive momentum detected

</marquee>

</div>

</div>
<div class="cards">
<div class="market-movers">

<div class="gainers">
<h2>🚀 Top Gainers</h2>

<ul id="gainersList">
<li>RELIANCE +3.5%</li>
<li>TCS +2.8%</li>
<li>SBIN +2.1%</li>
</ul>

</div>

<div class="losers">
<h2>🔻 Top Losers</h2>

<ul id="losersList">
<li>INFY -1.5%</li>
<li>HDFC -2.2%</li>
<li>ITC -1.1%</li>
</ul>

</div>

</div>

<div class="card">

<h2>RELIANCE</h2>

<p class="price"
id="reliancePrice">

Loading...

</p>

</div>

<div class="card">

<h2>Ethereum</h2>
<div class="price">$ ${eth.data.price}</div>
</div>

<div class="card">
<h2>BNB Coin</h2>
<div class="price">$ ${bnb.data.price}</div>
</div>

<div class="card">
<h2>NIFTY</h2>
<div class="price">25000</div>
</div>

<div class="card">
<h2>BANKNIFTY</h2>
<div class="price">56000</div>
</div>
<div class="card ai-box">

<h2>🤖 AI SIGNAL</h2>

<p id="aiSignal">

RELIANCE → BUY ✅

</p>

<p>

Confidence → 81%

</p>

<p>

Trend → Bullish 📈

</p>

<p>

News Sentiment → Positive 😎

</p>

</div>

</div>

<div class="time">

Last Updated:
<span id="clock"></span>

</div>

<div class="trade-panel">

<h2>Trading Panel</h2>

<input type="number" id="buyPrice" placeholder="Buy Price">

<input type="number" id="sellPrice" placeholder="Sell Price">

<button onclick="calculateProfit()">
Calculate Profit
</button>

<br><br>

<button class="buy">BUY</button>

<button class="sell">SELL</button>

<h3 id="result"></h3>

</div>

<div class="signal-box">

<h2>📈 AI Trading Signal</h2>

<div id="signal">WAITING...</div>

<button onclick="buySignal()" class="buy">
BUY SIGNAL
</button>

<button onclick="sellSignal()" class="sell">
SELL SIGNAL
</button>

</div>

<div class="portfolio">

<h2>💼 Portfolio</h2>

<p>Total Balance: ₹ 5,00,000</p>

<p>Today Profit: ₹ 12,500</p>

<p>Total Trades: 15</p>

</div>

</div>

</div>

<script>

function login(){

const username =
document.getElementById("user").value;

const password =
document.getElementById("pass").value;

if(username === "admin" && password === "1234"){

alert("Login Success ✅");

document.getElementById("loginBox").style.display =
"none";

document.getElementById("dashboard").style.display =
"block";

}
else{

alert("Wrong Username or Password ❌");

}

}

function calculateProfit(){

const buy =
parseFloat(document.getElementById("buyPrice").value);

const sell =
parseFloat(document.getElementById("sellPrice").value);

const profit = sell - buy;

document.getElementById("result").innerHTML =
"Profit/Loss: " + profit;

}

function autoSignal(){

const random = Math.random();

if(random > 0.5){

document.getElementById("signal").innerHTML =
"🟢 AI BUY SIGNAL";

}
else{

document.getElementById("signal").innerHTML =
"🔴 AI SELL SIGNAL";

}

}

function buySignal(){

document.getElementById("signal").innerHTML =
"🟢 BUY NOW";

}s
function buySignal(){

document.getElementById("signal").innerHTML =
"🟢 BUY NOW";

}

function sellSignal(){

document.getElementById("signal").innerHTML =
"🔴 SELL NOW";

}
function loadChart(){

let stock =
document.getElementById("stockInput").value;

new TradingView.widget({

"container_id":"tradingview_chart",

"width":"100%",

"height":500,

"symbol": stock,

"interval":"D",

"timezone":"Asia/Kolkata",

"theme":"dark",

"style":"1",

"locale":"en",

"toolbar_bg":"#111827",

"enable_publishing":false,

"hide_side_toolbar":false,

"allow_symbol_change":true

});

}
function updateClock(){

const now = new Date();

document.getElementById("clock").innerHTML =
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

setInterval(autoSignal,5000);

autoSignal();
</script>

<script src="https://s3.tradingview.com/tv.js"></script>

<script>

new TradingView.widget({

"container_id":"tradingview_chart",

"width":"100%",

"height":500,

"symbol":"BINANCE:BTCUSDT",

"interval":"15",

"timezone":"Asia/Kolkata",

"theme":"dark",

"style":"1",

"locale":"en",

"toolbar_bg":"#0d1117",

"enable_publishing":false,

"hide_side_toolbar":false,

"allow_symbol_change":true

});

</script>

</body>

</html>

`);

}
catch(error){

res.send("Error Fetching Data ❌");

}

});

app.listen(3000, () => {

console.log("🚀 Server running on port 3000");

});
