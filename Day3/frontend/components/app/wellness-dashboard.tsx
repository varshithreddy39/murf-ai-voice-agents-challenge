"use client";

import { useEffect, useState } from "react";

interface WellnessSession {
  session_id: string;
  timestamp: string;
  mood: string;
  energy_level: string;
  stress_factors: string[];
  intentions: string[];
  agent_summary: string;
}

interface WellnessStats {
  totalSessions: number;
  currentStreak: number;
  lastCheckIn: string | null;
}

export function WellnessDashboard() {
  const [stats, setStats] = useState<WellnessStats>({
    totalSessions: 0,
    currentStreak: 0,
    lastCheckIn: null,
  });
  const [recentSessions, setRecentSessions] = useState<WellnessSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWellnessData();
  }, []);

  const fetchWellnessData = async () => {
    try {
      const response = await fetch("/api/wellness-sessions");
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentSessions(data.recentSessions);
      }
    } catch (error) {
      console.error("Failed to fetch wellness data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood: string) => {
    const moodLower = mood.toLowerCase();
    if (moodLower.includes("great") || moodLower.includes("energized"))
      return "😊";
    if (moodLower.includes("good") || moodLower.includes("positive"))
      return "🙂";
    if (moodLower.includes("okay") || moodLower.includes("neutral"))
      return "😐";
    if (moodLower.includes("tired") || moodLower.includes("low")) return "😔";
    if (moodLower.includes("stressed") || moodLower.includes("anxious"))
      return "😰";
    return "💭";
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Sessions */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                Total Check-ins
              </p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                {stats.totalSessions}
              </p>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Current Streak
              </p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {stats.currentStreak} days
              </p>
            </div>
          </div>
        </div>

        {/* Last Check-in */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Last Check-in
              </p>
              <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
                {stats.lastCheckIn
                  ? formatDate(stats.lastCheckIn)
                  : "No check-ins yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Recent Check-ins
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentSessions.map((session) => (
              <div
                key={session.session_id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {getMoodEmoji(session.mood)}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {session.mood}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(session.timestamp)} •{" "}
                        {session.energy_level} energy
                      </p>
                    </div>
                  </div>
                </div>
                {session.intentions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Intentions:
                    </p>
                    <ul className="space-y-1">
                      {session.intentions.map((intention, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-green-500 mt-0.5">✓</span>
                          {intention}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {recentSessions.length === 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <span className="text-6xl mb-4 block">🌱</span>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Start Your Wellness Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Begin your first check-in to track your mood, energy, and daily
            intentions. Your wellness companion is here to support you.
          </p>
        </div>
      )}
    </div>
  );
}
