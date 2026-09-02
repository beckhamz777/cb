import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Download, ExternalLink } from 'lucide-react';
import { useLatestRelease } from '@/src/hooks/useLatestRelease';
import { useLocation } from 'react-router-dom';

const DISMISS_KEY = 'cb_banner_dismissed';

/** Returns the release tag stored when the user last dismissed the banner. */
function getDismissedTag(): string | null {
  try {
    return sessionStorage.getItem(DISMISS_KEY);
  } catch {
    return null;
  }
}

function setDismissedTag(tag: string) {
  try {
    sessionStorage.setItem(DISMISS_KEY, tag);
  } catch {
    // Ignore
  }
}

export function UpdateBanner() {
  const { release, loading } = useLatestRelease();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);

  if (loading || !release || dismissed) return null;
  if (getDismissedTag() === release.tag) return null;

  // Determine which download link to surface based on the current page
  const isAndroid = location.pathname === '/android';
  const isWindows = location.pathname === '/windows';

  const downloadHref = isAndroid
    ? release.apkUrl
    : isWindows
    ? release.msiUrl
    : null;

  const downloadLabel = isAndroid
    ? 'Download APK'
    : isWindows
    ? 'Download .msi'
    : null;

  function handleDismiss() {
    setDismissedTag(release!.tag);
    setDismissed(true);
  }

  const publishedDate = release.publishedAt
    ? new Date(release.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <AnimatePresence>
      <motion.div
        key="update-banner"
        initial={{ opacity: 0, y: -48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -48 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="fixed top-[64px] left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
        aria-live="polite"
        aria-label="New version available"
      >
        <div className="pointer-events-auto max-w-3xl w-full mt-3">
          <div className="flex items-center gap-3 bg-primary text-white pl-4 pr-3 py-3 rounded-xl shadow-lg shadow-primary/20 border border-white/10">
            {/* Icon */}
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </span>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-tight truncate">
                {release.name || release.tag} is now available
                {publishedDate && (
                  <span className="font-normal opacity-70 ml-1 text-xs">
                    · Released {publishedDate}
                  </span>
                )}
              </p>
              <p className="text-xs opacity-70 leading-tight mt-0.5">
                A new CheckBook update has been published on GitHub.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              {downloadHref && downloadLabel ? (
                <a
                  href={downloadHref}
                  download
                  className="flex items-center gap-1.5 bg-white text-primary font-bold text-xs px-3 py-2 rounded-lg hover:bg-white/90 active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {downloadLabel}
                </a>
              ) : (
                <a
                  href={release.releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-white text-primary font-bold text-xs px-3 py-2 rounded-lg hover:bg-white/90 active:scale-95 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Release
                </a>
              )}

              <button
                onClick={handleDismiss}
                aria-label="Dismiss update banner"
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/15 active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
