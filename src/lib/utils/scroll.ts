/**
 * Scrolls to the bottom of the page after a short delay
 * @param delay Time to wait before scrolling in milliseconds
 * @param smooth Whether to use smooth scrolling
 */
export function scrollToBottom(
  delay: number = 100,
  smooth: boolean = true
): void {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, delay);
}
