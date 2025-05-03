const questions = [
  "How many servings of fruits and vegetables do you eat daily?",
  "How often do you consume processed or fast foods per week?",
  "Do you regularly eat breakfast within 1-2 hours of waking?",
  "How much water do you drink on an average day?",
  "How often do you feel satisfied and energized after meals?",
  "On average, how many hours of sleep do you get per night?",
  "How rested do you feel upon waking most mornings?",
  "Do you have a consistent bedtime and wake-up time?",
  "How often do you wake up during the night?",
  "Do you avoid screens and bright lights at least 30 minutes before bed?",
  "How often do you feel overwhelmed or stressed during the day?",
  "How well do you feel you manage unexpected challenges?",
  "Do you experience physical symptoms of stress (e.g., headaches, tension)?",
  "How often do you take breaks to relax or reset during your day?",
  "How supported do you feel by your social circle when stressed?",
  "How many days per week do you engage in intentional physical activity?",
  "How energized or fatigued do you feel after physical activity?",
  "Do you incorporate movement throughout your day (e.g., walking, stretching)?",
  "How confident are you in your ability to stay consistent with exercise?",
  "How enjoyable do you find your current physical activity routine?"
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];
let currentQuestion = 0;
const answers = new Array(questions.length).fill(null);

const quizContainer = document.getElementById('quiz-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');

function renderQuestion() {
  quizContainer.innerHTML = "";
  const q = document.createElement('h3');
  q.textContent = questions[currentQuestion];
  quizContainer.appendChild(q);

  options.forEach((opt, idx) => {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.margin = '8px 0';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = idx + 1;
    if (answers[currentQuestion] == idx + 1) input.checked = true;
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opt));
    quizContainer.appendChild(label);
  });

  progressFill.style.width = ((currentQuestion + 1) / questions.length * 100) + "%";
  progressText.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;

  prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
  nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
  submitBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
}

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
};

nextBtn.onclick = () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option");
    return;
  }
  answers[currentQuestion] = parseInt(selected.value);
  currentQuestion++;
  renderQuestion();
};

