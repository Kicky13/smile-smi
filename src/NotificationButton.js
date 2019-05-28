import React from 'react';
import { askForPermissioToReceiveNotifications } from './push';
const NotificationButton = () => (
    <button onClick={askForPermissioToReceiveNotifications} >
      Click
    </button>
);
export default NotificationButton;
