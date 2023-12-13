import { NOTIFICATION_ADD } from "constants/notifications";

export const addNotification = notification => {
	return {
		type: NOTIFICATION_ADD,
		payload: notification,
	};
};
