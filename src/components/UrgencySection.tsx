import { useState, useEffect, useRef } from 'react';
import { Heart, Clock, Users } from 'lucide-react';

const notifications = [
  { name: 'Maria S.', action: 'se tornou madrinha', time: '2 min' },
  { name: 'João P.', action: 'fez sua primeira doação', time: '5 min' },
  { name: 'Ana L.', action: 'se tornou madrinha', time: '8 min' },
  { name: 'Carlos R.', action: 'apadrinhou uma criança', time: '12 min' },
  { name: 'Fernanda M.', action: 'se tornou voluntária', time: '15 min' },
  { name: 'Ricardo B.', action: 'fez sua primeira doação', time: '18 min' },
  { name: 'Patrícia G.', action: 'se tornou madrinha', time: '22 min' },
  { name: 'Lucas F.', action: 'apadrinhou uma criança', time: '25 min' },
];

const UrgencySection = () => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate progress bar
          setTimeout(() => setProgressWidth(77), 300);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(20 45% 10%) 0%, hsl(20 45% 6%) 100%)' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="text-center mb-12">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <Clock className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Vagas limitadas este mês</span>
          </div>

          <h2 
            className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'hsl(36 100% 96%)' }}
          >
            Apenas <span className="text-gradient-gold">23 Crianças</span>
            <br />
            Aguardam por Você
          </h2>

          <p 
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'hsl(36 40% 70%)' }}
          >
            77 crianças já foram apadrinhadas este mês. Não deixe as outras esperando.
          </p>
        </div>

        {/* Progress Bar */}
        <div 
          className={`max-w-3xl mx-auto mb-12 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <span style={{ color: 'hsl(36 40% 70%)' }} className="text-sm">
              Crianças apadrinhadas
            </span>
            <span className="text-primary font-semibold">
              77 de 100
            </span>
          </div>
          
          <div 
            className="h-4 rounded-full overflow-hidden"
            style={{ background: 'hsl(20 30% 20%)' }}
          >
            <div 
              className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
              style={{ 
                width: `${progressWidth}%`,
                background: 'linear-gradient(90deg, hsl(var(--gold)) 0%, hsl(var(--amber)) 100%)',
              }}
            >
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
                  animation: 'shimmer 2s infinite',
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span style={{ color: 'hsl(36 40% 70%)' }} className="text-sm">
                23 vagas restantes
              </span>
            </div>
            <span className="text-secondary text-sm font-medium animate-pulse">
              Esgotando rápido!
            </span>
          </div>
        </div>

        {/* Live Notification Ticker */}
        <div 
          className={`max-w-md mx-auto mb-12 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div 
            className="rounded-xl p-4 border flex items-center gap-4 overflow-hidden"
            style={{ 
              background: 'hsl(20 30% 15% / 0.8)',
              borderColor: 'hsl(var(--primary) / 0.3)',
            }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-primary" fill="hsl(var(--primary))" />
            </div>
            <div className="overflow-hidden flex-1">
              <div 
                className="transition-all duration-500"
                key={currentNotification}
                style={{ animation: 'slideIn 0.5s ease-out' }}
              >
                <p style={{ color: 'hsl(36 100% 96%)' }} className="font-medium">
                  {notifications[currentNotification].name}{' '}
                  <span style={{ color: 'hsl(36 40% 70%)' }}>
                    {notifications[currentNotification].action}
                  </span>
                </p>
                <p className="text-sm text-primary">
                  há {notifications[currentNotification].time}
                </p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
          </div>
        </div>

        {/* CTA Button */}
        <div 
          className={`text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button className="btn-luminis text-lg px-12 py-5">
            Garantir Minha Vaga Agora
          </button>
          <p style={{ color: 'hsl(36 40% 60%)' }} className="text-sm mt-4">
            Cancele quando quiser • Sem compromisso
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default UrgencySection;
