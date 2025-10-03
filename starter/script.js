const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

let conversationHistory = [];

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to history and display it
  conversationHistory.push({ role: "user", text: userMessage });
  appendMessage("user", userMessage);
  input.value = "";

  // Show a thinking indicator for the bot
  const thinkingMessage = appendMessage("bot", "Gemini is thinking...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation: conversationHistory }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }

    const { success, data, message } = await response.json();

    if (success) {
      // Update the thinking message with the actual response
      thinkingMessage.textContent = data;
      // Add bot response to history
      conversationHistory.push({ role: "model", text: data });
    } else {
      thinkingMessage.textContent = message || "An error occurred.";
    }
  } catch (error) {
    thinkingMessage.textContent = error.message;
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Return the message element
}
