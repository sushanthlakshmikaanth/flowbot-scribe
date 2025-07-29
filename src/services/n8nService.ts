class N8nService {
  private webhookUrl = 'https://n8n.srv928023.hstgr.cloud/webhook/00717b67-9104-4be6-b7d3-ff35bb2a7776/chat';

  async generateResponse(userMessage: string): Promise<string> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          timestamp: new Date().toISOString(),
          source: 'flowternity-chatbot'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Return the response from n8n - adjust this based on your n8n response structure
      return data.response || data.message || data.text || "I received your message but couldn't generate a proper response.";
      
    } catch (error) {
      console.error('Error communicating with n8n:', error);
      return "I'm sorry, I'm having trouble connecting to my AI system right now. Please try again or contact FlowTernity Sports directly at +91 98866 96155 for immediate assistance!";
    }
  }
}

export const n8nService = new N8nService();