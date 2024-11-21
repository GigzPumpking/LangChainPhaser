export default class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // Add a basic text display
        this.chatText = this.add.text(50, 50, '', { fontSize: '16px', fill: '#ffffff', wordWrap: { width: 700 } });

        // Track user input and conversation history
        this.userInput = '';
        this.conversationHistory = []; // This will act as memory

        // Display user typing and listen for keyboard input
        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Enter') {
                if (this.userInput.trim()) {
                    const input = this.userInput.trim();
                    this.userInput = ''; // Reset the input field
                    this.chatText.text += `\nYou: ${input}`;
                    this.handleChat(input); // Send input to OpenAI
                }
                return;
            }

            // Allow backspace
            if (event.key === 'Backspace') {
                this.userInput = this.userInput.slice(0, -1);
            } else {
                // Append typed character
                this.userInput += event.key;
            }

            // Display user input in real-time
            this.updateTypingDisplay();
        });
    }

    updateTypingDisplay() {
        const lines = this.chatText.text.split('\n');
        lines[lines.length - 1] = `Typing: ${this.userInput}`;
        this.chatText.text = lines.join('\n');
    }

    async handleChat(input) {
        // Hidden API key
        const apiKey = ''; // Replace with your API key
        const url = 'https://api.openai.com/v1/chat/completions';

        // Add user message to conversation history
        this.conversationHistory.push({ role: 'user', content: input });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: this.conversationHistory, // Send the conversation history
                }),
            });

            const data = await response.json();

            // Add assistant response to conversation history
            const botResponse = data.choices[0].message.content;
            this.conversationHistory.push({ role: 'assistant', content: botResponse });

            // Update the chat text
            this.chatText.text += `\nChatBot: ${botResponse}`;
        } catch (error) {
            console.error('Error:', error);
            this.chatText.text += '\nChatBot: (Error fetching response)';
        }
    }
}
