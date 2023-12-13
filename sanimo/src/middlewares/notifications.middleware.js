import { notification } from "antd";

import { NOTIFICATION_ADD } from "constants/notifications";

export function notificationsManager() {
	return next => action => {
		if (action?.type === NOTIFICATION_ADD) {
			const { message, type } = action?.payload;
			notification.open({
				message: message,
				className: `ant-notification-notice_${type}`,
			});
		}
		return next(action);
	};
}
