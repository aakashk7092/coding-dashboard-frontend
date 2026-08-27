import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GitHubCalendar } from "react-github-calendar";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaArrowLeft, FaBriefcase, FaDownload, FaFire, FaGithub, FaLinkedin, FaSyncAlt, FaTrophy } from "react-icons/fa";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import profileImage from "../assets/profile.jpg";
import unstopIcon from "../assets/unstop.png";
import { emptyActivity, normalizeActivity } from "../lib/activityDefaults.js";
import { fetchActivity, refreshActivity } from "../lib/api.js";
import "./DeveloperDashboard.css";

const platformTabs = [
  { id: "all", label: "All", icon: "*" },
  { id: "leetcode", label: "LeetCode", icon: <SiLeetcode /> },
  { id: "github", label: "GitHub", icon: <FaGithub /> },
  { id: "codechef", label: "CodeChef", icon: <SiCodechef /> },
  { id: "unstop", label: "Unstop", icon: <img src={unstopIcon} alt="Unstop" className="analytics-tab-image" /> },
];

const pieColors = ["#a15e37", "#b87448", "#cf8d5d", "#e4a779"];

function getLeetCodeBadgeGroup(name = "") {
  if (/Days Badge/i.test(name)) return "Annual Medals";
  if (/LeetCoding Challenge/i.test(name) || /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i.test(name)) return "Daily Medals";
  if (/Pandas|Study Plan|Introduction to/i.test(name)) return "Study Plan Medals";
  return "Competition Medals";
}

function getLeetCodeBadgeTitle(name = "") {
  if (name.includes("LeetCoding Challenge")) return name.replace("LeetCoding Challenge", "Badge");
  if (name.includes("Mathematical Insight Badge")) return "Mathematical Insight";
  return name;
}

function getLeetCodeBadgeMeta(badge) {
  if (badge.name === "100 Days Badge 2025") return "Active";
  return badge.createdAt || "Active";
}

function getUnstopBadgeGroup(award = {}) {
  const source = `${award.name || ""} ${award.tag || ""} ${award.description || ""}`.toLowerCase();

  if (/streak|day|consisten/.test(source)) return "Consistency Badges";
  if (/hackathon|challenge|contest|quiz|competition|round|battle/.test(source)) return "Competition Highlights";
  if (/profile|community|campus|public/.test(source)) return "Profile Badges";
  return "Badge List";
}

function getUnstopBadgeMeta(award = {}) {
  return award.createdAt || award.tag || award.description || "Unstop badge";
}

