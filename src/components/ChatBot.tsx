import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, MessageCircle, Calendar, ExternalLink, Instagram, Globe } from 'lucide-react';
import { n8nService } from '@/services/n8nService';
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
      content: "🏀 Welcome to Flowternity Multisports Facility! I'm your AI assistant specializing in our multi-sport facility in Horamavu, Bengaluru. I can help you with:\n\n🏢 **Facility Info**: Courts, amenities, booking, programs\n🏃 **General Sports**: Fitness tips, training advice, sports guidance\n💬 **General Questions**: Happy to help with various topics!\n\n💡 Use the quick booking button below or just ask me anything!",
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
      const response = await n8nService.generateResponse(inputValue.trim());
      
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
      <Card className="p-4 bg-gradient-card backdrop-blur-sm shadow-elegant border-primary/20 animate-fade-in">
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-transparent bg-gradient-primary bg-clip-text">
          <ExternalLink className="w-4 h-4 text-primary animate-pulse" />
          Quick Actions
        </h3>
        <div className="grid gap-2">
          <Button 
            variant="sport" 
            onClick={handleBooking}
            className="justify-start text-sm hover-scale group relative overflow-hidden"
          >
            <Calendar className="w-4 h-4 group-hover:animate-pulse" />
            Book on Playo
          </Button>
          <Button 
            variant="sport" 
            onClick={() => handleSocialLink('https://turf-book-omatic.vercel.app/')}
            className="justify-start text-sm hover-scale group relative overflow-hidden bg-gradient-to-r from-primary to-primary-glow"
          >
            <Calendar className="w-4 h-4 group-hover:animate-pulse" />
            Schedule a Meet
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => handleSocialLink('https://www.instagram.com/flowternity_sports/?hl=en')}
              className="hover-scale group"
            >
              <Instagram className="w-4 h-4 group-hover:animate-pulse" />
              Instagram
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => handleSocialLink('https://share.google/T3WTGtG79S2pc9jJi')}
              className="hover-scale group"
            >
              <Globe className="w-4 h-4 group-hover:animate-pulse" />
              View Website
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Chatbot */}
      <Card className="h-[600px] flex flex-col bg-gradient-card backdrop-blur-sm shadow-elegant border-primary/20 relative overflow-hidden animate-scale-in">
        {/* Animated background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        
        {/* Header */}
        <div className="relative flex items-center gap-3 p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-glow animate-pulse">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Flowternity Multisports Assistant</h3>
            <p className="text-sm text-primary-foreground/80">Ask me anything about our facility!</p>
          </div>
          <div className="ml-auto flex space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-2 h-2 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 relative">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 animate-fade-in ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md hover-scale ${
                  message.role === 'user' 
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
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
                    className={`rounded-2xl px-4 py-3 transition-smooth hover-scale ${
                      message.role === 'user'
                        ? 'bg-gradient-primary text-primary-foreground ml-auto shadow-glow'
                        : 'bg-card border shadow-elegant backdrop-blur-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 opacity-60">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-gradient-secondary text-secondary-foreground flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-card border rounded-2xl px-4 py-3 shadow-elegant backdrop-blur-sm">
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
        <div className="relative p-4 border-t bg-gradient-subtle backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Flowternity Multisports, general sports, fitness, or anything..."
              className="flex-1 transition-smooth focus:ring-primary focus:shadow-glow border-primary/20 bg-card/80 backdrop-blur-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-primary hover:shadow-glow transition-smooth hover-scale relative overflow-hidden"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-4 py-2 border-t bg-gradient-subtle backdrop-blur-sm">
          <p className="text-xs text-center text-muted-foreground/60">
            Developed by <span className="text-primary font-medium">Projxpt X LoopZen</span>
          </p>
        </div>
      </Card>
    </div>
  );
};