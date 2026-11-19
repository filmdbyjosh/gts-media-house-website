export const CONNECT_OPEN_EVENT = "gts:open-connect";

export function openApplication() {
  if (typeof window === "undefined") return;
  const base = `${window.location.pathname}${window.location.search}`;
  if (window.location.hash !== "#connect") {
    history.pushState(null, "", `${base}#connect`);
  }
  window.dispatchEvent(new Event(CONNECT_OPEN_EVENT));
}

export function openConnectForm() {
  openApplication();
}
