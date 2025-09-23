import { useEffect, useState } from "react";
import { Trophy, Sparkles, X } from "lucide-react";
import { Achievement } from "./achievement-system";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!achievement) return null;

  const Icon = achievement.icon;
  
  const getTierColor = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'bronze': return 'from-amber-500 to-amber-600';
      case 'silver': return 'from-gray-400 to-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-500';
      case 'platinum': return 'from-purple-500 to-purple-600';
      case 'diamond': return 'from-blue-500 to-blue-600';
    }
  };

  const getTierBadgeColor = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'silver': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'gold': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'platinum': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'diamond': return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Sparkle effects */}
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -left-2">
          <Sparkles className="w-4 h-4 text-electric animate-pulse delay-300" />
        </div>

        {/* Content */}
        <div className="text-center">
          {/* Achievement Icon */}
          <div className={`
            w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center
            bg-gradient-to-br ${getTierColor(achievement.tier)} shadow-lg
          `}>
            <Icon className="w-10 h-10 text-white" />
          </div>

          {/* Achievement Unlocked Badge */}
          <div className="mb-4">
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-electric/10 text-electric border-electric/20">
              <Trophy className="w-4 h-4 mr-2" />
              Achievement Unlocked!
            </Badge>
          </div>

          {/* Achievement Details */}
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {achievement.title}
          </h3>
          
          <p className="text-muted-foreground mb-4">
            {achievement.description}
          </p>

          {/* Tier and Points */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Badge 
              variant="outline" 
              className={`text-sm px-3 py-1 capitalize ${getTierBadgeColor(achievement.tier)}`}
            >
              {achievement.tier} Tier
            </Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              +{achievement.points} Points
            </Badge>
          </div>

          {/* Motivational message */}
          <div className="bg-electric/5 rounded-lg p-4 border border-electric/10">
            <p className="text-sm text-electric font-medium">
              🎉 Outstanding work! Your commitment to executive excellence is paying off.
            </p>
          </div>

          {/* Continue button */}
          <Button 
            onClick={handleClose}
            className="mt-6 w-full bg-gradient-to-r from-electric to-electric/80 hover:from-electric/90 hover:to-electric/70"
          >
            Continue Building Excellence
          </Button>
        </div>
      </div>
    </div>
  );
}