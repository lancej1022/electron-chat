export default {
  setup() {
    if (!('Notification' in window)) {
      console.error('This browser window does not support notification');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('permission granted');
        }
      });
    } else {
      return;
    }
  },
  show({ title, body }) {
    new Notification(title, { body });
  },
};
