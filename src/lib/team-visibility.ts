import { useSyncExternalStore } from "react";

// The Team section is hidden until the visitor clicks "Team" in the navigation
// (or arrives on /#team).
let open = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return open || window.location.hash === "#team";
}

export function useTeamOpen() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function openTeam() {
  open = true;
  listeners.forEach((l) => l());
  setTimeout(() => {
    document.getElementById("team")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

/** Click handler for nav links: opens the Team section instead of jumping to a missing anchor. */
export function onNavClick(key: string) {
  return (e: React.MouseEvent) => {
    if (key !== "team") return;
    e.preventDefault();
    openTeam();
  };
}
