document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    if (!username) {
        localStorage.setItem("level", "0");
    }

    updateLeaderboard();
    updateLevelLinks();
});

function saveUsername() {
    const username = document.getElementById("username").value.trim();
    if (username) {
        localStorage.setItem("username", username);
        localStorage.setItem("level", "0"); // Reset progress
        updateLeaderboard();
        updateLevelLinks();
    }
}

function checkAnswer(level, validAnswers) {
    let answer = document.getElementById("answer").value.toLowerCase().trim();
    if (validAnswers.includes(answer)) {
        localStorage.setItem("level", level); 
        updateLeaderboard();
        if (level === 5) {
            window.location.href = "reward.html";
        } else {
            window.location.href = `q${level + 1}.html`;
        }
    } else {
        alert("Wrong answer! Try again.");
    }
}

function updateLevelLinks() {
    let currentLevel = parseInt(localStorage.getItem("level") || "0");
    let levelLinks = document.getElementById("levelLinks");
    if (!levelLinks) return;

    levelLinks.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= currentLevel + 1) {
            let link = document.createElement("a");
            link.href = `q${i}.html`;
            link.innerText = `Go to Question ${i}`;
            levelLinks.appendChild(link);
            levelLinks.appendChild(document.createElement("br"));
        }
    }
}

function updateLeaderboard() {
    let leaderboard = document.getElementById("leaderboard");
    if (!leaderboard) return;

    let username = localStorage.getItem("username");
    let currentLevel = localStorage.getItem("level");

    let users = JSON.parse(localStorage.getItem("leaderboard")) || {};
    if (username) users[username] = currentLevel;

    localStorage.setItem("leaderboard", JSON.stringify(users));

    leaderboard.innerHTML = "";
    Object.keys(users).forEach(user => {
        let li = document.createElement("li");
        li.innerText = `${user}: Level ${users[user]}`;
        leaderboard.appendChild(li);
    });
}
