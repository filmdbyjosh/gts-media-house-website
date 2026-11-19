export const QUOTE_OPEN_EVENT = "gts:open-quote";

export function openQuoteForm() {
  if (typeof window === "undefined") return;
  document.getElementById("quote")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.dispatchEvent(new Event(QUOTE_OPEN_EVENT));
}
