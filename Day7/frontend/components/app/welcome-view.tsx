'use client';

import { Button } from '@/components/livekit/button';

function GroceryBasketIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-6"
    >
      <path
        d="M12 16L16 48H48L52 16H12Z"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#dcfce7"
      />
      <path
        d="M22 16V12C22 9.79086 23.7909 8 26 8H38C40.2091 8 42 9.79086 42 12V16"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="54" r="2" fill="#22c55e" />
      <circle cx="44" cy="54" r="2" fill="#22c55e" />
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


  const categories = ['Groceries', 'Snacks', 'Prepared Food', 'Beverages', 'Essentials'];

  const steps = [
    {
      title: 'Speak your order',
      description: "Tell me what you want or say 'ingredients for a sandwich'.",
    },
    {
      title: 'Assistant builds your cart',
      description: "I'll add individual items or recipe ingredients automatically.",
    },
    {
      title: 'Confirm & place order',
      description: "I'll read out your cart and save the order to JSON.",
    },
  ];

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-12">
        <GroceryBasketIcon />

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 max-w-3xl">
          Your Smart Food & Grocery Voice Assistant
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Order groceries, snacks, or ingredients for simple meals — just by speaking.
        </p>

        <Button
          variant="primary"
          size="lg"
          onClick={onStartCall}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          {startButtonText}
        </Button>
      </section>

      {/* Category Chips */}
      <section className="flex flex-wrap items-center justify-center gap-3 px-6 pb-12">
        {categories.map((category) => (
          <span
            key={category}
            className="px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200"
          >
            {category}
          </span>
        ))}
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        <p>
          Powered by <span className="font-semibold text-green-600">QuickBasket</span>
        </p>
      </footer>
    </div>
  );
};
