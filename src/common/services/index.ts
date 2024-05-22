import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL, REQUEST_TIMEOUT } from "./consts";
import { clearUserDetails, fetchUserToken } from "./storage";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

/** authorization header for logged in user **/
const setAuthorization = () => ({
  Authorization: `Bearer ${fetchUserToken()}`,
});

/** axios instance **/
const instance = axios.create({
  baseURL: API_URL,
  headers,
  // withCredentials: true,
});

/** timeout configuration for axios instance **/
instance.defaults.timeout = REQUEST_TIMEOUT;

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/** axios interceptor to trigger a logout on unauthorized error response code **/
instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response.data;
  },

  (error: AxiosError<any>): any => {
    if (error.response && error?.response?.status === 401) {
      clearUserDetails();
      window.location.reload();

      return Promise.reject({
        status: 401,
        message: "Login session expired, please login again",
      });
    }

    if (error instanceof AxiosError && error.message === "Network Error") {
      return Promise.reject({
        status: 400,
        message: "Connection Error",
      });
    }

    if (error.message === "canceled") {
      return Promise.reject({
        error: true,
        data: null,
        message: null,
      });
    }

    return Promise.reject(
      error
        ? error.response
          ? error.response.data
          : {
              error: true,
              data: null,
              message: "Please check your Network connection.",
            }
        : null
    );
  }
);

/** make an axios get request **/
export const makeGetRequest = (path: string) => instance.get(path);

/** make an axios post request **/
export const makePostRequest = (path: string, payload: any) =>
  instance.post(path, payload);

/** make an axios request for a guest */
export const makeUnauthorizedRequestWithHeadersAndPayload = async (
  method: string,
  url: string,
  data: any
): Promise<any> => {
  const response: any = await instance.request({
    method,
    url,
    data,
    headers,
  });
  return response;
};

/** make an axios request for logged-in user **/
export const makeAuthorizedRequestWithHeadersAndPayload = async (
  method: string,
  url: string,
  data = {},
  signal?: any
) => {
  const response: any = await instance.request({
    method,
    url: url,
    data,
    signal,
    headers: {
      ...headers,
      ...setAuthorization(),
    },
  });
  return response;
};

/** make an axios request to submit a file for a logged in user **/
export const makeRequestWithFormData = async (
  method: string,
  url: string,
  data: any,
  authorized: any
) => {
  /** create new formdata object **/
  const formData = new FormData();

  let headers = {
    "Content-Type": "multipart/form-data",
  };

  /** loop through and append all data to formdata object **/
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const fieldData = data[key];

      if (key !== "texts" && key !== "media") {
        formData.append(key, fieldData);
      }
    }
  }

  if (authorized) {
    headers = { ...headers, ...setAuthorization() };
  }

  const response: any = await instance.request({
    method,
    url: url,
    data: formData,
    headers,
  });

  return response;
};

// export const makeCloudinaryPostRequest = async (
//   image: File | null | undefined,
//   progress: (e: AxiosProgressEvent) => void
// ) => {
//   /** create new formdata object **/
//   const data = new FormData();

//   data.append("file", image ? image : "");
//   data.append("api_key", CLOUD_KEY ? CLOUD_KEY : "");
//   data.append("upload_preset", "qfelv7hm");

//   const response: any = await axios.post(
//     `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
//     data,
//     {
//       headers: { "Content-Type": "multipart/form-data" },
//       onUploadProgress: progress,
//     }
//   );

//   return response;
// };
