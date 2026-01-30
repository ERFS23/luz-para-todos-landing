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
      className="py-12 sm:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(20 45% 10%) 0%, hsl(20 45% 6%) 100%)' }}
    >
      {/* Animated background particles - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
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
        <div className="text-center mb-8 sm:mb-12">
          <div 
            className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-4 sm:mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">Vagas limitadas este mês</span>
          </div>

          <h2 
            className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'hsl(36 100% 96%)' }}
          >
            Apenas <span className="text-gradient-gold">23 Crianças</span>
            <br />
            Aguardam por Você
          </h2>

          <p 
            className={`text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 px-2 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'hsl(36 40% 70%)' }}
          >
            77 crianças já foram apadrinhadas este mês. Não deixe as outras esperando.
          </p>
        </div>

        {/* Progress Bar */}
        <div 
          className={`max-w-3xl mx-auto mb-8 sm:mb-12 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span style={{ color: 'hsl(36 40% 70%)' }} className="text-xs sm:text-sm">
              Crianças apadrinhadas
            </span>
            <span className="text-primary font-semibold text-xs sm:text-base">
              77 de 100
            </span>
          </div>
          
          <div 
            className="h-3 sm:h-4 rounded-full overflow-hidden"
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

          <div className="flex justify-between items-center mt-2 sm:mt-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span style={{ color: 'hsl(36 40% 70%)' }} className="text-xs sm:text-sm">
                23 vagas restantes
              </span>
            </div>
            <span className="text-secondary text-xs sm:text-sm font-medium animate-pulse">
              Esgotando rápido!
            </span>
          </div>
        </div>

        {/* Live Notification Ticker */}
        <div 
          className={`max-w-md mx-auto mb-8 sm:mb-12 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div 
            className="rounded-lg sm:rounded-xl p-3 sm:p-4 border flex items-center gap-3 sm:gap-4 overflow-hidden"
            style={{ 
              background: 'hsl(20 30% 15% / 0.8)',
              borderColor: 'hsl(var(--primary) / 0.3)',
            }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="hsl(var(--primary))" />
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <div 
                className="transition-all duration-500"
                key={currentNotification}
                style={{ animation: 'slideIn 0.5s ease-out' }}
              >
                <p
                  style={{ color: 'hsl(36 100% 96%)', textShadow: '0 2px 10px hsl(20 45% 6% / 0.6)' }}
                  className="font-medium text-sm sm:text-base truncate"
                >
                  {notifications[currentNotification].name}{' '}
                  <span style={{ color: 'hsl(36 60% 82%)' }}>
                    {notifications[currentNotification].action}
                  </span>
                </p>
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: 'hsl(36 100% 92%)', textShadow: '0 2px 10px hsl(20 45% 6% / 0.6)' }}
                >
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
          <a href="#donation-form" className="btn-luminis text-sm sm:text-lg px-8 sm:px-12 py-4 sm:py-5">
            Garantir Minha Vaga Agora
          </a>
          <p style={{ color: 'hsl(36 40% 60%)' }} className="text-xs sm:text-sm mt-3 sm:mt-4">
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
