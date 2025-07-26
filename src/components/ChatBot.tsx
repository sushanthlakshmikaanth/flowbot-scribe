import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, MessageCircle, Calendar, ExternalLink, Instagram, Globe } from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "🏀 Welcome to FlowTernity Sports! I'm your AI assistant specializing in our multi-sport facility in Horamavu, Bengaluru. I can help you with:\n\n🏢 **Facility Info**: Courts, amenities, booking, programs\n🏃 **General Sports**: Fitness tips, training advice, sports guidance\n💬 **General Questions**: Happy to help with various topics!\n\n💡 Use the quick booking button below or just ask me anything!",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await geminiService.generateResponse(inputValue.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBooking = () => {
    window.open('https://playo.co/venues/horamavu-bengaluru/flowternity-sports-horamavu-bengaluru', '_blank');
  };

  const handleSocialLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <Card className="p-4 bg-gradient-card backdrop-blur-sm shadow-elegant border-primary/20">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-primary" />
          Quick Actions
        </h3>
        <div className="grid gap-2">
          <Button 
            variant="sport" 
            onClick={handleBooking}
            className="justify-start text-sm"
          >
            <Calendar className="w-4 h-4" />
            Book on Playo
          </Button>
          <Button 
            variant="sport" 
            onClick={() => handleSocialLink('https://turf-book-omatic.vercel.app/')}
            className="justify-start text-sm"
          >
            <Calendar className="w-4 h-4" />
            Schedule a Meet
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSocialLink('https://www.instagram.com/flowternity_sports/?hl=en')}
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSocialLink('https://share.google/T3WTGtG79S2pc9jJi')}
            >
              <Globe className="w-4 h-4" />
              Google
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Chatbot */}
      {/* Chatbot Interface */}
    <Card className="h-[600px] flex flex-col bg-gradient-card backdrop-blur-sm shadow-elegant border-primary/20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">FlowTernity Sports Assistant</h3>
          <p className="text-sm text-primary-foreground/80">Ask me anything about our facility!</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-gradient-primary text-primary-foreground' 
                  : 'bg-gradient-secondary text-secondary-foreground'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-primary text-primary-foreground ml-auto'
                      : 'bg-card border shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-secondary text-secondary-foreground flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-card border rounded-2xl px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-card/50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about FlowTernity Sports, general sports, fitness, or anything..."
            className="flex-1 transition-smooth focus:ring-primary"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      </Card>
    </div>
  );
};