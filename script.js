// Get buttons and add click events
var analyzeButton = document.getElementById("checkBtn");
var exampleButton = document.getElementById("exampleBtn");

analyzeButton.addEventListener("click", analyzeText);
exampleButton.addEventListener("click", fillExample);

// Define marketing phrases organized by category
var marketingPhrases = {
    urgency: [
        "hurry", "limited time", "only few left", "offer ends soon",
        "act now", "don't miss out", "last chance", "today only",
        "expires soon", "while supplies last"
    ],
    persuasion: [
        "exclusive", "best deal", "special offer", "amazing",
        "incredible", "unbeatable", "guaranteed", "free",
        "discount", "save money", "lowest price"
    ],
    socialProof: [
        "1000+ bought", "best selling", "top rated", "customer favorite",
        "most popular", "trusted by", "join thousands", "highly rated",
        "5 star", "recommended"
    ]
};

// Function to fill example text
function fillExample() {
    var exampleText = "Hurry! Limited time offer! Only a few left. 1000+ customers already bought this!";
    document.getElementById("inputText").value = exampleText;
}

// Main function to analyze text
function analyzeText() {
    // Get text from textarea
    var text = document.getElementById("inputText").value;

    // Check if text is empty
    if (text.trim() === "") {
        document.getElementById("result").innerHTML = '<p class="no-result">Please enter some text to analyze.</p>';
        return;
    }

    // Convert to lowercase for checking
    var lowerText = text.toLowerCase();

    // Store found phrases by category
    var foundPhrases = {
        urgency: [],
        persuasion: [],
        socialProof: []
    };

    // Check each category
    for (var category in marketingPhrases) {
        var phrases = marketingPhrases[category];

        // Loop through each phrase in this category
        for (var i = 0; i < phrases.length; i++) {
            var phrase = phrases[i];

            // Check if phrase exists in text
            if (lowerText.includes(phrase)) {
                foundPhrases[category].push(phrase);
            }
        }
    }

    // Calculate total phrases found
    var totalCount = foundPhrases.urgency.length +
                     foundPhrases.persuasion.length +
                     foundPhrases.socialProof.length;

    // Calculate marketing strength score (out of 100)
    // Simple formula: each phrase adds points, max at 10 phrases
    var score = Math.min(totalCount * 10, 100);

    // Display results
    displayResults(foundPhrases, totalCount, score);
}

// Function to display results in a nice format
function displayResults(foundPhrases, totalCount, score) {
    var resultDiv = document.getElementById("result");

    // If no phrases found
    if (totalCount === 0) {
        resultDiv.innerHTML = '<p class="no-result">No marketing phrases detected. This text appears neutral.</p>';
        return;
    }

    // Build HTML for results
    var html = '';

    // Marketing Strength Score
    html += '<div class="score-section">';
    html += '<div>Marketing Strength Score</div>';
    html += '<div class="score-number">' + score + '/100</div>';
    html += '</div>';

    // Category breakdown
    html += '<h3 style="margin-bottom: 15px;">Category Breakdown:</h3>';

    // Urgency category
    if (foundPhrases.urgency.length > 0) {
        html += '<div class="category-section">';
        html += '<div class="category-title">⏰ Urgency';
        html += '<span class="category-count">' + foundPhrases.urgency.length + '</span>';
        html += '</div>';
        html += '<ul class="phrase-list">';
        for (var i = 0; i < foundPhrases.urgency.length; i++) {
            html += '<li class="phrase-item">• <span class="phrase-highlight">"' + foundPhrases.urgency[i] + '"</span></li>';
        }
        html += '</ul>';
        html += '</div>';
    }

    // Persuasion category
    if (foundPhrases.persuasion.length > 0) {
        html += '<div class="category-section">';
        html += '<div class="category-title">💎 Persuasion';
        html += '<span class="category-count">' + foundPhrases.persuasion.length + '</span>';
        html += '</div>';
        html += '<ul class="phrase-list">';
        for (var i = 0; i < foundPhrases.persuasion.length; i++) {
            html += '<li class="phrase-item">• <span class="phrase-highlight">"' + foundPhrases.persuasion[i] + '"</span></li>';
        }
        html += '</ul>';
        html += '</div>';
    }

    // Social Proof category
    if (foundPhrases.socialProof.length > 0) {
        html += '<div class="category-section">';
        html += '<div class="category-title">👥 Social Proof';
        html += '<span class="category-count">' + foundPhrases.socialProof.length + '</span>';
        html += '</div>';
        html += '<ul class="phrase-list">';
        for (var i = 0; i < foundPhrases.socialProof.length; i++) {
            html += '<li class="phrase-item">• <span class="phrase-highlight">"' + foundPhrases.socialProof[i] + '"</span></li>';
        }
        html += '</ul>';
        html += '</div>';
    }

    // Explanation section
    html += '<div class="explanation-section">';
    html += '<div class="explanation-title">📊 Why this result?</div>';
    html += '<p>We detected <strong>' + totalCount + ' marketing phrase(s)</strong> in your text:</p>';
    html += '<ul style="margin-top: 10px;">';

    if (foundPhrases.urgency.length > 0) {
        html += '<li><strong>Urgency phrases</strong> create time pressure and encourage quick action.</li>';
    }
    if (foundPhrases.persuasion.length > 0) {
        html += '<li><strong>Persuasion phrases</strong> highlight value and benefits to convince buyers.</li>';
    }
    if (foundPhrases.socialProof.length > 0) {
        html += '<li><strong>Social proof phrases</strong> build trust by showing others have purchased.</li>';
    }

    html += '</ul>';
    html += '<p style="margin-top: 10px;">Your marketing strength score is based on the total number of phrases detected.</p>';
    html += '</div>';

    // Set the HTML
    resultDiv.innerHTML = html;
}