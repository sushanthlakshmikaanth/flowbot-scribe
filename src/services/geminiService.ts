import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDBwrw9d6Z9_nIh23ex0ds8PmZ00IZK_U8';

const genAI = new GoogleGenerativeAI(API_KEY);

// Knowledge base about FlowTernity Sports
const FLOWTERNITY_DATA = `
FLOWTERNITY SPORTS - COMPLETE INFORMATION

BASIC INFORMATION:
- Name: FlowTernity Sports - Multi Sport Facility
- Location: 1456, Old Flour Mill road Dodda Kempaih Layout, Kalkere, Horamavu, Bengaluru, Karnataka 560043
- Phone: +91 98866 96155
- Website: http://flowternity.com/
- Rating: 5.0 stars (14 Google reviews, 5 Playo reviews)
- Operating Hours: 6 AM - 11 PM (Daily)
- Status: Currently operational

SPORTS AVAILABLE:
- Basketball (Two International Standard Basketball Courts)
- Pickleball
- Skating/Skateboarding
- Calisthenics
- Karate
- Multi-sport activities

AMENITIES:
✓ Parking
✓ Washroom
✓ Changing Room
✓ Shower
✓ Seating Gallery
✓ Cafe
✓ Workout Area
✓ Ice Bath

PROGRAMS & ACTIVITIES:
- Basketball Summer Camps
- 3V3 Basketball Tournaments
- Skating classes
- Multi-sport training programs
- Professional coaching available

SOCIAL MEDIA:
- Instagram: @flowternity_sports (310+ followers)
- Facebook: Flowternity Sports - Multi Sport Facility (700+ followers)
- YouTube: Flowternity channel

SPECIAL FEATURES:
- International standard courts
- Professional-grade facilities
- Modern equipment
- Expert coaching staff
- Community tournaments and events
- Youth programs and camps

NEARBY LANDMARKS:
- Located just before Green Gardenia Restaurant on Kalkere Main Road
- Closest Metro station: KR Puram (4 km away)

BOOKING INFORMATION:
- Primary booking platform: Playo (https://playo.co/venues/horamavu-bengaluru/flowternity-sports-horamavu-bengaluru)
- Direct booking available via phone: +91 98866 96155
- Bulk/Corporate booking options available
- Online booking recommended for convenience

SOCIAL MEDIA & LINKS:
- Instagram: @flowternity_sports (310+ followers) - https://www.instagram.com/flowternity_sports/?hl=en
- Facebook: Flowternity Sports - Multi Sport Facility (700+ followers)
- YouTube: Flowternity channel
- Google Business: https://share.google/T3WTGtG79S2pc9jJi
- Website: http://flowternity.com/
- Athletes of all skill levels
- Youth and children
- Adults seeking fitness
- Corporate groups
- Sports enthusiasts
- Basketball players
- Skating enthusiasts
`;

class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      const systemPrompt = `You are FlowTernity Sports AI Assistant, a friendly and knowledgeable chatbot for FlowTernity Sports facility in Bengaluru. Your role is to help users with information about the facility, sports programs, booking, and general inquiries.

PERSONALITY:
- Enthusiastic about sports and fitness
- Helpful and informative
- Friendly and approachable
- Professional yet conversational
- Encouraging people to stay active

KNOWLEDGE BASE:
${FLOWTERNITY_DATA}

GUIDELINES:
1. Always provide accurate information based on the knowledge base above
2. If asked about something not in your knowledge base, politely say you don't have that specific information
3. Encourage users to visit the facility or contact directly for detailed inquiries
4. Be enthusiastic about sports and fitness
5. Help with booking inquiries by directing to Playo platform or direct contact
6. Mention relevant amenities and programs when appropriate
7. Keep responses conversational and helpful
8. Always end with an invitation to visit, book, or contact for more information
9. When users ask about booking, guide them to use the booking button or visit the Playo link
10. Include social media links when discussing online presence

IMPORTANT BOOKING INSTRUCTIONS:
- For immediate booking: Direct users to click the "Book on Playo" button or visit: https://playo.co/venues/horamavu-bengaluru/flowternity-sports-horamavu-bengaluru
- For phone booking: +91 98866 96155
- Mention that online booking through Playo is the fastest and most convenient option

USER QUESTION: ${userMessage}

Please provide a helpful and informative response:`;

      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again or contact FlowTernity Sports directly at +91 98866 96155 for immediate assistance!";
    }
  }
}

export const geminiService = new GeminiService();