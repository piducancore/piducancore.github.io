function GoToURL() {
  if (typeof window === "undefined") return null;
  return window.location.assign("https://github.com/piducancore");
}

export default GoToURL;