submitBtn.onclick = () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option");
    return;
  }
  answers[currentQuestion] = parseInt(selected.value);
  quizContainer.style.display = 'none';
  progressFill.style.width = '100%';
  progressText.style.display = 'none';
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  submitBtn.style.display = 'none';
  resultDiv.style.display = 'block';

  // Categorize questions
  const categories = {
    "Sleep": [5,6,7,8,9], // questions 6-10
    "Nutrition": [0,1,2,3,4], // questions 1-5
    "Stress Management": [10,11,12,13,14], // questions 11-15
    "Physical Activity": [15,16,17,18,19], // questions 16-20
    "Mindset": [10,11,12,13,14] // overlapping with stress for simplicity
  };

  const categoryScores = {};
  for (const [category, indices] of Object.entries(categories)) {
    const scores = indices.map(i => answers[i] || 0);
    const avg = scores.reduce((a,b) => a + b, 0) / scores.length;
    categoryScores[category] = avg;
  }

  const strengths = Object.entries(categoryScores).filter(([_, avg]) => avg >= 3.5).map(([cat]) => cat);
  const improvements = Object.entries(categoryScores).filter(([_, avg]) => avg < 3.5).map(([cat]) => cat);

  let feedbackHTML = '<h3>Your Personalized Wellness Blueprint</h3>';

  feedbackHTML += `<p>Thank you for completing the Energy Reset Quiz. This snapshot reveals valuable insights into your current habits and lifestyle. Remember, your wellness journey is unique, and small, consistent steps can lead to profound transformation. Here's a comprehensive look at your strengths and opportunities for growth, along with guidance to help you thrive.</p>`;

  if (strengths.length > 0) {
    feedbackHTML += `<p><strong>Areas of Strength:</strong> You demonstrate solid habits in <strong>${strengths.join(", ")}</strong>. These strengths provide a powerful foundation to build upon. Celebrate these wins—they reflect your dedication and self-awareness.</p>`;
  }

  if (improvements.length > 0) {
    feedbackHTML += `<p><strong>Focus Areas:</strong> Enhancing your approach to <strong>${improvements.join(", ")}</strong> can unlock new levels of energy, resilience, and well-being. Embrace these as opportunities to grow, not shortcomings.</p>`;
  }

  feedbackHTML += `<p>Below is a personalized roadmap to guide your next steps:</p>`;

  for (const [category, avg] of Object.entries(categoryScores)) {
    let paragraph = "";

    if (category === "Sleep") {
      paragraph = avg >= 3.5
        ? "Your sleep habits seem to support your recovery and daily energy. Prioritizing quality rest will continue to fuel your progress. Consider maintaining a consistent sleep schedule, creating a calming bedtime routine, and managing screen time before bed to optimize your rest."
        : "Improving your sleep quality can profoundly impact your mood, focus, and physical results. Aim to establish a relaxing pre-sleep ritual, limit late-night screen exposure, and create a restful environment. Quality sleep is the foundation of vitality.";
    } else if (category === "Nutrition") {
      paragraph = avg >= 3.5
        ? "Your nutrition habits provide a solid base for fueling your body. Keep focusing on balanced, nutrient-dense meals, mindful eating, and staying hydrated. These habits will support your workouts, recovery, and overall health."
        : "Optimizing your nutrition can boost your energy, support fat loss or muscle gain, and stabilize mood. Focus on whole foods, consistent meal timing, and hydration. Small, sustainable changes can lead to lasting results.";
    } else if (category === "Stress Management") {
      paragraph = avg >= 3.5
        ? "You appear to manage stress effectively, which is crucial for mental clarity and physical health. Continue incorporating relaxation techniques, setting boundaries, and nurturing supportive relationships."
        : "Managing stress better can enhance your resilience, sleep, and motivation. Explore mindfulness, breathing exercises, or journaling. Building emotional resilience is key to sustainable progress.";
    } else if (category === "Mindset") {
      paragraph = avg >= 3.5
        ? "Your mindset shows strength and adaptability. Maintaining a positive, growth-oriented outlook will empower your journey. Celebrate progress, embrace challenges, and stay curious."
        : "Cultivating a resilient, growth-focused mindset can transform obstacles into opportunities. Practice self-compassion, set realistic goals, and focus on progress over perfection.";
    } else if (category === "Physical Activity") {
      paragraph = avg >= 3.5
        ? "Your activity habits are on track. Keep incorporating enjoyable movement, mixing intensity levels, and celebrating your body's capabilities."
        : "Increasing your physical activity can elevate your energy, mood, and health. Start with small, enjoyable steps—like daily walks or short workouts—and build consistency over time.";
    }

    feedbackHTML += `<h4>${category}</h4><p>${paragraph}</p>`;
  }

  feedbackHTML += `<p><strong>Next Steps:</strong> Use these insights as a springboard. Focus on your strengths, and choose one or two growth areas to improve gradually. Remember, sustainable change is about progress, not perfection. With personalized coaching, you can turn these insights into an actionable, enjoyable plan that fits your life and goals.</p>`;

  resultDiv.innerHTML += feedbackHTML;
};

renderQuestion();

