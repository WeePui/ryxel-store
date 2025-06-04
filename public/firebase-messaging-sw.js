// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBu6u_ELkSewKXfy1VPeTdP9lemSC5hmSk",
  authDomain: "ryxel-store-3d1f7.firebaseapp.com",
  projectId: "ryxel-store-3d1f7",
  storageBucket: "ryxel-store-3d1f7.firebasestorage.app",
  messagingSenderId: "797462533871",
  appId: "1:797462533871:web:945a2e5baf7d573bb52d1a",
  measurementId: "G-H9KBVM8G0R",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new notification",
    icon: "/logo.png",
    badge: "/logo.png",
    tag: "ryxel-notification",
    requireInteraction: true,
    actions: [
      {
        action: "view",
        title: "View",
      },
      {
        action: "dismiss",
        title: "Dismiss",
      },
    ],
    data: {
      url: payload.fcmOptions?.link || payload.data?.link || "/notifications",
      type: payload.data?.type || "general",
      orderId: payload.data?.orderId,
      productId: payload.data?.productId,
      notificationId: payload.data?.notificationId,
      ...payload.data,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    // Handle view action
    const data = event.notification.data;
    let url = "/notifications";

    // Redirect to specific pages based on notification type
    if (data?.type === "order" && data?.orderId) {
      url = `/orders/${data.orderId}`;
    } else if (data?.type === "promotional" && data?.productId) {
      url = `/products/${data.productId}`;
    } else if (data?.url) {
      url = data.url;
    }

    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then(function (clientList) {
          // Check if there is already a window/tab open with the target URL
          for (let client of clientList) {
            if (client.url.includes(url) && "focus" in client) {
              return client.focus();
            }
          }

          // If no window/tab is already open, open a new one
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        }),
    );
  } else if (event.action === "dismiss") {
    // Handle dismiss action
    console.log("Notification dismissed");
  } else {
    // Default action - open the notification URL or notifications page
    const url = event.notification.data?.url || "/notifications";
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then(function (clientList) {
          if (clientList.length > 0) {
            return clientList[0]
              .navigate(url)
              .then(() => clientList[0].focus());
          }

          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        }),
    );
  }
});

// Handle notification close events
self.addEventListener("notificationclose", function (event) {
  // Track notification close events if needed
  const data = event.notification.data;
  if (data?.notificationId) {
    // Could send analytics or tracking data here
    console.log(`Notification ${data.notificationId} was closed`);
  }
});
