import config from "@/app/_lib/config";
import { getUserId } from "@/app/_api/users-api";

interface errorResponse {
  error: {
    code: number;
    message: string;
  };
}

export async function fetchApi<typeOfResource>(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: Partial<typeOfResource>,
): Promise<typeOfResource | "successful" | undefined> {
  try {
    const userId: string | undefined = await getUserId();
    if (!userId) {
      throw new Error("Cannot get userId");
    }
    const result: Response = await fetch(
      config.apiUrl + "users/" + userId + url,
      {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!result.ok) {
      const responseBody: errorResponse = await result.json();
      throw new Error(
        `An error occurred while fetching the API data. Please try again. \ Error: ${responseBody.error.message}`,
      );
    }
    if (result.status === 204) {
      return "successful";
    } else {
      return await result.json();
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      alert(error.message);
    }
  }
}
