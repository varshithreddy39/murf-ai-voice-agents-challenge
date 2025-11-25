"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useChatMessages } from "@/hooks/useChatMessages";

const MotionDiv = motion.create("div");

interface LearningStatus {
  mode: "coordinator" | "learn" | "quiz" | "teach_back";
  concept: string;
}

export function LearningStatus() {
  const messages = useChatMessages();
  const [status, setStatus] = useState<LearningStatus>({
    mode: "coordinator",
    concept: "Getting started...",
  });

  useEffect(() => {
    if (messages.length === 0) return;

    // Get the last few messages for better context
    const recentMessages = messages.slice(-5);
    const transcript = recentMessages
      .map((m) => m.message)
      .join(" ")
      .toLowerCase();

    console.log("🔍 Transcript:", transcript); // Debug log

    let newMode: LearningStatus["mode"] = status.mode; // Keep current mode by default
    let newConcept = status.concept;

    // Detect mode from transcript - more aggressive detection
    // Check for mode switches
    if (
      transcript.includes("switched to learn") ||
      transcript.includes("learn mode") ||
      transcript.includes("mode: learn") ||
      transcript.includes("explain") && transcript.includes("concept")
    ) {
      newMode = "learn";
      console.log("✅ Detected LEARN mode");
    } else if (
      transcript.includes("switched to quiz") ||
      transcript.includes("quiz mode") ||
      transcript.includes("mode: quiz") ||
      transcript.includes("ask you") ||
      transcript.includes("question") && transcript.includes("answer")
    ) {
      newMode = "quiz";
      console.log("✅ Detected QUIZ mode");
    } else if (
      transcript.includes("switched to teach") ||
      transcript.includes("teach_back") ||
      transcript.includes("teach back") ||
      transcript.includes("mode: teach") ||
      transcript.includes("explain") && transcript.includes("to me")
    ) {
      newMode = "teach_back";
      console.log("✅ Detected TEACH BACK mode");
    }

    // Detect concept
    const concepts = [
      "variables",
      "loops",
      "functions",
      "conditionals",
      "conditional",
      "arrays",
      "array",
      "list",
    ];

    for (const concept of concepts) {
      if (transcript.includes(concept)) {
        newConcept = concept.charAt(0).toUpperCase() + concept.slice(1);
        console.log("✅ Detected concept:", newConcept);
        break;
      }
    }

    // Only update if something changed
    if (newMode !== status.mode || newConcept !== status.concept) {
      console.log("🔄 Updating status:", { mode: newMode, concept: newConcept });
      setStatus({
        mode: newMode,
        concept: newConcept,
      });
    }
  }, [messages, status.mode, status.concept]);

  const getModeConfig = () => {
    switch (status.mode) {
      case "learn":
        return {
          bg: "bg-blue-500",
          icon: "📚",
          label: "Learn Mode",
          tutor: "Matthew",
        };
      case "quiz":
        return {
          bg: "bg-orange-500",
          icon: "❓",
          label: "Quiz Mode",
          tutor: "Alicia",
        };
      case "teach_back":
        return {
          bg: "bg-green-500",
          icon: "🎯",
          label: "Teach Back Mode",
          tutor: "Ken",
        };
      default:
        return {
          bg: "bg-purple-500",
          icon: "🎓",
          label: "Coordinator",
          tutor: "Matthew",
        };
    }
  };

  const config = getModeConfig();

  return (
    <MotionDiv
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 ${config.bg} text-white shadow-lg z-50`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mode Info */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <div className="font-bold text-lg">{config.label}</div>
              <div className="text-sm opacity-90">with {config.tutor}</div>
            </div>
          </div>

          {/* Concept */}
          <div className="text-center flex-1">
            <div className="text-sm opacity-90">Current Concept</div>
            <div className="font-bold text-lg">{status.concept}</div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