function randomizeAndGenerate() {
  alert("Button clicked!");
  // Randomize answers
  for (let i = 0; i < answers.length; i++) {
    answers[i] = Math.floor(Math.random() * 5) + 1;
  }

  // Reset to first question and render
  currentQuestion = 0;
  renderQuestion();

  // Visually select radio buttons for each question
  for (let idx = 0; idx < questions.length; idx++) {
    currentQuestion = idx;
    renderQuestion();
    const radios = document.querySelectorAll('input[name="option"]');
    radios.forEach(radio => radio.checked = false);
    const labels = quizContainer.querySelectorAll('label');
    labels.forEach(label => {
      const input = label.querySelector('input');
      if (input && parseInt(input.value) === answers[idx]) {
        input.checked = true;
      }
    });
  }

  // Hide quiz and show summary
  quizContainer.style.display = 'none';
  progressFill.style.width = '100%';
  progressText.style.display = 'none';
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  submitBtn.style.display = 'none';
  resultDiv.style.display = 'block';

  // Clear previous summary
  resultDiv.innerHTML = `
    <div style="text-align:center; margin-bottom:20px;">
      <h3 style="color:#ff5722; font-size:24px;">Congratulations!</h3>
      <p>You've completed the quiz. Check your email for your personalized Energy Reset Plan and a special bonus!</p>
    </div>
  `;

  // Generate summary
  const categories = {
    "Sleep": [5,6,7,8,9],
    "Nutrition": [0,1,2,3,4],
    "Stress Management": [10,11,12,13,14],
    "Physical Activity": [15,16,17,18,19],
    "Mindset": [10,11,12,13,14]
  };

  const categoryScores = {};
  for (const [category, indices] of Object.entries(categories)) {
    const scores = indices.map(i => answers[i] || 0);
    const avg = scores.reduce((a,b) => a + b, 0) / scores.length;
    categoryScores[category] = avg;
  }

  const strengths = Object.entries(categoryScores).filter(([_, avg]) => avg >= 3.5).map(([cat]) => cat);
  const improvements = Object.entries(categoryScores).filter(([_, avg]) => avg < 3.5).map(([cat]) => cat);

  let feedbackHTML = '<div style="background:#fff; padding:25px; border-radius:8px; margin-bottom:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">';
  feedbackHTML += '<h3 style="color:#ff5722; margin-top:0;">Your Personalized Wellness Blueprint</h3>';

  feedbackHTML += `<p>Thank you for completing the Energy Reset Quiz. This snapshot reveals valuable insights into your current habits and lifestyle. Remember, your wellness journey is unique, and small, consistent steps can lead to profound transformation. Here's a comprehensive look at your strengths and opportunities for growth, along with guidance to help you thrive.</p>`;

  // Add visual score summary
  feedbackHTML += `<div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">
    <h4 style="margin-top: 0; color: #333;">Your Energy Profile</h4>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 15px;">`;

  // Create score bars for each category
  for (const [category, avg] of Object.entries(categoryScores)) {
    const percentage = Math.round((avg / 5) * 100);
    const color = percentage >= 70 ? "#28a745" : percentage >= 50 ? "#ffc107" : "#dc3545";

    feedbackHTML += `
      <div style="flex: 1; min-width: 150px; margin: 5px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>${category}</span>
          <span>${percentage}%</span>
        </div>
        <div style="height: 10px; background: #e9ecef; border-radius: 5px; overflow: hidden;">
          <div style="height: 100%; width: ${percentage}%; background: ${color};"></div>
        </div>
      </div>`;
  }

  feedbackHTML += `</div>`;

  // Add strengths section with more detail
  if (strengths.length > 0) {
    feedbackHTML += `<div style="margin-bottom: 15px;">
      <h5 style="color: #28a745; display: flex; align-items: center; margin-bottom: 10px;">
        <span style="margin-right: 8px;">✓</span> Areas of Strength
      </h5>
      <p>You demonstrate solid habits in <strong>${strengths.join(", ")}</strong>. These strengths provide a powerful foundation to build upon and can help compensate for areas that need improvement. Celebrate these wins—they reflect your dedication and self-awareness.</p>
      <ul style="margin-top: 5px; padding-left: 25px;">`;

    // Add specific strength insights
    strengths.forEach(area => {
      let insight = "";
      if (area === "Sleep") {
        insight = "Quality sleep enhances recovery, cognitive function, and hormone balance.";
      } else if (area === "Nutrition") {
        insight = "Good nutrition provides sustained energy and supports overall health.";
      } else if (area === "Stress Management") {
        insight = "Effective stress management improves resilience and prevents energy depletion.";
      } else if (area === "Physical Activity") {
        insight = "Regular movement boosts energy, mood, and metabolic health.";
      } else if (area === "Mindset") {
        insight = "A positive mindset reduces energy drain from negative thought patterns.";
      }
      feedbackHTML += `<li>${insight}</li>`;
    });

    feedbackHTML += `</ul></div>`;
  }

  // Add improvement areas with more detail
  if (improvements.length > 0) {
    feedbackHTML += `<div>
      <h5 style="color: #ffc107; display: flex; align-items: center; margin-bottom: 10px;">
        <span style="margin-right: 8px;">↗</span> Focus Areas
      </h5>
      <p>Enhancing your approach to <strong>${improvements.join(", ")}</strong> can unlock new levels of energy, resilience, and well-being. These areas represent your greatest opportunities for transformation.</p>
      <ul style="margin-top: 5px; padding-left: 25px;">`;

    // Add specific improvement insights
    improvements.forEach(area => {
      let insight = "";
      if (area === "Sleep") {
        insight = "Even small improvements in sleep quality can significantly boost daytime energy.";
      } else if (area === "Nutrition") {
        insight = "Strategic nutrition changes can stabilize energy levels throughout the day.";
      } else if (area === "Stress Management") {
        insight = "Learning to manage stress effectively prevents energy leaks and improves recovery.";
      } else if (area === "Physical Activity") {
        insight = "Finding enjoyable movement can energize rather than deplete your resources.";
      } else if (area === "Mindset") {
        insight = "Shifting thought patterns can reduce the mental fatigue that drains energy.";
      }
      feedbackHTML += `<li>${insight}</li>`;
    });

    feedbackHTML += `</ul></div>`;
  }

  feedbackHTML += `</div><p>Below is a personalized roadmap to guide your next steps:</p></div>`;

  // Category icons
  const categoryIcons = {
    "Sleep": "🌙",
    "Nutrition": "🍎",
    "Stress Management": "🧘",
    "Physical Activity": "🏃",
    "Mindset": "🧠"
  };

  // Category colors
  const categoryColors = {
    "Sleep": "#6a5acd",
    "Nutrition": "#2e8b57",
    "Stress Management": "#4682b4",
    "Physical Activity": "#ff7f50",
    "Mindset": "#9932cc"
  };

  for (const [category, avg] of Object.entries(categoryScores)) {
    // Determine score level and status
    let scoreLevel, statusText, statusColor, statusEmoji;

    if (avg >= 4.5) {
      scoreLevel = "Exceptional";
      statusText = "Outstanding Strength";
      statusColor = "#28a745";
      statusEmoji = "🌟";
    } else if (avg >= 3.5) {
      scoreLevel = "Strong";
      statusText = "Strength";
      statusColor = "#28a745";
      statusEmoji = "✓";
    } else if (avg >= 2.5) {
      scoreLevel = "Moderate";
      statusText = "Developing";
      statusColor = "#ffc107";
      statusEmoji = "↗";
    } else if (avg >= 1.5) {
      scoreLevel = "Limited";
      statusText = "Growth Area";
      statusColor = "#fd7e14";
      statusEmoji = "⚠️";
    } else {
      scoreLevel = "Critical";
      statusText = "Priority Focus";
      statusColor = "#dc3545";
      statusEmoji = "❗";
    }

    const icon = categoryIcons[category] || "✨";
    const color = categoryColors[category] || "#ff5722";
    const score = avg.toFixed(1);
    const percentage = Math.round((avg / 5) * 100);

    // Generate detailed feedback based on category and score level
    let paragraph = "";
    let specificTips = "";

    if (category === "Sleep") {
      if (avg >= 4.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your sleep habits are exceptional. You've established routines that strongly support your recovery and daily energy. Your consistent, quality sleep is likely providing significant benefits to your cognitive function, hormone balance, and overall well-being.`;
        specificTips = "Continue prioritizing sleep as a non-negotiable part of your health routine. Your excellent sleep habits are a cornerstone of your energy management.";
      } else if (avg >= 3.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your sleep habits effectively support your recovery and daily energy. You've established good routines that are working well for you, though there may still be occasional disruptions or areas for fine-tuning.`;
        specificTips = "Consider optimizing your sleep environment further and maintaining your consistent sleep schedule, even on weekends.";
      } else if (avg >= 2.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your sleep patterns show a moderate foundation but have significant room for improvement. You may experience inconsistent sleep quality or quantity that affects your daytime energy and recovery.`;
        specificTips = "Focus on establishing a consistent bedtime routine, limiting screen time before bed, and creating a sleep-friendly environment.";
      } else if (avg >= 1.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your sleep habits need substantial attention. Poor sleep is likely affecting multiple aspects of your health, including energy levels, mood, and cognitive function.`;
        specificTips = "Prioritize improving your sleep environment, establishing a regular sleep schedule, and addressing factors that disrupt your sleep.";
      } else {
        paragraph = `With a score of ${score}/5 (${percentage}%), your sleep quality is critically low and should be your top priority. Chronic sleep deprivation significantly impacts all aspects of health and is a major barrier to energy management.`;
        specificTips = "Consider consulting a healthcare provider about your sleep challenges while immediately implementing basic sleep hygiene practices.";
      }
    } else if (category === "Nutrition") {
      if (avg >= 4.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your nutrition habits are exceptional. You've established eating patterns that provide consistent energy, support recovery, and contribute to overall health. Your balanced approach to nutrition is likely enhancing your performance in all areas of life.`;
        specificTips = "Continue your excellent nutrition practices while staying open to fine-tuning based on seasonal changes and activity levels.";
      } else if (avg >= 3.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your nutrition habits provide a solid base for fueling your body. You generally make supportive food choices that contribute to stable energy levels and overall health.`;
        specificTips = "Continue focusing on balanced, nutrient-dense meals, mindful eating, and staying hydrated throughout the day.";
      } else if (avg >= 2.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your nutrition patterns show a moderate foundation but have significant room for improvement. You may experience energy fluctuations related to inconsistent eating patterns or food choices.`;
        specificTips = "Focus on regular meal timing, increasing whole food consumption, and being mindful of how different foods affect your energy levels.";
      } else if (avg >= 1.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your nutrition habits need substantial attention. Your current eating patterns may be contributing to energy crashes, mood swings, and reduced recovery capacity.`;
        specificTips = "Start with small, consistent changes like adding protein to each meal, increasing water intake, and reducing ultra-processed foods.";
      } else {
        paragraph = `With a score of ${score}/5 (${percentage}%), your nutrition quality is critically low and should be a top priority. Your current eating patterns are likely significantly impacting your energy, mood, and overall health.`;
        specificTips = "Consider consulting a healthcare provider about your sleep challenges while immediately implementing basic sleep hygiene practices.";
      }
    } else if (category === "Stress Management") {
      if (avg >= 4.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your stress management skills are exceptional. You've developed effective strategies for navigating life's challenges while maintaining your equilibrium. This ability preserves your energy and supports overall resilience.`;
        specificTips = "Continue your excellent stress management practices while sharing these skills with others who might benefit from your approach.";
      } else if (avg >= 3.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), you manage stress effectively, which is crucial for mental clarity and physical health. You have good coping mechanisms in place, though there may still be situations that challenge your resilience.`;
        specificTips = "Continue incorporating relaxation techniques, setting boundaries, and nurturing supportive relationships.";
      } else if (avg >= 2.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your stress management shows a moderate foundation but has significant room for improvement. You may handle some stressors well but feel overwhelmed by others.`;
        specificTips = "Develop a broader toolkit of stress management techniques and practice them consistently, not just during high-stress periods.";
      } else if (avg >= 1.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your stress management needs substantial attention. Chronic stress is likely affecting your energy, sleep, and overall health in significant ways.`;
        specificTips = "Begin with simple daily stress reduction practices like deep breathing, short meditation sessions, or gentle movement.";
      } else {
        paragraph = `With a score of ${score}/5 (${percentage}%), your stress management is critically low and should be a top priority. The impact of unmanaged stress is likely affecting all aspects of your health and energy.`;
        specificTips = "Consider working with a mental health professional to develop more supportive thought patterns.";
      }
    } else if (category === "Mindset") {
      if (avg >= 4.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your mindset is exceptionally positive and resilient. You've developed thought patterns that support your goals, manage challenges effectively, and maintain perspective during difficulties.`;
        specificTips = "Continue nurturing your positive mindset while helping others develop similar mental resilience.";
      } else if (avg >= 3.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your mindset shows strength and adaptability. You generally maintain a positive outlook and can navigate challenges without becoming overwhelmed by negative thinking.`;
        specificTips = "Continue celebrating progress, embracing challenges, and staying curious about new approaches.";
      } else if (avg >= 2.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your mindset shows a moderate foundation but has significant room for improvement. You may struggle with consistent positive thinking or resilience during challenges.`;
        specificTips = "Practice reframing negative thoughts, focus on solutions rather than problems, and develop a regular gratitude practice.";
      } else if (avg >= 1.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your mindset needs substantial attention. Negative thought patterns may be draining your energy and limiting your ability to take positive action.`;
        specificTips = "Begin noticing negative thought patterns without judgment and practice simple reframing techniques daily.";
      } else {
        paragraph = `With a score of ${score}/5 (${percentage}%), your mindset patterns are critically challenging and should be a top priority. Persistent negative thinking is likely significantly impacting your energy and overall well-being.`;
        specificTips = "Consider working with a mental health professional to develop more supportive thought patterns.";
      }
    } else if (category === "Physical Activity") {
      if (avg >= 4.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your physical activity habits are exceptional. You've established consistent movement patterns that energize your body, support your mental health, and enhance your overall vitality.`;
        specificTips = "Continue your excellent activity habits while exploring new movement forms that might bring additional joy and benefits.";
      } else if (avg >= 3.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your activity habits are on track. You engage in regular movement that supports your energy levels and overall health, though there may be room for more variety or consistency.`;
        specificTips = "Keep incorporating enjoyable movement, mixing intensity levels, and celebrating your body's capabilities.";
      } else if (avg >= 2.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your physical activity shows a moderate foundation but has significant room for improvement. You may exercise occasionally but lack consistency or enjoyment in your routine.`;
        specificTips = "Focus on finding movement forms you genuinely enjoy and start with small, consistent sessions rather than intense but unsustainable workouts.";
      } else if (avg >= 1.5) {
        paragraph = `With a score of ${score}/5 (${percentage}%), your physical activity needs substantial attention. Limited movement is likely affecting your energy levels, mood, and overall health.`;
        specificTips = "Begin with simple daily movement like short walks, gentle stretching, or brief activity breaks throughout your day.";
      } else {
        paragraph = `With a score of ${score}/5 (${percentage}%), your physical activity is critically low and should be a top priority. Sedentary patterns significantly impact energy levels and overall health.`;
        specificTips = "Start with the smallest possible movement habit—even 5 minutes daily—and build gradually as your body adapts.";
      }
    }

    feedbackHTML += `
      <div style="background:#fff; padding:20px; border-radius:8px; margin-bottom:15px; border-left:4px solid ${color}; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <h4 style="margin-top:0; display:flex; align-items:center; color:${color};">
          <span style="margin-right:10px; font-size:24px;">${icon}</span>
          ${category}
          <span style="margin-left:auto; font-size:14px; color:${statusColor}; background:rgba(${statusColor.replace('#', '').match(/../g).map(h => parseInt(h, 16)).join(',')},0.1); padding:3px 8px; border-radius:12px;">
            ${statusText} (${score}/5)
          </span>
        </h4>
        <p>${paragraph}</p>
        <p style="margin-top:10px; font-style:italic; color:#555;">${specificTips}</p>
      </div>
    `;
  }

  feedbackHTML += `
    <div style="background:#fff; padding:25px; border-radius:8px; margin-bottom:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
      <h4 style="color:#ff5722; margin-top:0;">Next Steps</h4>
      <p>Use these insights as a springboard. Focus on your strengths, and choose one or two growth areas to improve gradually. Remember, sustainable change is about progress, not perfection.</p>

      <div style="margin-top:20px; padding-top:20px; border-top:1px solid #eee;">
        <p><strong>Ready to transform these insights into action?</strong> While this analysis provides valuable guidance, personalized coaching can help you implement these changes effectively and sustainably.</p>

        <p>A consultation with our energy reset specialist will help you:</p>
        <ul style="margin-bottom:20px;">
          <li>Create a customized plan based on your unique energy profile</li>
          <li>Identify the highest-impact changes for your specific situation</li>
          <li>Develop strategies to overcome your specific obstacles</li>
          <li>Establish accountability and support for lasting results</li>
          <li><strong>Choose the right service option for your needs and goals</strong> - whether Self-led, Online, Virtual, or Hybrid Coaching</li>
        </ul>

        <p style="margin-bottom:20px; font-style:italic;">Not sure which of our services is right for you? During your consultation, we'll discuss your quiz results, lifestyle, preferences, and goals to recommend the perfect coaching option that fits your unique situation.</p>

        <div style="text-align:center; margin-top:25px;">
          <a href="booking.html" class="cta-button" style="display:inline-block; padding:12px 30px; font-size:16px;">Book Your Free Consultation</a>
        </div>
      </div>
    </div>
  `;

  // Add sharing section
  feedbackHTML += `
    <div style="margin-top:30px; text-align:center; padding-top:20px; border-top:1px solid #eee;">
      <p><strong>Share with friends to unlock an extra bonus guide!</strong></p>
      <div style="display:flex; flex-wrap:wrap; justify-content:center;">
        <a href="#" class="secondary-button" style="display: inline-block; width: auto; max-width: fit-content; padding-left: 20px; padding-right: 20px; margin:5px;">Share on Facebook</a>
        <a href="#" class="secondary-button" style="display: inline-block; width: auto; max-width: fit-content; padding-left: 20px; padding-right: 20px; margin:5px;">Share on Twitter</a>
        <a href="#" class="secondary-button" style="display: inline-block; width: auto; max-width: fit-content; padding-left: 20px; padding-right: 20px; margin:5px;">Copy Link</a>
      </div>
    </div>
  `;

  resultDiv.innerHTML += feedbackHTML;
}

