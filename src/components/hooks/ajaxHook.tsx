import axios from "axios";

export function axiosPost(url: any, payload?: any) {
  const response = axios.post(url, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return response;
}
export function axiosGet(url: any, payload?: any) {
  const response = axios.get(url, {
    params: payload,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return response;
}
export async function axiosGet2(url: any, payload?: any) {
  try {
    const response = await axios.get(url, {
      params: payload,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    return response.data;
  } catch (e) {
    return e;
  }
}
export async function axiosPost2(url: any, payload?: any) {
  const response = await axios.post(url, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  if (response.data) {
    return response.data;
  } else {
    return [];
  }
}

export const faqAxiosPost = async (url: any, config?: any) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.log(`error: ${error}`);
    return [];
  }
};
