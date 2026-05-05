import React, { useState, useEffect } from "react";
import {
  Folder,
  Star,
  GitBranch,
  ExternalLink,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const ProjectsWindow = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FIXED USERNAME
  const USERNAME = "kiruthik2006";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check for token in .env (optional but recommended for higher rate limits)
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `token ${token}` } : {};

        // 1. Fetch Profile
        const profileRes = await fetch(
          `https://api.github.com/users/${USERNAME}`,
          { headers },
        );

        if (!profileRes.ok) {
          if (profileRes.status === 404)
            throw new Error(`User '${USERNAME}' not found.`);
          if (profileRes.status === 403)
            throw new Error("Rate Limit Exceeded. Add token to .env");
          throw new Error(`GitHub Error: ${profileRes.status}`);
        }

        const profileData = await profileRes.json();
        setProfile(profileData);

        // 2. Fetch Repos
        const reposRes = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12`,
          { headers },
        );
        if (!reposRes.ok) throw new Error("Failed to load repositories.");
        const reposData = await reposRes.json();
        setRepos(reposData);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-blue-400 space-y-4">
        <RefreshCw size={32} className="animate-spin" />
        <span className="text-xs font-mono animate-pulse">
          Connecting to GitHub...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-red-400 space-y-4 p-6 text-center">
        <AlertCircle size={40} />
        <h3 className="text-sm font-bold">Connection Failed</h3>
        <p className="text-xs font-mono bg-white/5 p-2 rounded border border-white/10">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-[10px] text-gray-400 hover:text-white underline"
        >
          Reload System
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0d0d0d] flex flex-col text-white font-sans selection:bg-blue-500/30">
      {/* SIDEBAR + HEADER */}
      <div className="flex-none p-6 border-b border-white/5 bg-gradient-to-r from-blue-900/10 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white/10 p-1 bg-white/5 relative">
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#0d0d0d] rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {profile.name || USERNAME}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                PRO
              </span>
            </h2>
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
              {profile.bio || "Full Stack Developer | AI Enthusiast"}
            </p>
            <div className="flex gap-4 mt-3 text-[10px] text-gray-300 font-mono">
              <span className="flex items-center gap-1">
                <Folder size={10} /> {profile.public_repos} Repos
              </span>
              <span className="flex items-center gap-1">
                <ExternalLink size={10} /> {profile.followers} Followers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* REPO GRID */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#0a0a0a]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all flex flex-col gap-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                  <Folder size={18} />
                </div>
                {repo.language && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 bg-black/30 text-gray-400">
                    {repo.language}
                  </span>
                )}
              </div>
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-gray-200 group-hover:text-blue-300 transition-colors truncate">
                  {repo.name}
                </h3>
                <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 h-8">
                  {repo.description || "No description provided."}
                </p>
              </div>
              <div className="flex gap-3 mt-1 text-[10px] text-gray-500 font-mono relative z-10">
                <span className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                  <Star size={10} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1 group-hover:text-green-400 transition-colors">
                  <GitBranch size={10} /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-600 font-mono">
            System: Displaying {repos.length} most recent repositories.
          </p>
        </div>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }`}</style>
    </div>
  );
};

export default ProjectsWindow;