// Categorize questions
const categories = {
  "Sleep": [5,6,7,8,9],
  "Nutrition": [0,1,2,3,4],
  "Stress Management": [10,11,12,13,14],
  "Physical Activity": [15,16,17,18,19],
  "Mindset": [10,11,12,13,14]
};

const categoryScores = {};
for (const [category, indices] of Object.entries(categories)) {
  const scores = indices.map(i => answers[i] || 0);
  const avg = scores.reduce((a,b) => a + b, 0) / scores.length;
  categoryScores[category] = avg;
}

const strengths = Object.entries(categoryScores).filter(([_, avg]) => avg >= 3.5).map(([cat]) => cat);
const improvements = Object.entries(categoryScores).filter(([_, avg]) => avg < 3.5).map(([cat]) => cat);

let feedbackHTML = '<h3>Your Personalized Wellness Blueprint</h3>';

feedbackHTML += `<p>Thank you for completing the Energy Reset Quiz. This snapshot reveals valuable insights into your current habits and lifestyle. Remember, your wellness journey is unique, and small, consistent steps can lead to profound transformation. Here's a comprehensive look at your strengths and opportunities for growth, along with guidance to help you thrive.</p>`;

if (strengths.length > 0) {
  feedbackHTML += `<p><strong>Areas of Strength:</strong> You demonstrate solid habits in <strong>${strengths.join(", ")}</strong>. These strengths provide a powerful foundation to build upon. Celebrate these wins—they reflect your dedication and self-awareness.</p>`;
}

