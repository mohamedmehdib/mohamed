const STRAPI_API_URL = "http://localhost:1337/api/histories";
const STRAPI_API_KEY = "bb17564afefdb77f634dc4aab4ac17322f7a95b73157d3ccac959d1aa4f9a99f15952cf48a2c8a56593dfd29ec8cefd7a79ed7aa7640d3a38c60fc5f43a762b26271823357187928f123c8483fd3b642a68441b088d8a9a9dea7f04b6eb678e8277bef0eded8aeea986a01e176840a71d4ae72fe865e30756b4153f98608ede1"; // Ensure this is defined in .env.local

interface HistoryData {
  name: string;
  email: string;
  amount: number;
  service: string;
}

export const postToStrapi = async (data: HistoryData) => {
  try {
    const response = await fetch(STRAPI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to post to Strapi: ${errorText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting to Strapi:", error);
    throw error;
  }
};
