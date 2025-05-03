const proofMessages = [
  "Sarah from Toronto just completed the quiz!",
  "Alex unlocked a free Energy Reset Plan!",
  "Maria joined the 7-Day Reset Challenge!",
  "John just claimed his free bonus guide!",
  "Lisa is starting her Energy Reset journey!"
];

const proofEl = document.getElementById('social-proof');

function showProofMessage() {
  const msg = proofMessages[Math.floor(Math.random() * proofMessages.length)];
  proofEl.textContent = msg;
  proofEl.style.opacity = 1;
  setTimeout(() => {
    proofEl.style.opacity = 0;
  }, 4000);
}

setInterval(showProofMessage, 8000);
