// =========================================
// AMR Sentinel - script.js
// Part 1
// =========================================

// -----------------------------
// Dark Mode
// -----------------------------
const darkModeBtn = document.getElementById("darkModeBtn");

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            darkModeBtn.innerHTML = "☀️ Light Mode";
        } else {
            darkModeBtn.innerHTML = "🌙 Dark Mode";
        }
    });
}

// -----------------------------
// Explore Dashboard Button
// -----------------------------
const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
    exploreBtn.addEventListener("click", function () {
        const dashboard = document.getElementById("dashboard");

        if (dashboard) {
            dashboard.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

// -----------------------------
// Animated Counter
// -----------------------------
function animateCounter(id, target) {

    const element = document.getElementById(id);

    if (!element) return;

    let count = 0;

    const speed = Math.ceil(target / 100);

    const timer = setInterval(function () {

        count += speed;

        if (count >= target) {
            count = target;
            clearInterval(timer);
        }

        if (id === "accuracyCount") {
            element.innerHTML = count + "%";
        } else {
            element.innerHTML = count;
        }

    }, 20);

}

animateCounter("hospitalCount", 152);
animateCounter("recordCount", 8450);
animateCounter("caseCount", 524);
animateCounter("accuracyCount", 98);

// -----------------------------
// Live Clock
// -----------------------------
function updateClock() {

    const clock = document.getElementById("liveClock");

    if (!clock) return;

    const now = new Date();

    clock.innerHTML = now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock, 1000);

console.log("AMR Sentinel Part 1 Loaded");

// =========================================
// Part 2
// Chart + Search + System Status
// =========================================

// -----------------------------
// AMR Cases Trend Chart
// -----------------------------
const chartCanvas = document.getElementById("amrChart");

if (chartCanvas && typeof Chart !== "undefined") {

    new Chart(chartCanvas, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ],

            datasets: [{

                label: "AMR Cases",

                data: [
                    40,
                    55,
                    70,
                    68,
                    90,
                    120
                ],

                borderColor: "#1976d2",

                backgroundColor: "rgba(25,118,210,0.15)",

                borderWidth: 3,

                fill: true,

                tension: 0.4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: true

        }

    });

}



// -----------------------------
// Hospital Search
// -----------------------------
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = searchInput.value.toLowerCase();

        const rows = document.querySelectorAll(".table-container tbody tr");

        rows.forEach(function (row) {

            if (row.innerText.toLowerCase().includes(value)) {

                row.style.display = "";

            }

            else {

                row.style.display = "none";

            }

        });

    });

}



// -----------------------------
// Live System Status
// -----------------------------
const systemStatus = document.getElementById("systemStatus");

if (systemStatus) {

    setInterval(function () {

        systemStatus.innerHTML =
            "🟢 System Status : Online | " +
            new Date().toLocaleTimeString();

    }, 1000);

}

console.log("AMR Sentinel Part 2 Loaded");

// =========================================
// Part 3
// AI Risk Prediction
// =========================================

function predictRisk() {

    const casesInput = document.getElementById("cases");
    const usageInput = document.getElementById("usage");

    if (!casesInput || !usageInput) {
        return;
    }

    const cases = Number(casesInput.value);
    const usage = usageInput.value;

    let risk = 0;

    // Calculate risk
    if (cases > 100) {
        risk += 50;
    } else if (cases > 50) {
        risk += 30;
    } else {
        risk += 10;
    }

    if (usage === "high") {
        risk += 40;
    } else if (usage === "medium") {
        risk += 25;
    } else {
        risk += 10;
    }

    // Risk Score
    const score = document.getElementById("risk-score");
    if (score) {
        score.innerHTML = "Risk Score: " + risk + "%";
    }

    // Risk Meter
    const fill = document.getElementById("risk-fill");
    if (fill) {
        fill.style.width = risk + "%";
    }

    // Prediction
    const prediction = document.getElementById("prediction");
    if (prediction) {

        if (risk >= 70) {
            prediction.innerHTML = "⚠️ High AMR Risk Detected";
        } else if (risk >= 40) {
            prediction.innerHTML = "⚠️ Medium AMR Risk Detected";
        } else {
            prediction.innerHTML = "✅ Low AMR Risk Detected";
        }

    }

    // Severity
    const severity = document.getElementById("severityLevel");
    if (severity) {

        if (risk >= 70) {
            severity.innerHTML = "<strong>Severity:</strong> Critical 🔴";
        } else if (risk >= 40) {
            severity.innerHTML = "<strong>Severity:</strong> Moderate 🟡";
        } else {
            severity.innerHTML = "<strong>Severity:</strong> Low 🟢";
        }

    }

    // Recommendation
    const recommendation = document.getElementById("recommendation");
    if (recommendation) {

        if (risk >= 70) {
            recommendation.innerHTML =
                "<strong>Recommendation:</strong> Immediate intervention required.";
        } else if (risk >= 40) {
            recommendation.innerHTML =
                "<strong>Recommendation:</strong> Continue monitoring antibiotic usage.";
        } else {
            recommendation.innerHTML =
                "<strong>Recommendation:</strong> Maintain current infection control.";
        }

    }

    // Risk Badge
    const badge = document.getElementById("riskBadge");

    if (badge) {

        if (risk >= 70) {
            badge.innerHTML = "🔴 High Alert";
            badge.style.background = "#d32f2f";
        } else if (risk >= 40) {
            badge.innerHTML = "🟡 Medium Alert";
            badge.style.background = "#f9a825";
        } else {
            badge.innerHTML = "🟢 Safe";
            badge.style.background = "#43a047";
        }

    }

    // History
// Save Risk History
const historyTable = document.getElementById("historyTable");

if (historyTable) {

    const time = new Date().toLocaleTimeString();

    const history = JSON.parse(localStorage.getItem("amrHistory")) || [];

    history.unshift({
        time: time,
        cases: cases,
        usage: usage,
        risk: risk
    });

    if (history.length > 10) {
        history.pop();
    }

    localStorage.setItem("amrHistory", JSON.stringify(history));

    historyTable.innerHTML = "";

    history.forEach(function(item) {

        const row = historyTable.insertRow();

        row.innerHTML =
            "<td>" + item.time + "</td>" +
            "<td>" + item.cases + "</td>" +
            "<td>" + item.usage + "</td>" +
            "<td>" + item.risk + "%</td>";

    });

}

}