function buildMonthlySubmissionTrend(submissionCalendar) {
  const monthly = new Map();

  submissionCalendar.forEach((entry) => {
    const date = new Date(entry.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleString("en-US", { month: "short" });
    const current = monthly.get(key) || { label, value: 0 };
    current.value += entry.count || 0;
    monthly.set(key, current);
  });

  return Array.from(monthly.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-12)
    .map(([, value]) => value);
}

function HeroStat({ value, label }) {
  return (
    <article className="analytics-hero-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function PlatformMetricCard({ icon, title, summary, metrics, children }) {
  return (
    <article className="analytics-card analytics-platform-card">
      <div className="analytics-platform-head">
        <div className="analytics-platform-title">
          <span className="analytics-platform-icon">{icon}</span>
          <div>
            <h3>{title}</h3>
            <p>{summary}</p>
          </div>
        </div>
      </div>
      <div className="analytics-platform-list">
        {metrics.map((metric) => (
          <div className="analytics-inline-metric" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
      {children}
    </article>
  );
}

function LeetCodeProgress({ label, value, total }) {
  const width = total > 0 ? Math.max((value / total) * 100, value > 0 ? 6 : 0) : 0;

  return (
    <div className="analytics-progress-row">
      <div className="analytics-progress-head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="analytics-progress-track">
        <div className="analytics-progress-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function buildLeetCodeHeatmap(submissionCalendar) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);

  const dayMap = new Map(submissionCalendar.map((item) => [item.date, item.count]));
  const monthLabels = [];
  const weeks = [];

  let cursor = new Date(startDate);
  cursor.setDate(startDate.getDate() - startDate.getDay());

  for (let weekIndex = 0; weekIndex < 53; weekIndex += 1) {
    const week = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const dateKey = cursor.toISOString().slice(0, 10);
      const inRange = cursor >= startDate && cursor <= today;
      const count = inRange ? dayMap.get(dateKey) || 0 : 0;

      week.push({
        date: dateKey,
        count,
        inRange,
      });

      if (dayIndex === 0) {
        const monthLabel = cursor.toLocaleString("en-US", { month: "short" });
        const last = monthLabels.at(-1);
        if (inRange && (!last || last.label !== monthLabel)) {
          monthLabels.push({ label: monthLabel, index: weekIndex });
        }
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
  }

  return { weeks, monthLabels };
}

function getHeatLevel(count) {
  if (count >= 12) return "level-4";
  if (count >= 8) return "level-3";
  if (count >= 4) return "level-2";
  if (count >= 1) return "level-1";
  return "level-0";
}

function LeetCodeSubmissionHeatmap({ submissionCalendar, totalSubmissions, activeDays, streak }) {
  const { weeks, monthLabels } = useMemo(() => buildLeetCodeHeatmap(submissionCalendar), [submissionCalendar]);

  return (
    <div className="leetcode-heatmap">
      <div className="leetcode-heatmap-header">
        <strong>{totalSubmissions.toLocaleString()} submissions in the past one year</strong>
        <div className="leetcode-heatmap-meta">
          <span>Total active days: {activeDays}</span>
          <span>Max streak: {streak}</span>
        </div>
      </div>
      <div className="leetcode-heatmap-months">
        {monthLabels.map((month) => (
          <span key={`${month.label}-${month.index}`} style={{ gridColumn: `${month.index + 1}` }}>
            {month.label}
          </span>
        ))}
      </div>
      <div className="leetcode-heatmap-grid">
        {weeks.map((week, weekIndex) => (
          <div className="leetcode-heatmap-week" key={`week-${weekIndex}`}>
            {week.map((day) => (
              <div
                key={day.date}
                className={`leetcode-heatmap-cell ${day.inRange ? getHeatLevel(day.count) : "outside-range"}`}
                title={day.inRange ? `${day.date}: ${day.count} submissions` : ""}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DeveloperDashboard() {
  const [data, setData] = useState(emptyActivity);
  const [platform, setPlatform] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActivity()
      .then((response) => {
        setData(normalizeActivity(response));
        setError("");
      })
      .catch(() => {
        setData(emptyActivity);
        setError("Live dashboard fetch failed. Showing fallback values until the backend responds.");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const response = await refreshActivity();
      setData(normalizeActivity(response));
      setError("");
    } catch {
      setError("Refresh failed. Existing values are still shown.");
    } finally {
      setRefreshing(false);
    }
  }

  const activePlatforms = useMemo(() => {
    const platformChecks = [
      data.leetcode.solved > 0,
      data.github.repos > 0 || data.github.commits > 0,
      data.codechef.rating > 0 || data.codechef.contests > 0,
      data.unstop.highlights > 0,
    ];

    return platformChecks.filter(Boolean).length;
  }, [data]);

  const totalSolved = useMemo(
    () => data.leetcode.solved + data.codechef.submissionDays,
    [data]
  );

  const heroStats = useMemo(
    () => [
      { value: data.leetcode.solved, label: "Problems Solved" },
      { value: data.github.repos, label: "GitHub Repos" },
      { value: activePlatforms, label: "Platforms" },
      { value: `${data.overview.currentStreak} Days`, label: "Coding Streak" },
    ],
    [activePlatforms, data]
  );

  const leetcodeDifficulty = useMemo(
    () => [
      { label: "Easy", value: data.leetcode.easy },
      { label: "Medium", value: data.leetcode.medium },
      { label: "Hard", value: data.leetcode.hard },
    ],
    [data]
  );

  const platformCardMap = useMemo(
    () => ({
      leetcode: (
        <PlatformMetricCard
          icon={<SiLeetcode />}
          title="LeetCode"
          summary="Primary DSA profile with streak, ranking, and contest data."
          metrics={[
            { label: "Solved", value: data.leetcode.solved },
            { label: "Ranking", value: data.leetcode.ranking },
            { label: "Contest Rating", value: data.leetcode.contestRating || 0 },
            { label: "Contests", value: data.leetcode.contests || 0 },
            { label: "Streak", value: `${data.overview.currentStreak} days` },
          ]}
        >
          <div className="analytics-progress-panel">
            {leetcodeDifficulty.map((item) => (
              <LeetCodeProgress key={item.label} label={item.label} value={item.value} total={data.leetcode.solved} />
            ))}
          </div>
        </PlatformMetricCard>
      ),
      github: (
        <PlatformMetricCard
          icon={<FaGithub />}
          title="GitHub"
          summary="Repository output, commit volume, and audience signal."
          metrics={[
            { label: "Repositories", value: data.github.repos },
            { label: "Commits", value: data.github.commits },
            { label: "Followers", value: data.github.followers },
            { label: "Following", value: data.github.following },
          ]}
        />
      ),
      codechef: (
        <PlatformMetricCard
          icon={<SiCodechef />}
          title="CodeChef"
          summary="Competitive programming history and activity signal."
          metrics={[
            { label: "Rating", value: data.codechef.rating },
            { label: "Stars", value: data.codechef.stars },
            { label: "Contests", value: data.codechef.contests },
            { label: "Submission Days", value: data.codechef.submissionDays },
          ]}
        />
      ),
      unstop: (
        <PlatformMetricCard
          icon={<img src={unstopIcon} alt="Unstop" className="analytics-platform-image" />}
          title="Unstop"
          summary="Public badges and competition activity fetched from Unstop."
          metrics={[
            { label: "Highlights", value: data.unstop.highlights },
            { label: "Competitions", value: data.unstop.competitions },
            { label: "Awards", value: data.unstop.badges.length },
          ]}
        >
          <div className="analytics-platform-link-row">
            <a href="https://unstop.com/u/aakaskum19946" target="_blank" rel="noreferrer">
              https://unstop.com/u/aakaskum19946
            </a>
          </div>
        </PlatformMetricCard>
      ),
    }),
    [data, leetcodeDifficulty]
  );

  const visiblePlatformCards = useMemo(() => {
    if (platform === "all") {
      return [platformCardMap.leetcode, platformCardMap.github, platformCardMap.codechef, platformCardMap.unstop];
    }

    return [platformCardMap[platform]];
  }, [platform, platformCardMap]);

  const selectedDistribution = useMemo(() => {
    const base = [
      { label: "LeetCode", value: data.leetcode.solved },
      { label: "GitHub", value: data.github.repos },
      { label: "CodeChef", value: data.codechef.submissionDays },
      { label: "Unstop", value: data.unstop.highlights },
    ];

    if (platform === "all") {
      return base;
    }

    return base.filter((item) => item.label.toLowerCase() === platform);
  }, [platform, data]);

  const problemsTrend = useMemo(() => {
    if (platform === "leetcode") {
      return data.leetcode.submissionCalendar?.length
        ? buildMonthlySubmissionTrend(data.leetcode.submissionCalendar)
        : [{ label: "Solved", value: data.leetcode.solved }];
    }

    if (platform === "github") {
      return [
        { label: "Repos", value: data.github.repos },
        { label: "Commits", value: data.github.commits },
        { label: "Followers", value: data.github.followers },
      ];
    }

    if (platform === "codechef") {
      return data.codechef.contestHistory?.length
        ? data.codechef.contestHistory
        : [{ label: "Submissions", value: data.codechef.submissionDays }];
    }

    if (platform === "unstop") {
      return [
        { label: "Highlights", value: data.unstop.highlights },
        { label: "Competitions", value: data.unstop.competitions },
        { label: "Awards", value: data.unstop.badges.length },
      ];
    }

    return data.analytics.problemsOverTime;
  }, [platform, data]);

  const topicAnalysis = useMemo(() => {
    if (platform === "github") {
      return [
        { label: "Repos", value: data.github.repos },
        { label: "Followers", value: data.github.followers },
        { label: "Following", value: data.github.following },
      ];
    }

    if (platform === "codechef") {
      return [
        { label: "Rating", value: data.codechef.rating },
        { label: "Stars", value: data.codechef.stars },
        { label: "Contests", value: data.codechef.contests },
      ];
    }

    if (platform === "unstop") {
      return [
        { label: "Highlights", value: data.unstop.highlights },
        { label: "Competitions", value: data.unstop.competitions },
        { label: "Awards", value: data.unstop.badges.length },
      ];
    }

    return data.analytics.dsaBreakdown;
  }, [platform, data]);

  const contestChartData = useMemo(() => {
    if (platform === "leetcode" || platform === "all") {
      return data.leetcode.contestHistory?.length
        ? data.leetcode.contestHistory.map((item) => ({ label: item.label, value: item.value }))
        : data.analytics.contestHistory;
    }

    if (platform === "codechef") {
      return data.codechef.contestHistory || [];
    }

    return [];
  }, [platform, data]);

  const contestCaption = useMemo(() => {
    if (platform === "codechef") {
      return {
        value: data.codechef.rating || 0,
        label: `${data.codechef.contests || 0} contests`,
      };
    }

    return {
      value: data.leetcode.contestRating || 0,
      label: `${data.leetcode.contests || 0} contests`,
    };
  }, [platform, data]);

  const achievements = useMemo(
    () => {
      if (platform === "leetcode") {
        return [
          `LeetCode ${data.leetcode.solved} problems solved`,
          `${data.overview.currentStreak} day coding streak`,
          `Contest rating ${data.leetcode.contestRating || 0}`,
          `${data.leetcode.totalSubmissions || 0} submissions in the past year`,
        ];
      }

      if (platform === "github") {
        return [
          `GitHub ${data.github.repos} public repositories`,
          `${data.github.commits} estimated commits`,
          `${data.github.followers} followers`,
          `${data.github.following} following`,
        ];
      }

      if (platform === "codechef") {
        return [
          `CodeChef rating ${data.codechef.rating || 0}`,
          `${data.codechef.contests} contests tracked`,
          `${data.codechef.submissionDays} submission days detected`,
          `${data.codechef.stars} stars`,
        ];
      }

      if (platform === "unstop") {
        return [
          `Unstop ${data.unstop.highlights} public highlights`,
          `${data.unstop.competitions} competitions`,
          `${data.unstop.badges.length} live badges fetched`,
          `Profile: aakaskum19946`,
        ];
      }

      return [
        `LeetCode ${data.leetcode.solved} problems solved`,
        `${data.overview.currentStreak} day coding streak`,
        `GitHub ${data.github.repos} public repositories`,
        `Unstop ${data.unstop.highlights} competitive highlights`,
      ];
    },
    [data, platform]
  );

  const leetcodeBadgeGroups = useMemo(() => {
    return data.leetcode.badges.reduce((groups, badge) => {
      const group = getLeetCodeBadgeGroup(badge.name);
      if (!groups[group]) groups[group] = [];
      groups[group].push(badge);
      return groups;
    }, {});
  }, [data.leetcode.badges]);

  const unstopBadgeGroups = useMemo(() => {
    return data.unstop.badges.reduce((groups, award) => {
      const group = getUnstopBadgeGroup(award);
      if (!groups[group]) groups[group] = [];
      groups[group].push(award);
      return groups;
    }, {});
  }, [data.unstop.badges]);

  const showLeetCodeAwards = platform === "all" || platform === "leetcode";
  const showUnstopAwards = platform === "all" || platform === "unstop";
  const showAwardsSection = showLeetCodeAwards || showUnstopAwards;
  const showActivityHeatmap = platform === "all" || platform === "leetcode" || platform === "github";
  const isFocusedPlatform = platform !== "all";
  const selectedPlatformLabel = platformTabs.find((tab) => tab.id === platform)?.label || "Platform";
  const awardsHeading = platform === "leetcode"
    ? "LeetCode Awards"
    : platform === "unstop"
      ? "Unstop Awards"
        : "LeetCode and Unstop Awards";

  const analyticsCards = useMemo(() => {
    const cards = [];

    if (platform === "all" || platform === "leetcode") {
      cards.push(
        <article className="analytics-card analytics-chart-card" key="problems-over-time">
          <div className="analytics-card-header">
            <div>
              <h3>Problems Over Time</h3>
              <span>{platform === "leetcode" ? "Monthly LeetCode submissions" : "Cross-platform growth"}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={problemsTrend}>
              <CartesianGrid stroke="rgba(115, 82, 57, 0.12)" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fill: "#7f6655", fontSize: 11 }} />
              <YAxis tick={{ fill: "#7f6655", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#fff8f1", border: "1px solid rgba(115, 82, 57, 0.2)", borderRadius: 12, color: "#3c281b", boxShadow: "0 8px 24px rgba(102, 71, 49, 0.12)" }} />
              <Line type="monotone" dataKey="value" stroke="#a15e37" strokeWidth={3} dot={{ r: 4, fill: "#b87448" }} />
            </LineChart>
          </ResponsiveContainer>
        </article>
      );
    }

    if (platform === "all" || platform === "github" || platform === "codechef" || platform === "unstop") {
      cards.push(
        <article className="analytics-card analytics-chart-card" key="distribution">
          <div className="analytics-card-header">
            <div>
              <h3>{platform === "all" ? "Distribution" : `${platformTabs.find((tab) => tab.id === platform)?.label} Snapshot`}</h3>
              <span>{platform === "all" ? "Live platform share" : "Live platform metrics"}</span>
            </div>
          </div>
          <div className="analytics-chart-split">
            <ResponsiveContainer width="48%" height={280}>
              <PieChart>
                <Pie data={selectedDistribution} dataKey="value" nameKey="label" innerRadius={55} outerRadius={86}>
                  {selectedDistribution.map((entry, index) => (
                    <Cell key={entry.label} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#fff8f1", border: "1px solid rgba(115, 82, 57, 0.2)", borderRadius: 12, color: "#3c281b" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="analytics-inline-bars analytics-inline-bars-large">
              {selectedDistribution.map((item) => (
                <div className="analytics-inline-metric" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      );
    }

    if (platform === "all" || platform === "leetcode" || platform === "github" || platform === "codechef" || platform === "unstop") {
      cards.push(
        <article className="analytics-card analytics-chart-card" key="topic-analysis">
          <div className="analytics-card-header">
            <div>
              <h3>{platform === "github" ? "GitHub Metrics" : platform === "codechef" ? "CodeChef Metrics" : platform === "unstop" ? "Unstop Metrics" : "Topic Analysis"}</h3>
              <span>{platform === "leetcode" || platform === "all" ? "Difficulty breakdown" : "Platform metric breakdown"}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topicAnalysis} layout="vertical" margin={{ left: 12 }}>
              <CartesianGrid stroke="rgba(115, 82, 57, 0.12)" strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fill: "#7f6655", fontSize: 11 }} />
              <YAxis type="category" dataKey="label" tick={{ fill: "#7f6655", fontSize: 11 }} width={88} />
              <Tooltip contentStyle={{ background: "#fff8f1", border: "1px solid rgba(115, 82, 57, 0.2)", borderRadius: 12, color: "#3c281b" }} />
              <Bar dataKey="value" fill="#a15e37" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      );
    }

    if (platform === "all" || platform === "leetcode" || platform === "codechef") {
      cards.push(
        <article className="analytics-card analytics-chart-card" key="contest-rating">
          <div className="analytics-card-header">
            <div>
              <h3>Contest Rating</h3>
              <span>{platform === "codechef" ? "CodeChef contest history" : "LeetCode contest history"}</span>
            </div>
            <div className="analytics-rating-caption">
              <strong>{contestCaption.value}</strong>
              <span>{contestCaption.label}</span>
            </div>
          </div>
          {contestChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={contestChartData}>
                <defs>
                  <linearGradient id="ratingFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a15e37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a15e37" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(115, 82, 57, 0.12)" strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fill: "#7f6655", fontSize: 11 }} />
                <YAxis tick={{ fill: "#7f6655", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#fff8f1", border: "1px solid rgba(115, 82, 57, 0.2)", borderRadius: 12, color: "#3c281b" }} />
                <Area type="monotone" dataKey="value" stroke="#a15e37" fill="url(#ratingFill)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="analytics-empty-state">No live contest history available for this platform.</div>
          )}
        </article>
      );
    }

    return cards;
  }, [platform, problemsTrend, selectedDistribution, topicAnalysis, contestCaption, contestChartData]);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="analytics-shell">
      <header className="analytics-topbar">
        <div className="analytics-nav-title">
          <Link className="analytics-back-link" to="/">
            <FaArrowLeft /> Portfolio
          </Link>
          <h1>Developer Dashboard</h1>
        </div>

        <div className="analytics-topbar-actions">
          <a className="analytics-button analytics-button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">
            <FaDownload /> Resume
          </a>
          <button className="analytics-button analytics-button-secondary" onClick={handleRefresh} disabled={refreshing}>
            <FaSyncAlt className={refreshing ? "spin-icon" : ""} /> {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <Link className="analytics-button analytics-button-primary" to="/dashboard/recruiter">
            <FaBriefcase /> Recruiter View
          </Link>
        </div>
      </header>

      {error ? <div className="analytics-alert">{error}</div> : null}

      <section className="analytics-hero">
        <article className="analytics-card analytics-hero-card">
          <div className="analytics-hero-profile">
            <img src={profileImage} alt="Aakash Kumar" className="analytics-profile-image" />
            <div className="analytics-hero-copy">
              <h2>{data.profile.name}</h2>
              <p>{data.profile.role}</p>
              <div className="analytics-profile-links">
                <a href="https://github.com/aakashk7092" target="_blank" rel="noreferrer">
                  <FaGithub /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/aakash-kumar-aa3093315/" target="_blank" rel="noreferrer">
                  <FaLinkedin /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="analytics-hero-stats">
            {heroStats.map((item) => (
              <HeroStat key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </article>

        <article className="analytics-card analytics-total-card">
          <p className="analytics-card-label">Total Solved</p>
          <strong>{totalSolved}</strong>
          <div className="analytics-total-breakdown">
            <div><span>LeetCode</span><strong>{data.leetcode.solved}</strong></div>
            <div><span>CodeChef</span><strong>{data.codechef.submissionDays}</strong></div>
            <div><span>GitHub</span><strong>{data.github.repos}</strong></div>
          </div>
        </article>
      </section>

      <section className="analytics-section">
        <div className="analytics-section-head">
          <h2>{platform === "all" ? "Platform Activity" : `${selectedPlatformLabel} Overview`}</h2>
        </div>

        <div className="analytics-tabs">
          {platformTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPlatform(tab.id)}
              className={`analytics-tab ${platform === tab.id ? "active" : ""}`}
            >
              <span>{tab.icon}</span>
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={`analytics-grid analytics-grid-platforms ${isFocusedPlatform ? "analytics-grid-platforms-single" : ""}`}>
          {visiblePlatformCards}
        </div>
      </section>

      <section className="analytics-section">
        <div className="analytics-section-head">
          <h2>{platform === "all" ? "Performance Analytics" : `${selectedPlatformLabel} Analytics`}</h2>
        </div>

        <div className={`analytics-grid analytics-grid-charts ${isFocusedPlatform ? "analytics-grid-charts-single" : ""}`}>
          {analyticsCards}
        </div>

        {showActivityHeatmap ? (
          <article className="analytics-card analytics-heatmap-card">
            <div className="analytics-card-header">
              <div>
                <h3>{platform === "leetcode" ? "LeetCode Submission Heatmap" : "GitHub Contribution Heatmap"}</h3>
                <span>{platform === "leetcode" ? "Daily submission intensity from live LeetCode calendar data" : ""}</span>
              </div>
              <div className="analytics-rating-caption">
                <strong>{platform === "leetcode" ? data.leetcode.totalSubmissions : data.github.commits}</strong>
                <span>{platform === "leetcode" ? "Total submissions" : "Estimated commits"}</span>
              </div>
            </div>
            {platform === "leetcode" ? (
              <LeetCodeSubmissionHeatmap
                submissionCalendar={data.leetcode.submissionCalendar}
                totalSubmissions={data.leetcode.totalSubmissions}
                activeDays={data.leetcode.activeDays}
                streak={data.overview.maxStreak}
              />
            ) : (
              <GitHubCalendar
                username={data.profile.githubUsername}
                colorScheme="light"
                theme={{
                  light: ["#f1e2d3", "#e0be9f", "#c8946e", "#ad6e44", "#8c502b"],
                }}
                blockSize={11}
                blockMargin={4}
                fontSize={12}
              />
            )}
          </article>
        ) : null}
      </section>

      <section className="analytics-section">
        <div className="analytics-section-head">
          <h2>{platform === "all" ? "Highlights & Key Metrics" : `${selectedPlatformLabel} Highlights`}</h2>
        </div>

        <article className="analytics-card analytics-achievement-card">
          <div className="analytics-achievement-list">
            {achievements.map((item) => (
              <div className="analytics-achievement-item" key={item}>
                <FaTrophy />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {showAwardsSection ? (
        <section className="analytics-section">
          <div className="analytics-section-head">
            <h2>{awardsHeading}</h2>
          </div>

          <div className={`analytics-grid analytics-grid-awards ${isFocusedPlatform ? "analytics-grid-awards-single" : ""}`}>
            {showLeetCodeAwards ? (
              <article className={`analytics-card analytics-awards-card ${isFocusedPlatform ? "analytics-awards-focused" : ""}`}>
                <div className="analytics-card-header">
                  <div>
                    <h3>LeetCode Medals</h3>
                    <span>{data.leetcode.badges.length} live LeetCode medals fetched</span>
                  </div>
                </div>
                <div className="analytics-awards-content">
                  <div className="analytics-badge-list">
                  {Object.entries(leetcodeBadgeGroups).map(([groupName, badges]) => (
                    <section className="analytics-badge-group" key={groupName}>
                      <h4>{groupName}</h4>
                      <div className="analytics-award-scroll">
                        <div className="analytics-award-grid analytics-award-grid-scroll">
                          {badges.map((badge) => (
                            <article className="analytics-award-item" key={`${badge.name}-${badge.createdAt || "active"}`}>
                              {badge.icon ? <img src={badge.icon} alt={badge.name} /> : <div className="analytics-award-fallback">L</div>}
                              <small>badge</small>
                              <strong>{getLeetCodeBadgeTitle(badge.name)}</strong>
                              <span>{getLeetCodeBadgeMeta(badge)}</span>
                            </article>
                          ))}
                        </div>
                      </div>
                    </section>
                  ))}
                  </div>
                </div>
              </article>
            ) : null}

            {showUnstopAwards ? (
              <article className={`analytics-card analytics-awards-card ${isFocusedPlatform ? "analytics-awards-focused" : ""}`}>
                <div className="analytics-card-header">
                  <div>
                    <h3>Unstop Badges</h3>
                    <span>{data.unstop.badges.length} live public badges fetched</span>
                  </div>
                </div>
                <div className="analytics-awards-content">
                  <div className="analytics-badge-list">
                  {Object.entries(leetcodeBadgeGroups).map(([groupName, badges]) => (
                    <section className="analytics-badge-group" key={groupName}>
                      <h4>{groupName}</h4>
                      <div className="analytics-award-scroll">
                        <div className="analytics-award-grid analytics-award-grid-scroll">
                          {badges.map((badge) => (
                            <article className="analytics-award-item" key={`${badge.name}-${badge.createdAt || "active"}`}>
                              {badge.icon ? <img src={badge.icon} alt={badge.name} /> : <div className="analytics-award-fallback">L</div>}
                              <small>badge</small>
                              <strong>{getLeetCodeBadgeTitle(badge.name)}</strong>
                              <span>{getLeetCodeBadgeMeta(badge)}</span>
                            </article>
                          ))}
                        </div>
                      </div>
                    </section>
                  ))}
                  </div>
                </div>
              </article>
            ) : null}

            {showUnstopAwards ? (
              <article className={`analytics-card analytics-awards-card ${isFocusedPlatform ? "analytics-awards-focused" : ""}`}>
                <div className="analytics-card-header">
                  <div>
                    <h3>Unstop Badges</h3>
                    <span>{data.unstop.badges.length} live public badges fetched</span>
                  </div>
                </div>
                <div className="analytics-awards-content">
                  <div className="analytics-badge-list">
                    {data.unstop.badges.length > 0 ? (
                      Object.entries(unstopBadgeGroups).map(([groupName, awards]) => (
                        <section className="analytics-badge-group" key={groupName}>
                          <h4>{groupName}</h4>
                          <div className="analytics-award-scroll">
                            <div className={`analytics-award-grid analytics-award-grid-scroll ${isFocusedPlatform ? "analytics-award-grid-scroll-focused" : ""}`}>
                              {awards.map((award) => (
                                <article className="analytics-award-item" key={`${award.name}-${award.createdAt || award.tag || "unstop"}`}>
                                  {award.icon ? <img src={award.icon} alt={award.name} /> : <div className="analytics-award-fallback">U</div>}
                                  <small>badge</small>
                                  <strong>{award.name}</strong>
                                  <span>{getUnstopBadgeMeta(award)}</span>
                                </article>
                              ))}
                            </div>
                          </div>
                        </section>
                      ))
                    ) : (
                      <div className="analytics-empty-state">No live Unstop badges available.</div>
                    )}
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
