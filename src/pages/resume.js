function GoToURL() {
  if (typeof window === "undefined") return null;
  return window.location.assign("https://docs.google.com/document/d/1Y_XaqGZBEHZZttAVhB8lPP7fAy2B76EpTzD77WQ3SQw/edit?usp=sharing");
}

export default GoToURL;
