"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useChatMessages } from "@/hooks/useChatMessages";

const MotionDiv = motion.create("div");

interface SessionData {
  mood: string | null;
  energy: string | null;
  stress: string[];
  intentions: string[];
}

export function SessionNotes() {
  const messages = useChatMessages();
  const [sessionData, setSessionData] = useState<SessionData>({
    mood: null,
    energy: null,
    stress: [],
    intentions: [],
  });

  useEffect(() => {
    // Extract session data from conversation
    const transcript = messages
      .map((m) => `${m.from?.name || 'User'}: ${m.message}`)
      .join("\n")
      .toLowerCase();

    const newData: SessionData = {
      mood: sessionData.mood,
      energy: sessionData.energy,
      stress: sessionData.stress,
      intentions: sessionData.intentions,
    };

    // Simple keyword detection for mood
    if (!newData.mood) {
      if (
        transcript.includes("tired") ||
        transcript.includes("exhausted") ||
        transcript.includes("drained")
      ) {
        newData.mood = "Tired";
      } else if (
        transcript.includes("energized") ||
        transcript.includes("great") ||
        transcript.includes("good")
      ) {
        newData.mood = "Energized";
      } else if (
        transcript.includes("stressed") ||
        transcript.includes("anxious") ||
        transcript.includes("overwhelmed")
      ) {
        newData.mood = "Stressed";
      } else if (transcript.includes("okay") || transcript.includes("fine")) {
        newData.mood = "Neutral";
      }
    }

    // Energy level detection
    if (!newData.energy) {
      if (
        transcript.includes("high energy") ||
        transcript.includes("lots of energy")
      ) {
        newData.energy = "High";
      } else if (
        transcript.includes("low energy") ||
        transcript.includes("no energy")
      ) {
        newData.energy = "Low";
      } else if (
        transcript.includes("medium") ||
        transcript.includes("moderate")
      ) {
        newData.energy = "Medium";
      }
    }

    setSessionData(newData);
  }, [messages]);

  const progress = [
    sessionData.mood ? 1 : 0,
    sessionData.energy ? 1 : 0,
    sessionData.intentions.length > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const progressPercent = (progress / 3) * 100;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-6 p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl rounded-2xl border border-border/30 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Session Progress
        </h3>
        <MotionDiv
          key={progress}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded-full"
        >
          {progress}/3
        </MotionDiv>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
        <MotionDiv
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-emerald-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Session Data */}
      <div className="space-y-6">
        {/* Mood */}
        <AnimatePresence mode="wait">
          <MotionDiv
            key={sessionData.mood || "mood-empty"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-start gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <span className="text-base">💭</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Mood
              </p>
              {sessionData.mood ? (
                <p className="text-sm text-foreground font-medium">
                  {sessionData.mood}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground/40 italic flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-muted-foreground/40 rounded-full animate-pulse" />
                  Listening...
                </p>
              )}
            </div>
          </MotionDiv>
        </AnimatePresence>

        {/* Energy */}
        <AnimatePresence mode="wait">
          <MotionDiv
            key={sessionData.energy || "energy-empty"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <span className="text-base">⚡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Energy
              </p>
              {sessionData.energy ? (
                <p className="text-sm text-foreground font-medium">
                  {sessionData.energy}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground/40 italic flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-muted-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  Listening...
                </p>
              )}
            </div>
          </MotionDiv>
        </AnimatePresence>

        {/* Intentions */}
        <AnimatePresence mode="wait">
          <MotionDiv
            key={sessionData.intentions.length}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-3"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <span className="text-base">🎯</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Intentions
              </p>
              {sessionData.intentions.length > 0 ? (
                <ul className="space-y-1.5">
                  {sessionData.intentions.map((intention, idx) => (
                    <MotionDiv
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <li className="text-sm text-foreground font-medium flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{intention}</span>
                      </li>
                    </MotionDiv>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground/40 italic flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-muted-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  Listening...
                </p>
              )}
            </div>
          </MotionDiv>
        </AnimatePresence>
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {progress === 3 && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mt-2 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
          >
            <p className="text-xs text-green-600 dark:text-green-400 text-center font-semibold flex items-center justify-center gap-2">
              <span className="text-base">✨</span>
              Check-in complete!
            </p>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}
