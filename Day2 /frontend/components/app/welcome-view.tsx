import { Button } from '@/components/livekit/button';

function WelcomeImage() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-4"
    >
      {/* Coffee cup */}
      <path
        d="M20 25C20 23.8954 20.8954 23 22 23H58C59.1046 23 60 23.8954 60 25V45C60 52.1797 54.1797 58 47 58H33C25.8203 58 20 52.1797 20 45V25Z"
        fill="currentColor"
        className="text-amber-700"
      />
      {/* Coffee liquid */}
      <path
        d="M23 28H57V45C57 50.5228 52.5228 55 47 55H33C27.4772 55 23 50.5228 23 45V28Z"
        fill="currentColor"
        className="text-amber-900"
      />
      {/* Animated Steam lines */}
      <path
        d="M30 18C30 18 28 14 30 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-amber-600 animate-steam-1"
      />
      <path
        d="M40 18C40 18 38 14 40 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-amber-600 animate-steam-2"
      />
      <path
        d="M50 18C50 18 48 14 50 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-amber-600 animate-steam-3"
      />
      {/* Handle */}
      <path
        d="M60 30H63C66.3137 30 69 32.6863 69 36V39C69 42.3137 66.3137 45 63 45H60"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="text-amber-700"
      />
      <style jsx>{`
        @keyframes steam {
          0%, 100% {
            opacity: 0.4;
            transform: translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-2px);
          }
        }

        .animate-steam-1 {
          animation: steam 2s ease-in-out infinite;
        }

        .animate-steam-2 {
          animation: steam 2s ease-in-out 0.3s infinite;
        }

        .animate-steam-3 {
          animation: steam 2s ease-in-out 0.6s infinite;
        }
      `}</style>
    </svg>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref}>
      <section className="bg-background flex flex-col items-center justify-center text-center px-4">
        {/* Animated Coffee Cup */}
        <div className="animate-bounce-slow mb-6">
          <WelcomeImage />
        </div>

        {/* Animated Title */}
        <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight md:text-5xl animate-fade-in">
          Welcome to Byte & Brew Cafe
        </h1>

        {/* Animated Description */}
        <p className="text-muted-foreground max-w-md pt-2 text-lg leading-relaxed animate-fade-in-delay">
          Order your favorite coffee with our AI barista
        </p>

        {/* Animated Button */}
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onStartCall} 
          className="mt-8 w-72 h-14 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-delay-2"
        >
          {startButtonText}
        </Button>

        {/* Animated Features */}
        <p className="text-muted-foreground/60 mt-8 text-sm animate-fade-in-delay-3">
          Speak naturally • Fast ordering • Powered by AI
        </p>
      </section>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 0.6s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.6s ease-out 0.4s both;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 0.6s ease-out 0.6s both;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