console.log("AMR Sentinel Part 3 Loaded");
// =========================================
// Part 6
// Interactive India Risk Map
// =========================================

const states = document.querySelectorAll(".state");

states.forEach(function(state) {

    state.addEventListener("click", function() {

        const name = state.innerText;

        if (name.includes("Delhi")) {

            alert("Delhi\n\n🔴 High Risk\nAMR Cases: 120\nRecommendation: Immediate intervention required.");

        }

        else if (name.includes("Punjab")) {

            alert("Punjab\n\n🟡 Medium Risk\nAMR Cases: 75\nRecommendation: Continue monitoring.");

        }

        else if (name.includes("Kerala")) {

            alert("Kerala\n\n🟢 Low Risk\nAMR Cases: 30\nRecommendation: Maintain current infection control.");

        }

        else if (name.includes("Maharashtra")) {

            alert("Maharashtra\n\n🔴 High Risk\nAMR Cases: 110\nRecommendation: Increase surveillance.");

        }

        else if (name.includes("Tamil Nadu")) {

            alert("Tamil Nadu\n\n🟡 Medium Risk\nAMR Cases: 65\nRecommendation: Review antibiotic prescriptions.");

        }

        else if (name.includes("Rajasthan")) {

            alert("Rajasthan\n\n🟢 Low Risk\nAMR Cases: 28\nRecommendation: Continue current practices.");

        }

    });

});

console.log("AMR Sentinel Part 6 Loaded");
// =========================================
// Part 7
// PDF Report Export
// =========================================

const downloadReportBtn = document.getElementById("downloadReportBtn");

if (downloadReportBtn) {

    downloadReportBtn.addEventListener("click", function () {

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        const risk =
            document.getElementById("risk-score")?.innerText || "Risk Score: N/A";

        const severity =
            document.getElementById("severityLevel")?.innerText || "Severity: N/A";

        const recommendation =
            document.getElementById("recommendation")?.innerText || "Recommendation: N/A";

        const prediction =
            document.getElementById("prediction")?.innerText || "Prediction: N/A";

        const date = new Date().toLocaleString();

        doc.setFontSize(20);
        doc.text("AMR Sentinel Report", 20, 20);

        doc.setFontSize(12);
        doc.text("Generated: " + date, 20, 35);

        doc.line(20, 40, 190, 40);

        doc.text(risk, 20, 55);
        doc.text(severity, 20, 70);
        doc.text(prediction, 20, 85);

        doc.text("Recommendation:", 20, 105);

        const lines = doc.splitTextToSize(
            recommendation,
            160
        );

        doc.text(lines, 20, 115);

        doc.save("AMR_Sentinel_Report.pdf");

    });

}

console.log("AMR Sentinel Part 7 Loaded");
// ===============================
// Data Analytics Chart
// ===============================

const dataChart = document.getElementById("dataChart");

if(dataChart && typeof Chart !== "undefined"){

new Chart(dataChart,{

type:"bar",

data:{

labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun"
],

datasets:[{

label:"AMR Cases",

data:[
40,
55,
70,
68,
90,
120
],

backgroundColor:"#1976d2"

}]

},

options:{

responsive:true

}

});

}

