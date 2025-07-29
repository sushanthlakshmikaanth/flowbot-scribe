class N8nService {
  private webhookUrl = 'https://n8n.srv928023.hstgr.cloud/webhook/00717b67-9104-4be6-b7d3-ff35bb2a7776/chat';

  async generateResponse(userMessage: string): Promise<string> {
    try {
      console.log('Sending to n8n:', { message: userMessage });
      
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

      const data = await response.json();
      console.log('n8n response:', { status: response.status, data });

      if (!response.ok) {
        // Handle n8n workflow errors specifically
        if (data.message) {
          return `❌ n8n Workflow Error: ${data.message}\n\nPlease check your n8n workflow configuration. The chat trigger and AI agent nodes may need adjustment.`;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Return the response from n8n - adjust based on your workflow output structure
      if (data.response) return data.response;
      if (data.message && data.message !== "Error in workflow") return data.message;
      if (data.text) return data.text;
      if (data.output) return data.output;
      
      return "✅ n8n connection successful, but no response content received. Please check your AI agent node output format.";
      
    } catch (error) {
      console.error('Error communicating with n8n:', error);
      return "🔧 Connection Error: Unable to reach n8n workflow. Please verify:\n\n1. n8n workflow is active\n2. Webhook URL is correct\n3. Chat trigger node is properly configured\n4. AI agent node is working\n\nContact FlowTernity Sports at +91 98866 96155 for immediate assistance!";
    }
  }
}

export const n8nService = new N8nService();