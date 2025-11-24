import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Path to wellness log in backend
    const wellnessLogPath = path.join(
      process.cwd(),
      "..",
      "backend",
      "wellness_log.json"
    );

    // Check if file exists
    if (!fs.existsSync(wellnessLogPath)) {
      return NextResponse.json({
        stats: {
          totalSessions: 0,
          currentStreak: 0,
          lastCheckIn: null,
        },
        recentSessions: [],
      });
    }

    // Read wellness log
    const fileContent = fs.readFileSync(wellnessLogPath, "utf-8");
    const data = JSON.parse(fileContent);
    const sessions = data.sessions || [];

    // Calculate stats
    const totalSessions = sessions.length;
    const lastCheckIn = sessions.length > 0 ? sessions[sessions.length - 1].timestamp : null;

    // Calculate streak
    const currentStreak = calculateStreak(sessions);

    // Get recent sessions (last 5)
    const recentSessions = sessions.slice(-5).reverse();

    return NextResponse.json({
      stats: {
        totalSessions,
        currentStreak,
        lastCheckIn,
      },
      recentSessions,
    });
  } catch (error) {
    console.error("Error reading wellness sessions:", error);
    return NextResponse.json(
      { error: "Failed to read wellness sessions" },
      { status: 500 }
    );
  }
}

function calculateStreak(sessions: any[]): number {
  if (sessions.length === 0) return 0;

  // Get unique dates
  const dates = sessions.map((session) => {
    const date = new Date(session.timestamp);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  });

  const uniqueDates = Array.from(new Set(dates)).sort().reverse();

  if (uniqueDates.length === 0) return 0;

  // Count consecutive days
  let streak = 1;
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = new Date(uniqueDates[i]);
    const next = new Date(uniqueDates[i + 1]);
    const diffDays = Math.floor(
      (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
