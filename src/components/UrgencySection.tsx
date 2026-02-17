import { useState, useEffect, useRef } from 'react';
import { Heart, Clock, Users } from 'lucide-react';
const notifications = [{
  name: 'Maria S.',
  action: 'se tornou madrinha',
  time: '2 min'
}, {
  name: 'João P.',
  action: 'fez sua primeira doação',
  time: '5 min'
}, {
  name: 'Ana L.',
  action: 'se tornou madrinha',
  time: '8 min'
}, {
  name: 'Carlos R.',
  action: 'apadrinhou uma criança',
  time: '12 min'
}, {
  name: 'Fernanda M.',
  action: 'se tornou voluntária',
  time: '15 min'
}, {
  name: 'Ricardo B.',
  action: 'fez sua primeira doação',
  time: '18 min'
}, {
  name: 'Patrícia G.',
  action: 'se tornou madrinha',
  time: '22 min'
}, {
  name: 'Lucas F.',
  action: 'apadrinhou uma criança',
  time: '25 min'
}];
const UrgencySection = () => {
  const [sponsoredCount, setSponsoredCount] = useState(48);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const maxChildren = 100;

  // Intersection observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Simulate new sponsorships at random intervals
  useEffect(() => {
    if (!isVisible) return;
    
    const intervals = [3000, 10000, 3000, 5000, 15000, 10000, 3000, 5000, 15000];
    let intervalIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const scheduleNextIncrement = () => {
      const delay = intervals[intervalIndex % intervals.length];
      intervalIndex++;
      
      timeoutId = setTimeout(() => {
        setSponsoredCount(prev => {
          if (prev >= maxChildren - 5) return prev;
          return prev + 1;
        });
        scheduleNextIncrement();
      }, delay);
    };
    
    scheduleNextIncrement();
    return () => clearTimeout(timeoutId);
  }, [isVisible]);

  // Rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification(prev => (prev + 1) % notifications.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return <section ref={sectionRef} className="py-10 sm:py-20 relative overflow-hidden" style={{
    background: 'linear-gradient(135deg, hsl(20 45% 10%) 0%, hsl(20 45% 6%) 100%)'
  }}>
      {/* Animated background particles - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden hidden sm:block">
        {[...Array(10)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }} />)}
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Main Content */}
        <div className="text-center mb-6 sm:mb-12">
          <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary mb-3 sm:mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse flex-shrink-0" />
            <span className="text-[10px] sm:text-sm font-semibold tracking-widest uppercase">⏰ TEMPO LIMITADO</span>
          </div>

          <h2 className={`text-[1.5rem] sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
          color: 'hsl(36 100% 96%)'
        }}>
            Ainda <span className="text-gradient-gold">52 Crianças</span>
            <br />
            Aguardam por Você
          </h2>

          <p className={`text-[13px] sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-12 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
          color: 'hsl(36 40% 70%)'
        }}>
            48 crianças em Curitiba já foram alcançadas este mês. Não deixe as outras esperando.
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`max-w-3xl mx-auto mb-8 sm:mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span style={{
            color: 'hsl(36 40% 70%)'
          }} className="text-xs sm:text-sm">
              Crianças apadrinhadas
            </span>
            <span className="text-primary font-semibold text-xs sm:text-base">{sponsoredCount} de {maxChildren}</span>
          </div>
          
          <div className="h-3 sm:h-4 rounded-full overflow-hidden" style={{
          background: 'hsl(20 30% 20%)'
        }}>
            <div className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" style={{
            width: `${sponsoredCount}%`,
            background: 'linear-gradient(90deg, hsl(var(--gold)) 0%, hsl(var(--amber)) 100%)'
          }}>
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-30" style={{
              background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
              animation: 'shimmer 2s infinite'
            }} />
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 sm:mt-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span style={{
              color: 'hsl(36 40% 70%)'
            }} className="text-xs sm:text-sm">
                {maxChildren - sponsoredCount} vagas restantes
              </span>
            </div>
            <span className="text-secondary text-xs sm:text-sm font-medium animate-pulse">
              Esgotando rápido!
            </span>
          </div>
        </div>

        {/* Live Notification Ticker */}
        <div className={`max-w-md mx-auto mb-8 sm:mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="rounded-lg sm:rounded-xl p-3 sm:p-4 border flex items-center gap-3 sm:gap-4 overflow-hidden" style={{
          background: 'hsl(20 30% 15% / 0.8)',
          borderColor: 'hsl(var(--primary) / 0.3)'
        }}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="hsl(var(--primary))" />
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <div className="transition-all duration-500" key={currentNotification} style={{
              animation: 'slideIn 0.5s ease-out'
            }}>
                <p style={{
                color: 'hsl(36 100% 96%)',
                textShadow: '0 2px 10px hsl(20 45% 6% / 0.6)'
              }} className="font-medium text-sm sm:text-base truncate">
                  {notifications[currentNotification].name}{' '}
                  <span style={{
                  color: 'hsl(36 60% 82%)'
                }}>
                    {notifications[currentNotification].action}
                  </span>
                </p>
                <p className="text-xs sm:text-sm" style={{
                color: 'hsl(36 100% 92%)',
                textShadow: '0 2px 10px hsl(20 45% 6% / 0.6)'
              }}>
                  há {notifications[currentNotification].time}
                </p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="#donation-form" className="btn-luminis text-sm sm:text-lg px-6 sm:px-12 py-3.5 sm:py-5 min-h-[52px]">
            Garantir Minha Participação
          </a>
          <p style={{
          color: 'hsl(36 40% 60%)'
        }} className="text-[10px] sm:text-sm mt-2.5 sm:mt-4">
            Sem compromisso • Decisão transformadora
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
    </section>;
};
export default UrgencySection;