if (improvements.length > 0) {
  feedbackHTML += `<p><strong>Focus Areas:</strong> Enhancing your approach to <strong>${improvements.join(", ")}</strong> can unlock new levels of energy, resilience, and well-being. Embrace these as opportunities to grow, not shortcomings.</p>`;
}

feedbackHTML += `<p>Below is a personalized roadmap to guide your next steps:</p>`;

for (const [category, avg] of Object.entries(categoryScores)) {
  let paragraph = "";

  if (category === "Sleep") {
    paragraph = avg >= 3.5
      ? "Your sleep habits seem to support your recovery and daily energy. Prioritizing quality rest will continue to fuel your progress. Consider maintaining a consistent sleep schedule, creating a calming bedtime routine, and managing screen time before bed to optimize your rest."
      : "Improving your sleep quality can profoundly impact your mood, focus, and physical results. Aim to establish a relaxing pre-sleep ritual, limit late-night screen exposure, and create a restful environment. Quality sleep is the foundation of vitality.";
  } else if (category === "Nutrition") {
    paragraph = avg >= 3.5
      ? "Your nutrition habits provide a solid base for fueling your body. Keep focusing on balanced, nutrient-dense meals, mindful eating, and staying hydrated. These habits will support your workouts, recovery, and overall health."
      : "Optimizing your nutrition can boost your energy, support fat loss or muscle gain, and stabilize mood. Focus on whole foods, consistent meal timing, and hydration. Small, sustainable changes can lead to lasting results.";
  } else if (category === "Stress Management") {
    paragraph = avg >= 3.5
      ? "You appear to manage stress effectively, which is crucial for mental clarity and physical health. Continue incorporating relaxation techniques, setting boundaries, and nurturing supportive relationships."
      : "Managing stress better can enhance your resilience, sleep, and motivation. Explore mindfulness, breathing exercises, or journaling. Building emotional resilience is key to sustainable progress.";
  } else if (category === "Mindset") {
    paragraph = avg >= 3.5
      ? "Your mindset shows strength and adaptability. Maintaining a positive, growth-oriented outlook will empower your journey. Celebrate progress, embrace challenges, and stay curious."
      : "Cultivating a resilient, growth-focused mindset can transform obstacles into opportunities. Practice self-compassion, set realistic goals, and focus on progress over perfection.";
  } else if (category === "Physical Activity") {
    paragraph = avg >= 3.5
      ? "Your activity habits are on track. Keep incorporating enjoyable movement, mixing intensity levels, and celebrating your body's capabilities."
      : "Increasing your physical activity can elevate your energy, mood, and health. Start with small, enjoyable steps—like daily walks or short workouts—and build consistency over time.";
  }

  feedbackHTML += `<h4>${category}</h4><p>${paragraph}</p>`;
}

feedbackHTML += `<p><strong>Next Steps:</strong> Use these insights as a springboard. Focus on your strengths, and choose one or two growth areas to improve gradually. Remember, sustainable change is about progress, not perfection. With personalized coaching, you can turn these insights into an actionable, enjoyable plan that fits your life and goals.</p>`;

resultDiv.innerHTML += feedbackHTML;

// Countdown timer logic
let countdownSeconds = 24 * 60 * 60; // 24 hours
const countdownEl = document.getElementById('countdown-timer');

function updateCountdown() {
  const hours = String(Math.floor(countdownSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((countdownSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(countdownSeconds % 60).padStart(2, '0');
  countdownEl.textContent = `${hours}:${minutes}:${seconds}`;
  if (countdownSeconds > 0) {
    countdownSeconds--;
    setTimeout(updateCountdown, 1000);
  } else {
    countdownEl.textContent = "00:00:00";
  }
}

updateCountdown();
