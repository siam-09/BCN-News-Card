import { useState, FormEvent } from 'react';
import { Mail, Facebook, MessageSquare, Send, Check } from 'lucide-react';

export function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMsg('');
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-brand-light-gray scroll-mt-12 border-t-2 border-brand-red/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block bg-brand-red text-white text-[10px] font-black px-2 py-0.5 mb-3 uppercase tracking-widest">
            SECURE ROUTE
          </div>
          <h2 className="font-display font-black text-3.5xl sm:text-5xl text-white tracking-tight leading-none uppercase">
            Get In touch with BCN Support
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            Have feature suggestions, custom template requests, or digital newsroom inquiries? Shoot us a secure message or sync up with our team channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* LEFT: Contact Cards info with bold geometric styling */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email card */}
            <div className="bg-brand-gray border-2 border-brand-red rounded-none p-6 shadow-[4px_4px_0px_0px_#09090b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#e50914] text-white">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-brand-red border border-brand-dark text-white rounded-none">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-450 font-bold uppercase tracking-wider">EMAIL ADDRESS</h4>
                  <p className="text-white font-black text-sm">
                    <a href="mailto:teambcnofficiall@gmail.com" className="hover:text-brand-red transition-colors">teambcnofficiall@gmail.com</a>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Typical response within 12 hours.</p>
                </div>
              </div>
            </div>

            {/* Facebook Card */}
            <div className="bg-brand-gray border-2 border-brand-red rounded-none p-6 shadow-[4px_4px_0px_0px_#09090b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#e50914] text-white">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#1877F2] border border-brand-dark text-white rounded-none">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-450 font-bold uppercase tracking-wider">FACEBOOK</h4>
                  <p className="text-white font-black text-sm">
                    <a href="https://facebook.com/bcnofficial" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">facebook.com/bcnofficial</a>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Custom alerts, news loops & tutorials.</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-brand-gray border-2 border-brand-red rounded-none p-6 shadow-[4px_4px_0px_0px_#09090b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#e50914] text-white">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#25D366] border border-brand-dark text-white rounded-none">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-gray-450 font-bold uppercase tracking-wider">WHATSAPP CHAT</h4>
                  <p className="text-white font-black text-xs sm:text-sm flex flex-col gap-1">
                    <a href="https://wa.me/601168612313" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors font-bold">+601168612313</a>
                    <a href="https://wa.me/8801340142313" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors font-bold">+8801340142313</a>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Instant interactive help.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Direct Message Form with raw bold borders */}
          <div className="lg:col-span-7 bg-brand-gray rounded-none border-2 border-brand-red p-6 md:p-8 shadow-[6px_6px_0px_0px_#09090b] text-white">
            <h3 className="font-display font-black text-lg text-white uppercase tracking-tight mb-6">Send A Direct Message</h3>
            
            {submitted ? (
              <div className="bg-brand-red/5 border-2 border-brand-red p-8 text-center space-y-3 animate-fade-in">
                <div className="inline-flex p-3 bg-brand-red text-white border border-brand-dark mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-display font-black text-white text-base uppercase">Message Transmitted!</h4>
                <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
                  Thank you for contacting BCN News. Our media desk has safely registered your secure packet and will follow up shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-brand-dark text-white p-3 rounded-none border-2 border-brand-red/50 focus:border-brand-red outline-none text-xs font-semibold placeholder:text-gray-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-brand-dark text-white p-3 rounded-none border-2 border-brand-red/50 focus:border-brand-red outline-none text-xs font-semibold placeholder:text-gray-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">Message Description</label>
                  <textarea 
                    required
                    rows={4}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Describe how we can assist you or your publishing group..."
                    className="w-full bg-brand-dark text-white p-3 rounded-none border-2 border-brand-red/50 focus:border-brand-red outline-none text-xs font-semibold placeholder:text-gray-500 resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-red hover:bg-brand-red-hover text-white border-2 border-brand-dark rounded-none font-display font-bold uppercase tracking-widest text-xs transition-all cursor-pointer shadow-[3px_3px_0px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Secure Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
