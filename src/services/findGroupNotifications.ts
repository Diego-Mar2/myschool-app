import { fetchData } from "./";

export interface GroupNotifications {
  id: number;
  notification: Notification;
  staff: Staff;
}

interface Notification {
  id: number;
  title: string;
  message: string;
}

interface Staff {
  id: number;
  name: string;
}

export async function findGroupNotifications(
  accessToken: string,
  id: number,
): Promise<GroupNotifications[]> {
  const { data } = await fetchData(accessToken).get(
    `/groups/${id}/notifications`,
  );

  return data;
}
