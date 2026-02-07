import { useState, useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const TOUR_COMPLETED_KEY = 'bylaw-bot-tour-completed';

export function OnboardingTour() {
  const [showTour, setShowTour] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const tourCompleted = localStorage.getItem(TOUR_COMPLETED_KEY);
    if (!tourCompleted) {
      // Show tour after a short delay
      setTimeout(() => setShowTour(true), 1000);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
    setShowTour(false);
  };

  const skipTour = () => {
    completeTour();
  };

  const nextStep = () => {
    if (step < tourSteps.length - 1) {
      setStep(step + 1);
    } else {
      completeTour();
    }
  };

  if (!showTour) return null;

  const currentStep = tourSteps[step];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 relative animate-in fade-in zoom-in-95">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2"
          onClick={skipTour}
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mx-auto mb-4">
            <currentStep.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">{currentStep.title}</h2>
          <p className="text-sm text-muted-foreground text-center">{currentStep.description}</p>
        </div>

        {currentStep.tips && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> {currentStep.tips}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === step
                    ? 'w-8 bg-primary'
                    : index < step
                    ? 'w-2 bg-primary/50'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {step + 1} of {tourSteps.length}
          </span>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={skipTour} className="flex-1">
            Skip Tour
          </Button>
          <Button onClick={nextStep} className="flex-1 gap-2">
            {step < tourSteps.length - 1 ? (
              <>
                Next <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Get Started <Check className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

const tourSteps = [
  {
    icon: ({ className }: { className?: string }) => <span className={className}>🏠</span>,
    title: 'Welcome to Calgary Bylaw Assistant!',
    description: 'Discover what you can build on any Calgary property in seconds. Let\'s show you around!',
    tips: 'This quick tour will help you get the most out of the tool.',
  },
  {
    icon: ({ className }: { className?: string }) => <span className={className}>🔍</span>,
    title: 'Search Any Address',
    description: 'Type any Calgary address in the search bar at the top, or click directly on the map to select a property.',
    tips: 'Try searching for your own address or a property you\'re interested in!',
  },
  {
    icon: ({ className }: { className?: string }) => <span className={className}>✅</span>,
    title: 'Instant Results',
    description: 'See immediately if you can build a backyard suite, secondary suite, or rowhouse. Results are color-coded for easy understanding.',
    tips: 'Green ✅ means permitted, Yellow ❓ means likely, Red ❌ means not allowed.',
  },
  {
    icon: ({ className }: { className?: string }) => <span className={className}>📊</span>,
    title: 'Detailed Information',
    description: 'Click "See All The Details" to view costs, timelines, lot requirements, and expert recommendations.',
    tips: 'This includes permit costs, approval timelines, and what to do next!',
  },
  {
    icon: ({ className }: { className?: string }) => <span className={className}>💾</span>,
    title: 'Save & Share',
    description: 'Export reports as PDF, bookmark properties, and share results with others. Your search history is automatically saved.',
    tips: 'Click the Help button anytime if you need guidance!',
  },
];
