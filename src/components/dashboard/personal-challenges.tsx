import { useState, useEffect } from "react";
import { Target, Calendar, Clock, Award, Plus, CheckCircle2, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'custom';
  target: number;
  progress: number;
  deadline: Date;
  reward: {
    points: number;
    badge?: string;
    content?: string;
  };
  status: 'active' | 'completed' | 'failed';
  category: 'mindset' | 'strategic' | 'leadership' | 'overall';
}

interface PersonalChallengesProps {
  habits: any[];
  onChallengeComplete?: (challenge: Challenge) => void;
  onCreateChallenge?: (challenge: Partial<Challenge>) => void;
}

export function PersonalChallenges({ habits, onChallengeComplete, onCreateChallenge }: PersonalChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Initialize with some default challenges
  useEffect(() => {
    const now = new Date();
    const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const dayEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const defaultChallenges: Challenge[] = [
      {
        id: 'morning-power-week',
        title: 'Morning Power Week',
        description: 'Complete your morning routine 5 days this week',
        type: 'weekly',
        target: 5,
        progress: habits.filter(h => h.category === 'mindset' && h.completedToday).length,
        deadline: weekEnd,
        reward: {
          points: 100,
          badge: 'Early Bird Executive',
          content: 'Unlock exclusive morning routine scenarios'
        },
        status: 'active',
        category: 'mindset'
      },
      {
        id: 'strategic-sprint',
        title: 'Strategic Sprint',
        description: 'Complete 3 strategic thinking sessions today',
        type: 'daily',
        target: 3,
        progress: habits.filter(h => h.category === 'strategic' && h.completedToday).length,
        deadline: dayEnd,
        reward: {
          points: 50,
          content: 'Unlock advanced strategic scenarios'
        },
        status: 'active',
        category: 'strategic'
      },
      {
        id: 'leadership-mastery',
        title: 'Leadership Mastery Challenge',
        description: 'Practice leadership habits for 7 consecutive days',
        type: 'weekly',
        target: 7,
        progress: Math.max(...habits.filter(h => h.category === 'leadership').map(h => h.streak), 0),
        deadline: weekEnd,
        reward: {
          points: 150,
          badge: 'Leadership Champion',
          content: 'Unlock executive masterclass content'
        },
        status: 'active',
        category: 'leadership'
      }
    ];

    setChallenges(defaultChallenges);
  }, [habits]);

  // Update challenge progress
  useEffect(() => {
    setChallenges(prevChallenges =>
      prevChallenges.map(challenge => {
        let newProgress = challenge.progress;
        
        switch (challenge.id) {
          case 'morning-power-week':
            newProgress = habits.filter(h => h.category === 'mindset' && h.completedToday).length;
            break;
          case 'strategic-sprint':
            newProgress = habits.filter(h => h.category === 'strategic' && h.completedToday).length;
            break;
          case 'leadership-mastery':
            newProgress = Math.max(...habits.filter(h => h.category === 'leadership').map(h => h.streak), 0);
            break;
        }

        const wasCompleted = challenge.status === 'completed';
        const isNowCompleted = newProgress >= challenge.target;
        
        // Check if challenge was just completed
        if (!wasCompleted && isNowCompleted && onChallengeComplete) {
          onChallengeComplete({ ...challenge, progress: newProgress, status: 'completed' });
        }

        return {
          ...challenge,
          progress: newProgress,
          status: isNowCompleted ? 'completed' : 
                  new Date() > challenge.deadline ? 'failed' : 'active'
        };
      })
    );
  }, [habits, onChallengeComplete]);

  const getStatusColor = (status: Challenge['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      case 'active': return 'text-electric bg-electric/5 border-electric/20';
    }
  };

  const getStatusIcon = (status: Challenge['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'failed': return <Clock className="w-4 h-4 text-red-600" />;
      case 'active': return <Target className="w-4 h-4 text-electric" />;
    }
  };

  const getCategoryIcon = (category: Challenge['category']) => {
    switch (category) {
      case 'mindset': return '🧠';
      case 'strategic': return '🎯';
      case 'leadership': return '👑';
      default: return '💪';
    }
  };

  const formatTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const remaining = deadline.getTime() - now.getTime();
    
    if (remaining <= 0) return 'Expired';
    
    const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const activeChallenges = challenges.filter(c => c.status === 'active');
  const completedChallenges = challenges.filter(c => c.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="w-6 h-6 text-electric" />
          <h2 className="text-xl font-bold">Personal Challenges</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Challenge</span>
        </Button>
      </div>

      {/* Active Challenges */}
      {activeChallenges.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Active Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChallenges.map(challenge => (
              <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(challenge.category)}</span>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(challenge.status)}`}>
                      {getStatusIcon(challenge.status)}
                      <span className="ml-1 capitalize">{challenge.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {challenge.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.target) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeRemaining(challenge.deadline)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-3 h-3" />
                      <span>{challenge.reward.points} pts</span>
                    </div>
                  </div>

                  {challenge.reward.badge && (
                    <div className="bg-electric/5 rounded-lg p-3 border border-electric/10">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-electric" />
                        <span className="text-sm font-medium text-electric">
                          Reward: {challenge.reward.badge}
                        </span>
                      </div>
                      {challenge.reward.content && (
                        <p className="text-xs text-electric/80 mt-1">
                          {challenge.reward.content}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Challenges */}
      {completedChallenges.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-muted-foreground">Recently Completed</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {completedChallenges.slice(0, 3).map(challenge => (
              <Card key={challenge.id} className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">{getCategoryIcon(challenge.category)}</span>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-medium text-green-800 mb-1">{challenge.title}</h4>
                  <p className="text-xs text-green-600">
                    +{challenge.reward.points} points earned
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {activeChallenges.length === 0 && completedChallenges.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No Active Challenges
            </h3>
            <p className="text-muted-foreground mb-4">
              Create personalized challenges to accelerate your executive growth
            </p>
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Your First Challenge</span>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}