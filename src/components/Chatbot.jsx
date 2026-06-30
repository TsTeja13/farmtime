import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sprout, 
  Check, 
  BookOpen, 
  HelpCircle,
  Sparkles,
  Key,
  ShieldCheck,
  Zap
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "How to make Jeevamrutha?",
  "How to make Neemastra organic pesticide?",
  "Prevent Tomato Early Blight naturally?",
  "What is crop rotation & why use it?",
  "How to manage low Nitrogen (N) in soil?",
  "What are the 4 pillars of ZBNF?"
];

const BOT_KNOWLEDGE = [
  {
    keywords: ['jeevamrutha', 'jeevamrit', 'microbial', 'bio-fertilizer'],
    response: `### 🌿 How to Prepare Jeevamrutha (Liquid Bio-fertilizer)
**Jeevamrutha** is a rich culture of micro-organisms that multiplies beneficial soil bacteria.

**Ingredients needed (for 200 Litres - 1 Acre):**
1. **Water**: 200 Litres
2. **Local Cow Dung**: 10 kg (fresh is best)
3. **Local Cow Urine**: 5 to 10 Litres
4. **Jaggery (Unrefined Sugar)**: 2 kg (or 2L sugarcane juice)
5. **Pulse Flour** (Gram/Chickpea/Pigeon pea): 2 kg
6. **Virgin Forest Soil**: A handful (contains rich native microbes)

**Steps of Preparation:**
1. Put 200L of water in a large plastic drum.
2. Add cow dung and cow urine. Mix well.
3. Add crushed jaggery, pulse flour, and forest soil.
4. Stir the solution thoroughly with a wooden stick in a **clockwise direction** (this helps aerate the aerobic bacteria).
5. Cover the drum with a gunny bag or cotton cloth. Store under shade.
6. **Fermentation**: Let it ferment for **4 to 7 days**. Stir the mixture clockwise twice a day for 5 minutes.

**Application:**
- Dilute it with irrigation water (1:10 ratio) or spray it directly on soil near plant root zones during watering.
- Repeat every **14 to 21 days** for maximum soil health.`
  },
  {
    keywords: ['neemastra', 'neem astra', 'insecticide', 'pest control', 'insects', 'pests'],
    response: `### 🦟 How to Prepare Neemastra (Natural Pest Repellent)
**Neemastra** is highly effective against sucking pests, aphids, jassids, thrips, and small leaf-eating caterpillars.

**Ingredients needed (for 100 Litres):**
1. **Water**: 100 Litres
2. **Cow Urine**: 5 Litres
3. **Cow Dung**: 2 kg
4. **Neem Leaves & Tender twigs**: 5 kg (crushed/pounded into paste)

**Steps of Preparation:**
1. Fill a container with 100L water. Add 5L cow urine and 2kg cow dung.
2. Crushed the 5kg neem leaves/twigs to form a thick paste. Add this paste to the container.
3. Stir the mixture clockwise with a wooden stick.
4. Cover it with a gunny bag and place it in the shade.
5. Let it ferment for **48 hours (2 days)**. Stir it clockwise twice daily.
6. Filter the solution using a fine cotton cloth.

**Application:**
- Spray directly on leaves without dilution. Do not store for more than **6 months**.`
  },
  {
    keywords: ['tomato', 'early blight', 'late blight', 'blight', 'fungus', 'spots'],
    response: `### 🍅 Natural Control of Tomato Blights (Early & Late Blight)
Blights are fungal diseases that thrive in warm, humid weather. 

**Natural Treatment Options:**
1. **Sour Buttermilk Spray**: 
   - Take 1L of buttermilk and let it sour for 4-5 days (it should smell tangy/acidic).
   - Mix 1L sour buttermilk with 10L water.
   - Spray on both sides of tomato leaves. The lactic acid bacteria act as a natural fungicide.
2. **Baking Soda Formulation**:
   - Mix 1 tablespoon of baking soda, 1 tsp organic liquid soap, and 1 tsp neem oil in 4L water. Spray weekly.
3. **Neemastra Spray**:
   - Spray undiluted Neemastra on plants to check fungal spore growth and repel insect vectors.

**Agronomic Practices:**
- **Pruning**: Cut off lower leaves touching the soil (where spores splash up).
- **Watering**: Never use overhead sprinklers. Use drip or water at root level.
- **Mulching**: Mulch with dry straw to create a physical barrier between soil spores and leaves.`
  },
  {
    keywords: ['crop rotation', 'rotation', 'legumes', 'soil fertility'],
    response: `### 🔄 Crop Rotation Principles
**Crop rotation** is the practice of growing a series of dissimilar crop types in the same area in sequential seasons.

**Key Benefits:**
1. **Nutrient Balance**: Leguminous crops (beans, chickpeas, peas, cowpeas) have root nodules containing *Rhizobium* bacteria which **fix atmospheric nitrogen** directly into the soil. Following them with heavy-nitrogen feeders like Corn, Wheat, or Tomato balances soil depletion.
2. **Break Pest Cycles**: Pests are highly crop-specific. If you grow Tomatoes every year, tomato-specific pests hibernate in soil and multiply. Planting a crop from a different family (e.g., Mustard or Onions) starves those pests.
3. **Soil Structure**: Deep-rooted crops (like cotton or pigeon pea) break up compacted subsoil, while shallow-rooted crops cover topsoil.

**Recommended 3-Year Rotation:**
- **Year 1**: Heavy feeders (Tomatoes, Maize, Potatoes)
- **Year 2**: Legumes / Nitrogen Fixers (Beans, Lentils, Peas)
- **Year 3**: Soil Builders / Light Feeders (Onion, Garlic, Carrots, Radish)`
  },
  {
    keywords: ['nitrogen', 'low nitrogen', 'n deficit', 'yellow leaves', 'urea'],
    response: `### 🧪 Managing Soil Nitrogen (N) Deficits Naturally
Nitrogen is crucial for vegetative green growth and leaf chlorophyll development.

**Symptoms of N Deficit:**
- Older leaves turning pale green or completely yellow starting from the leaf tips.
- Stunted plant growth and small leaf sizes.

**Organic Remedies to Restore Nitrogen:**
1. **Compost Tea**: Spray liquid compost extract directly on foliage for immediate absorption.
2. **Alfalfa Meal or Cottonseed Meal**: Work these plant-based meals into the soil.
3. **Neem Cake Powder**: Apply neem cake to the soil. It contains nitrogen and acts as a nitrification inhibitor, preventing nitrogen from leaching.
4. **Liquid Jeevamrutha**: Apply near roots; it releases nitrogen-fixing bacteria into the soil.
5. **Cover Cropping**: Plant Sunn hemp or Clover during fallow cycles and plow them back into the soil (green manuring).`
  },
  {
    keywords: ['zbnf', 'zero budget', 'subhash palekar', 'natural farming', 'organic farming'],
    response: `### 🌾 The 4 Pillars of Zero Budget Natural Farming (ZBNF)
ZBNF was popularized by agriculturist Subhash Palekar to reduce farmers' input dependency and debt.

**The Four Main Pillars:**
1. **Jeevamrutha (Microbial Inoculant)**: Made from cow dung, urine, jaggery, pulse flour, and forest soil. It boosts soil biology and activates earthworms.
2. **Bijamrutha (Seed Treatment)**: Made from cow dung, urine, lime, and soil. Used to coat seeds before sowing to protect them from seed-borne diseases.
3. **Acchhadana (Mulching)**:
   - *Soil Mulch*: Prevents deep tilling, keeps topsoil aerated.
   - *Straw Mulch*: Covers soil with crop residue to preserve moisture, prevent weed growth, and feed soil biota.
   - *Live Mulch*: Growing intercrops to cover soil surfaces.
4. **Whapasa (Moisture Conservation)**: Creating a microclimate where air and water molecules are balanced in the soil pores. It reduces water requirement by up to 90%.`
  },
  {
    keywords: ['soil health', 'test soil', 'soil testing', 'ph', 'phosphorus', 'potassium'],
    response: `### 🔬 How to Test and Manage Soil Health
A healthy soil should have high organic carbon, balanced pH (6.0 - 7.2), and active microbial life.

**Basic DIY Soil Health Checks:**
1. **Earthworm Test**: Dig a 6x6x6 inch cube of soil. Count the earthworms. If you find **5 or more earthworms**, your soil has excellent biological health.
2. **pH Vinegar/Baking Soda Test**:
   - Collect soil. Mix with water. Add vinegar. If it fizzes, soil is alkaline (pH > 7.5).
   - Take fresh soil. Mix with water. Add baking soda. If it fizzes, soil is acidic (pH < 6.0).
3. **Infiltration Test**: Pour water over the soil. If it drains too fast, it is sandy. If water pools for hours, it is clayey. Organic matter (compost) cures both problems!

**Remedies for Soil Nutrient Health:**
- **For Acidic Soil**: Add agricultural lime or wood ash.
- **For Alkaline Soil**: Add compost, peat moss, or agricultural gypsum.`
  }
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! I am **Krishi Mitra**, your digital agriculture officer. How can I help you improve your crop yields, treat plant diseases, or prepare natural farming solutions today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem('farmtime_gemini_key') || '');
  const [isKeySaved, setIsKeySaved] = useState(!!localStorage.getItem('farmtime_gemini_key'));
  const [showKeyInput, setShowKeyInput] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Save/Delete Key handlers
  const handleSaveKey = () => {
    if (geminiKey.trim()) {
      localStorage.setItem('farmtime_gemini_key', geminiKey.trim());
      setIsKeySaved(true);
      setShowKeyInput(false);
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('farmtime_gemini_key');
    setGeminiKey('');
    setIsKeySaved(false);
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    const userMessage = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMessage]);
    
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Call Real Gemini API if key is present
    if (isKeySaved && geminiKey.trim()) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey.trim()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are Krishi Mitra, a friendly and extremely knowledgeable Indian Agricultural Officer & Natural Farming Expert. Answer this query in a supportive, practical, structured manner using headings (###), bold tags (**), bullet points, and appropriate farming emojis. Keep answers clear and easy to read. Query: ${query}`
                }]
              }]
            })
          }
        );

        if (!response.ok) {
          throw new Error(`API returned error status: ${response.status}`);
        }

        const data = await response.json();
        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated from Gemini.';

        setMessages((prev) => [...prev, {
          sender: 'bot',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [...prev, {
          sender: 'bot',
          text: `⚠️ **API Connection Error**: Failed to fetch answers from Gemini server. Falling back to local offline mode.\n\nError details: ${err.message}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        // Fallback to local
        triggerLocalFallback(query);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Local fallback lookup
      setTimeout(() => {
        triggerLocalFallback(query);
        setIsTyping(false);
      }, 800);
    }
  };

  const triggerLocalFallback = (query) => {
    const lowerQuery = query.toLowerCase();
    let responseText = '';

    // Check knowledge base
    const matched = BOT_KNOWLEDGE.find(item => 
      item.keywords.some(keyword => lowerQuery.includes(keyword))
    );

    if (matched) {
      responseText = matched.response;
    } else {
      responseText = `### 🌱 Thank you for asking Krishi Mitra!
I'm analyzing your question: *"${query}"*. 

As an Agricultural Officer, here are general guidelines:
1. **Soil Fertility**: Ensure you add compost or **Jeevamrutha** periodically rather than relying entirely on synthetic chemical urea.
2. **Pest Control**: Try natural sprays like **Neemastra** or **Sour Buttermilk** before introducing hazardous chemical pesticides.
3. **Water Management**: Drip irrigation preserves soil structure and prevents fungal spores on plant foliage.

Could you clarify if you are asking about a specific plant (like tomato, potato, rice) or a natural preparation recipe? Try typing **Jeevamrutha** or **Neemastra** for exact step-by-step recipes!`;
    }

    setMessages((prev) => [...prev, {
      sender: 'bot',
      text: responseText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Helper to render markdown-like structures in chat bubble (headers, bold, lists)
  const renderMessageText = (text) => {
    return text.split('\n').map((line, idx) => {
      let content = line;

      // Header H3
      if (content.startsWith('### ')) {
        content = content.replace('### ', '');
        return <h3 key={idx} className="h4 text-primary mt-2 mb-1">{content}</h3>;
      }
      // Header H4
      if (content.startsWith('#### ')) {
        content = content.replace('#### ', '');
        return <h4 key={idx} className="text-sm font-semibold text-secondary mt-1">{content}</h4>;
      }

      // Bold tag formatting **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-secondary-deep font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      const renderedLine = parts.length > 0 ? parts : content;

      // Unordered lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const listContent = line.trim().substring(2);
        return <li key={idx} className="text-xs text-muted ml-4 list-disc mt-1">{listContent}</li>;
      }

      // Ordered lists
      if (/^\d+\.\s/.test(line.trim())) {
        const listContent = line.trim().replace(/^\d+\.\s/, '');
        return <li key={idx} className="text-xs text-muted ml-4 list-decimal mt-1">{listContent}</li>;
      }

      return <p key={idx} className="text-xs text-muted leading-relaxed mb-1">{renderedLine}</p>;
    });
  };

  return (
    <div className="fade-in max-w-4xl mx-auto flex-col h-[calc(100vh-140px)]">
      {/* Bot Header */}
      <div className="glass-card p-4 flex justify-between items-center shrink-0 mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="icon-wrapper bg-primary-10 relative">
            <Bot className="text-primary icon-md" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border border-white" />
          </div>
          <div>
            <h2 className="h3 flex items-center gap-1.5">
              Krishi Mitra AI <Sparkles className="icon-xs text-warning fill-warning" />
            </h2>
            <p className="text-xs text-muted">Agricultural Expert & Organic Farming Advisor • Online</p>
          </div>
        </div>

        {/* AI Key Connector Button */}
        <div className="flex gap-2 items-center">
          {isKeySaved ? (
            <button 
              onClick={handleClearKey}
              className="btn btn-xs btn-outline border-success text-success hover:bg-success-10 flex items-center gap-1 font-semibold"
              title="Click to clear key"
            >
              <ShieldCheck className="w-3 h-3 text-success animate-pulse" /> Live Gemini AI Active
            </button>
          ) : (
            <button 
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="btn btn-xs btn-outline border-warning text-warning-deep hover:bg-warning-10 flex items-center gap-1 font-semibold"
            >
              <Key className="w-3 h-3" /> Connect Gemini Key
            </button>
          )}
          <span className="badge badge-accent hidden sm:inline-flex"><Sprout className="icon-xs" /> ZBNF Specialist</span>
        </div>
      </div>

      {/* API Key Inline Drawer */}
      {showKeyInput && !isKeySaved && (
        <div className="glass-card p-4 mb-4 flex gap-2 items-center justify-between border-warning border fade-in shrink-0">
          <div className="flex-1 flex gap-2 items-center">
            <Key className="icon-xs text-warning" />
            <input 
              type="password"
              placeholder="Paste Google Gemini API Key (e.g. AIzaSy...)"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="form-input text-xs flex-1 h-8 py-1"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="btn btn-primary btn-xs py-1.5 px-3 font-semibold" onClick={handleSaveKey}>Save</button>
            <button className="btn btn-outline btn-xs py-1.5 px-3 font-semibold" onClick={() => setShowKeyInput(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-3-1 flex-1 min-h-0 gap-4">
        {/* Chat window panel */}
        <div className="glass-card flex-col flex-1 min-h-0 overflow-hidden relative">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`icon-wrapper shrink-0 ${msg.sender === 'user' ? 'bg-secondary-10 text-secondary' : 'bg-primary-10 text-primary'} h-8 w-8 rounded-full`}>
                  {msg.sender === 'user' ? <User className="icon-xs" /> : <Bot className="icon-xs" />}
                </div>
                
                <div className={`p-4 rounded-2xl flex-col shadow-sm border ${
                  msg.sender === 'user' 
                    ? 'bg-secondary-5 border-secondary-10 text-right rounded-tr-none' 
                    : 'bg-glass border-muted rounded-tl-none'
                }`}>
                  <div className="text-left">
                    {renderMessageText(msg.text)}
                  </div>
                  <span className="text-[9px] text-muted-dark mt-2 block self-end">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 max-w-[80%] self-start">
                <div className="icon-wrapper bg-primary-10 text-primary h-8 w-8 rounded-full shrink-0">
                  <Bot className="icon-xs" />
                </div>
                <div className="bg-glass border p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="dot bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="dot bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="dot bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Inputs */}
          {messages.length === 1 && (
            <div className="p-4 border-t flex-col gap-2 shrink-0 bg-muted-5">
              <p className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                <HelpCircle className="icon-xs" /> Common Topics to Ask:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="btn btn-xs btn-outline hover-bg"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text input area */}
          <div className="p-4 border-t flex gap-2 shrink-0 bg-glass items-center">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isKeySaved ? "Ask Krishi Mitra AI anything..." : "Ask about crops, pests, Jeevamrutha preparation..."} 
              className="form-input flex-1"
              disabled={isTyping}
            />
            <button 
              onClick={() => handleSend()}
              className="btn btn-primary h-10 w-10 p-0 flex items-center justify-center shrink-0"
              disabled={isTyping}
            >
              <Send className="icon-xs" />
            </button>
          </div>
        </div>

        {/* Sidebar Info Panel */}
        <div className="glass-card p-4 hidden md:flex flex-col gap-4 animate-fade-in">
          <h3 className="h4 flex items-center gap-1.5 border-b pb-2">
            <BookOpen className="text-primary icon-xs" /> Organic Glossary
          </h3>
          <div className="flex-col gap-3 text-xs overflow-y-auto pr-1">
            <div className="p-2.5 bg-success-5 rounded-lg border-l-3 border-success">
              <h4 className="font-semibold text-success mb-1">Neemastra</h4>
              <p className="text-muted leading-tight">Crushed neem leaves + cow urine/dung. Excellent insect repellent for sucking pests.</p>
            </div>
            <div className="p-2.5 bg-primary-5 rounded-lg border-l-3 border-primary">
              <h4 className="font-semibold text-primary mb-1">Jeevamrutha</h4>
              <p className="text-muted leading-tight">Fermented cow dung/urine + pulse flour + jaggery. Massive soil bacterial booster.</p>
            </div>
            <div className="p-2.5 bg-warning-5 rounded-lg border-l-3 border-warning">
              <h4 className="font-semibold text-warning-deep mb-1">Agniastra</h4>
              <p className="text-muted leading-tight">Cow urine + tobacco + green chillies + garlic. Hot formulation for caterpillar control.</p>
            </div>
            <div className="p-2.5 bg-danger-5 rounded-lg border-l-3 border-danger">
              <h4 className="font-semibold text-danger mb-1">Bijamrutha</h4>
              <p className="text-muted leading-tight">Seed coat formulation of cow dung, urine, lime, and soil to prevent fungal infections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
