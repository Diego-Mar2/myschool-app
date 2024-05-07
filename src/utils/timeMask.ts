export function timeMask(time: string) {
  return time
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1:$2")
    .replace(/(\d{2}):(\d{2}).*/, "$1:$2");
}
