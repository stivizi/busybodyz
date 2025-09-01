// Homepage Quiz Logic - Adapted for index.html integration (3 questions for testing)
// Based on the comprehensive quiz-logic.js implementation

const questions = [
  "How many servings of fruits and vegetables do you eat daily?",
  "On average, how many hours of sleep do you get per night?",
  "How often do you feel overwhelmed or stressed during the day?"
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];
let currentQuestion = 0;
const answers = new Array(questions.length).fill(null);

// Global variables for DOM elements (will be set during initialization)
let quizContainer, progressFill, progressText, prevBtn, nextBtn, submitBtn, resultDiv;

function renderQuestion() {
  if (!quizContainer) return;

  quizContainer.innerHTML = "";
  const q = document.createElement('h3');
  q.textContent = questions[currentQuestion];
  q.style.marginBottom = '20px';
  q.style.color = '#ff5722';
  quizContainer.appendChild(q);

  options.forEach((opt, idx) => {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.margin = '12px 0';
    label.style.cursor = 'pointer';
    label.style.padding = '12px';
    label.style.border = '2px solid #e0e0e0';
    label.style.borderRadius = '8px';
    label.style.transition = 'all 0.3s ease';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'homepage-option';
    input.value = idx + 1;
    input.style.marginRight = '10px';
    input.style.accentColor = '#ff5722';

    if (answers[currentQuestion] == idx + 1) {
      input.checked = true;
      label.style.borderColor = '#ff5722';
      label.style.backgroundColor = '#fff5f5';
    }

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opt));

    // Add hover effect
    label.addEventListener('mouseover', () => {
      if (!input.checked) {
        label.style.borderColor = '#ccc';
      }
    });
    label.addEventListener('mouseout', () => {
      if (!input.checked) {
        label.style.borderColor = '#e0e0e0';
        label.style.backgroundColor = 'transparent';
      }
    });

    quizContainer.appendChild(label);
  });

  // Update progress
  if (progressFill) {
    progressFill.style.width = ((currentQuestion + 1) / questions.length * 100) + "%";
  }
  if (progressText) {
    progressText.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
  }

  // Update button visibility
  if (prevBtn) {
    prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
  }
  if (nextBtn) {
    nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
  }
  if (submitBtn) {
    submitBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
  }
}

function initializeHomepageQuiz() {
  // Get DOM elements only when initializing
  quizContainer = document.getElementById('homepage-quiz-container');
  progressFill = document.getElementById('homepage-progress-fill');
  progressText = document.getElementById('homepage-progress-text');
  prevBtn = document.getElementById('homepage-prev-btn');
  nextBtn = document.getElementById('homepage-next-btn');
  submitBtn = document.getElementById('homepage-submit-btn');
  resultDiv = document.getElementById('homepage-result');

  if (!quizContainer || !prevBtn || !nextBtn || !submitBtn) {
    console.warn('Homepage quiz elements not found - quiz will not be initialized');
    return;
  }

  console.log('Homepage quiz initialized successfully with 3 questions for testing');

  prevBtn.onclick = () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  };

  nextBtn.onclick = () => {
    const selected = document.querySelector('input[name="homepage-option"]:checked');
    if (!selected) {
      alert("Please select an option before continuing");
      return;
    }
    answers[currentQuestion] = parseInt(selected.value);
    currentQuestion++;
    renderQuestion();
  };

  submitBtn.onclick = () => {
    const selected = document.querySelector('input[name="homepage-option"]:checked');
    if (!selected) {
      alert("Please select an option before submitting");
      return;
    }
    answers[currentQuestion] = parseInt(selected.value);

    // Hide quiz and show results
    const quizSection = document.getElementById('homepage-quiz-section');
    if (quizSection) {
      quizSection.style.display = 'none';
    }

    showResults();
  };

  renderQuestion();
}

function showResults() {
  if (!resultDiv) return;

  // Simple scoring for 3 questions - calculate overall average
  const totalScore = answers.reduce((sum, answer) => sum + (answer || 0), 0);
  const averageScore = totalScore / 3;
  const percentage = Math.round((averageScore / 5) * 100);

  // Determine overall assessment
  let assessment, recommendation;
  if (averageScore >= 4) {
    assessment = "Excellent! You're doing great with your wellness habits.";
    recommendation = "Keep up the fantastic work and consider sharing your success with others!";
  } else if (averageScore >= 3) {
    assessment = "Good job! You have solid wellness foundations.";
    recommendation = "Focus on small improvements in one area to boost your energy even more.";
  } else {
    assessment = "There's room for improvement in your wellness routine.";
    recommendation = "Start with small, sustainable changes to build better habits.";
  }

  let feedbackHTML = '<div class="quiz-result-header">';
  feedbackHTML += '<h3 class="quiz-result-heading">Your Energy Assessment</h3>';
  feedbackHTML += '<p>Thank you for completing the quiz! Here are your results:</p>';
  feedbackHTML += '</div>';

  // Simple score display
  feedbackHTML += `
    <div class="score-container">
      <div class="score-item">
        <div class="score-label">Overall Wellness Score</div>
        <div class="score-bar">
          <div class="score-fill" style="width: ${percentage}%; background-color: ${percentage >= 70 ? '#28a745' : percentage >= 50 ? '#ffc107' : '#dc3545'};"></div>
        </div>
        <div class="score-value">${percentage}%</div>
      </div>
    </div>
  `;

  feedbackHTML += `
    <div class="assessment-section">
      <h4>📊 Your Assessment</h4>
      <p>${assessment}</p>
      <h4>💡 Recommendation</h4>
      <p>${recommendation}</p>
    </div>
  `;

  feedbackHTML += `
    <div class="next-steps-section">
      <h4>Ready to Improve?</h4>
      <p>Want personalized coaching to optimize your energy levels? Let's create a customized plan together!</p>
      <a href="#services" class="cta-button">Get Started</a>
    </div>
  `;

  resultDiv.innerHTML = feedbackHTML;
  resultDiv.style.display = 'block';

  // Scroll to results
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, waiting for quiz elements...');

  // Wait a bit for all content to load, then initialize quiz
  setTimeout(() => {
    if (document.getElementById('homepage-quiz-container')) {
      console.log('Quiz container found, initializing...');
      initializeHomepageQuiz();
    } else {
      console.warn('Homepage quiz container not found - quiz not initialized');
    }
  }, 100);
});

// Export for potential external use
window.initializeHomepageQuiz = initializeHomepageQuiz;