console.log("Data Analytics Loaded");
// ===============================
// Data Page Search
// ===============================

const dataSearch = document.getElementById("dataSearch");

if(dataSearch){

dataSearch.addEventListener("keyup",function(){

const value = dataSearch.value.toLowerCase();

const rows = document.querySelectorAll("#hospitalTable tbody tr");


rows.forEach(function(row){

if(row.innerText.toLowerCase().includes(value)){

row.style.display="";

}

else{

row.style.display="none";

}

});


});

}

console.log("Data Search Loaded");
// ===============================
// Export Hospital Data
// ===============================

const exportBtn = document.getElementById("exportDataBtn");

if(exportBtn){

exportBtn.addEventListener("click",function(){

let csv =
"Hospital,State,AMR Cases,Risk Level\n";


const rows=document.querySelectorAll("#hospitalTable tbody tr");


rows.forEach(function(row){

let data=[];

row.querySelectorAll("td").forEach(function(cell){

data.push(cell.innerText);

});


csv += data.join(",")+"\n";


});


const blob = new Blob([csv],{type:"text/csv"});


const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="AMR_Hospital_Data.csv";

link.click();


});

}

console.log("Data Export Loaded");
// ===============================
// India Map Interaction
// ===============================

const mapStates = document.querySelectorAll(".state");

if(mapStates){

mapStates.forEach(function(state){

state.addEventListener("click",function(){

let name = state.innerText;


if(name.includes("Delhi")){

alert(
"Delhi\n\n🔴 High Risk\nAMR Cases: 120\nRecommendation: Immediate monitoring required."
);

}

else if(name.includes("Punjab")){

alert(
"Punjab\n\n🟡 Medium Risk\nAMR Cases: 75\nRecommendation: Continue surveillance."
);

}

else if(name.includes("Kerala")){

alert(
"Kerala\n\n🟢 Low Risk\nAMR Cases: 30\nRecommendation: Maintain current practices."
);

}

else if(name.includes("Maharashtra")){

alert(
"Maharashtra\n\n🔴 High Risk\nAMR Cases: 110\nRecommendation: Increase monitoring."
);

}

else if(name.includes("Tamil Nadu")){

alert(
"Tamil Nadu\n\n🟡 Medium Risk\nAMR Cases: 65\nRecommendation: Review antibiotic usage."
);

}

else if(name.includes("Rajasthan")){

alert(
"Rajasthan\n\n🟢 Low Risk\nAMR Cases: 28\nRecommendation: Continue prevention."
);

}


});

});

}

console.log("India Map Interaction Loaded");
// ===============================
// Custom India Map Popup
// ===============================

const popup = document.getElementById("mapPopup");
const popupTitle = document.getElementById("popupTitle");
const popupInfo = document.getElementById("popupInfo");
const closePopup = document.getElementById("closePopup");


const statesPopup = document.querySelectorAll(".state");


if(popup && statesPopup.length > 0){

statesPopup.forEach(function(state){

state.addEventListener("click",function(){

let name = state.innerText;


popup.style.display = "flex";


if(name.includes("Delhi")){

popupTitle.innerHTML="🔴 Delhi";

popupInfo.innerHTML=
"High Risk<br><br>AMR Cases: 120<br><br>Recommendation: Immediate monitoring required.";

}


else if(name.includes("Punjab")){

popupTitle.innerHTML="🟡 Punjab";

popupInfo.innerHTML=
"Medium Risk<br><br>AMR Cases: 75<br><br>Recommendation: Continue surveillance.";

}


else if(name.includes("Kerala")){

popupTitle.innerHTML="🟢 Kerala";

popupInfo.innerHTML=
"Low Risk<br><br>AMR Cases: 30<br><br>Recommendation: Maintain current practices.";

}


else if(name.includes("Maharashtra")){

popupTitle.innerHTML="🔴 Maharashtra";

popupInfo.innerHTML=
"High Risk<br><br>AMR Cases: 110<br><br>Recommendation: Increase monitoring.";

}


else if(name.includes("Tamil Nadu")){

popupTitle.innerHTML="🟡 Tamil Nadu";

popupInfo.innerHTML=
"Medium Risk<br><br>AMR Cases: 65<br><br>Recommendation: Review antibiotic usage.";

}


else if(name.includes("Rajasthan")){

popupTitle.innerHTML="🟢 Rajasthan";

popupInfo.innerHTML=
"Low Risk<br><br>AMR Cases: 28<br><br>Recommendation: Continue prevention.";

}


});

});

}


if(closePopup){

closePopup.onclick=function(){

popup.style.display="none";

}

}
// ===============================
// Contact Form Message
// ===============================

const contactForm = document.getElementById("contactForm");


if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();


alert("✅ Message sent successfully! Thank you for contacting AMR Sentinel.");


contactForm.reset();


});

}


console.log("Contact Form Loaded");