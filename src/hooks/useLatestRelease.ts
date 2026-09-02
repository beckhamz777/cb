import { useState, useEffect } from 'react';

const GITHUB_OWNER = 'oworinaweviolet1968';
const GITHUB_REPO = 'CHECKBOOK';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
const CACHE_KEY = 'cb_latest_release';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

export interface ReleaseInfo {
  tag: string;
  name: string;
  publishedAt: string;
  releaseUrl: string;
  msiUrl: string;
  apkUrl: string;
}

interface CachedRelease {
  data: ReleaseInfo;
  fetchedAt: number;
}

export function useLatestRelease() {
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRelease() {
      // Check cache first
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CachedRelease = JSON.parse(cached);
          if (Date.now() - parsed.fetchedAt < CACHE_TTL_MS) {
            if (!cancelled) {
              setRelease(parsed.data);
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // Ignore cache errors
      }

      try {
        const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
        if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;

        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
          { headers }
        );

        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

        const json = await res.json();

        const info: ReleaseInfo = {
          tag: json.tag_name ?? '',
          name: json.name ?? json.tag_name ?? '',
          publishedAt: json.published_at ?? '',
          releaseUrl: json.html_url ?? '',
          msiUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest/download/CHECKBOOK.IMS.msi`,
          apkUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest/download/CheckBook.apk`,
        };

        const cached: CachedRelease = { data: info, fetchedAt: Date.now() };
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(cached));
        } catch {
          // Ignore storage errors
        }

        if (!cancelled) {
          setRelease(info);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    }

    fetchRelease();
    return () => { cancelled = true; };
  }, []);

  return { release, loading, error };
}
