export const emptyActivity = {
  username: "aakash",
  profile: {
    name: "Aakash Kumar",
    role: "Software Engineer | Full Stack Developer | DSA Enthusiast",
    githubUsername: "aakashk7092",
    leetcodeUsername: "aakashkumar2005",
    codechefUsername: "aakashk7092",
    unstopUsername: "aakaskum19946",
  },
  overview: {
    totalQuestions: 0,
    totalActiveDays: 0,
    totalContests: 0,
    currentStreak: 0,
    maxStreak: 0,
  },
  leetcode: {
    solved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    ranking: 0,
    activeDays: 0,
    totalSubmissions: 0,
    submissionCalendar: [],
    badges: [],
    contestRating: 0,
    contests: 0,
    contestGlobalRanking: 0,
    contestTopPercentage: 0,
    contestHistory: [],
  },
  github: {
    repos: 0,
    followers: 0,
    following: 0,
    commits: 0,
  },
  codechef: {
    rating: 0,
    stars: 0,
    badges: [],
    contests: 0,
    submissionDays: 0,
  },
  unstop: {
    highlights: 0,
    competitions: 0,
    badges: [],
    upcomingBadges: [],
  },
  awards: [],
  analytics: {
    problemsOverTime: [],
    platformShare: [],
    contestHistory: [],
    dsaBreakdown: [],
  },
  recentActivity: [],
  metadata: {
    sources: {
      github: "",
      linkedin: "",
      unstop: "",
    },
  },
};

export function normalizeActivity(data) {
  if (!data || typeof data !== "object") {
    return emptyActivity;
  }

  return {
    ...emptyActivity,
    ...data,
    profile: { ...emptyActivity.profile, ...(data.profile || {}) },
    overview: { ...emptyActivity.overview, ...(data.overview || {}) },
    leetcode: {
      ...emptyActivity.leetcode,
      ...(data.leetcode || {}),
      badges: Array.isArray(data.leetcode?.badges) ? data.leetcode.badges : [],
      submissionCalendar: Array.isArray(data.leetcode?.submissionCalendar) ? data.leetcode.submissionCalendar : [],
      contestHistory: Array.isArray(data.leetcode?.contestHistory) ? data.leetcode.contestHistory : [],
    },
    github: { ...emptyActivity.github, ...(data.github || {}) },
    codechef: {
      ...emptyActivity.codechef,
      ...(data.codechef || {}),
      badges: Array.isArray(data.codechef?.badges) ? data.codechef.badges : [],
    },
    unstop: {
      ...emptyActivity.unstop,
      ...(data.unstop || {}),
      badges: Array.isArray(data.unstop?.badges) ? data.unstop.badges : [],
      upcomingBadges: Array.isArray(data.unstop?.upcomingBadges) ? data.unstop.upcomingBadges : [],
    },
    awards: Array.isArray(data.awards) ? data.awards : [],
    recentActivity: Array.isArray(data.recentActivity) ? data.recentActivity : [],
    analytics: {
      ...emptyActivity.analytics,
      ...(data.analytics || {}),
      problemsOverTime: Array.isArray(data.analytics?.problemsOverTime) ? data.analytics.problemsOverTime : [],
      platformShare: Array.isArray(data.analytics?.platformShare) ? data.analytics.platformShare : [],
      contestHistory: Array.isArray(data.analytics?.contestHistory) ? data.analytics.contestHistory : [],
      dsaBreakdown: Array.isArray(data.analytics?.dsaBreakdown) ? data.analytics.dsaBreakdown : [],
    },
    metadata: {
      ...emptyActivity.metadata,
      ...(data.metadata || {}),
      sources: {
        ...emptyActivity.metadata.sources,
        ...(data.metadata?.sources || {}),
      },
    },
  };
}
