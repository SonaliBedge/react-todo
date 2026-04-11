import { useState, useEffect } from "react";
import style from "./InstallPrompt.module.css";

function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState(null);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem("pwa-dismissed") === "true"
  );

  useEffect(() => {
    // Chrome / Edge / Android — captures the install prompt
    const handler = (e) => {
      e.preventDefault();
      setInstallEvent(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone;

  // Don't show if already installed or user dismissed
  if (isInStandaloneMode || dismissed) return null;
  // Don't show if no install event and not iOS
  if (!installEvent && !isIOS) return null;

  const handleInstall = async () => {
    if (installEvent) {
      installEvent.prompt();
      const { outcome } = await installEvent.userChoice;
      if (outcome === "accepted") setInstallEvent(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-dismissed", "true");
    setDismissed(true);
  };

  return (
    <div className={style.banner}>
      <span className={style.icon}>📲</span>
      <span className={style.text}>
        {isIOS ? "Install this app on your iPhone:" : "Install this app on your device"}
      </span>

      {isIOS ? (
        <button className={style.learnBtn} onClick={() => setShowIOSGuide((v) => !v)}>
          How?
        </button>
      ) : (
        <button className={style.installBtn} onClick={handleInstall}>
          Install
        </button>
      )}

      <button className={style.dismissBtn} onClick={handleDismiss} aria-label="Dismiss">✕</button>

      {showIOSGuide && (
        <div className={style.iosGuide}>
          Tap the <strong>Share</strong> button (□↑) in Safari, then tap <strong>"Add to Home Screen"</strong>.
        </div>
      )}
    </div>
  );
}

export default InstallPrompt;
