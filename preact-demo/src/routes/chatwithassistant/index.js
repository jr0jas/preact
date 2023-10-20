import { h, Component } from 'preact';
import openai from 'openai';
// Initialize the OpenAI library with your API key
openai.apiKey = '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';

class ChatWithAssistant extends Component {
    state = {
        question: '',
        assistantResponse: '',
    };

    onQuestionChange = (e) => {
        this.setState({ question: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { question } = this.state;

        // Check if OpenAI apiKey is set
        if (!openai.apiKey) {
            console.error("OpenAI API key is not set.");
            return;
        }

        // Send the user's question to the OpenAI API
        const response = await this.askAssistant(question);

        // Update the state with the assistant's response
        this.setState({ assistantResponse: response });
    };

    async askAssistant(question) {
        try {
            // Make an API request to OpenAI
            const response = await openai.ChatCompletion.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: question },
                ],
            });

            // Extract and return the assistant's reply
            return response.choices[0].message.content;
        } catch (error) {
            console.error("Error asking the assistant:", error);
            return "An error occurred while communicating with the assistant.";
        }
    }

    render(_, { question, assistantResponse }) {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={question}
                        onInput={this.onQuestionChange}
                        placeholder="Ask a question..."
                    />
                    <button type="submit">Ask</button>
                </form>
                {assistantResponse && (
                    <div>
                        <p>You asked: {question}</p>
                        <p>Assistant's response: {assistantResponse}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default ChatWithAssistant;
