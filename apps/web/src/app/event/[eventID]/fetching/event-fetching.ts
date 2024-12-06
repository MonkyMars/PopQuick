import { type Event } from "../event-util";

interface FetchProps {
  eventID: number | string;
}

interface FetchResult {
  data?: any;
  status: number;
}

export const fetchEvent = async ({
  eventID,
}: FetchProps): Promise<FetchResult> => {
  if (!eventID) {
    return { status: 500 };
  }
  try {
    const response = await fetch(`/api/events/${eventID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }, 
    });
    const data = await response.json();
    return { data: data as Event, status: 200 };
  } catch (error) {
    console.error("Error fetching event data:", error);
    return { status: 500 };
  }
};
