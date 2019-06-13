console.log("index.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(registration => {
      console.log("Service Worker registered with scope😁 ", registration.scope);
    })
    .catch(error => {
      console.log("Registration Failed😭 ", error);
    });
} else {
  console.log("Service Worker is not available😞");
}
