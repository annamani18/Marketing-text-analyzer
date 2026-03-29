// Get button and add click event
var button = document.getElementById("checkBtn");
button.addEventListener("click", analyzeText);

// Main function to analyze text
function analyzeText() {
    // Get text from textarea
    var text = document.getElementById("inputText").value;

    // Convert to lowercase
    var lowerText = text.toLowerCase();

    // Define phrases to check
    var phrases = ["limited time", "hurry", "exclusive", "offer ends soon", "buy now"];

    // Count total phrases found
    var count = 0;

    // Loop through each phrase
    for (var i = 0; i < phrases.length; i++) {
        // Check if phrase exists in text
        if (lowerText.includes(phrases[i])) {
            count++;
        }
    }

    // Display result
    var resultDiv = document.getElementById("result");

    if (count > 0) {
        resultDiv.innerHTML = "Number of phrases found: " + count + "<br>This text uses strong marketing phrases";
    } else {
        resultDiv.innerHTML = "No marketing pressure phrases found";
    }
}