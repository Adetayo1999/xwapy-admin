import axios from "axios";
import {
  makeAuthorizedRequestWithHeadersAndPayload,
  makeUnauthorizedRequestWithHeadersAndPayload,
} from ".";
import { endpoints } from "./endpoints";
import * as tp from "./types";

export const requests = {
  login(data: tp.LoginRequestBodyType): Promise<tp.LoginResponseType> {
    const { method, url } = endpoints.login;
    return makeUnauthorizedRequestWithHeadersAndPayload(method, url, data);
  },

  getOverview(data: tp.BaseRequestType): Promise<tp.GetOverviewResponseType> {
    const { method, url } = endpoints.get_overview;
    const query = queryHandler({ ...data });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  getUser(data: tp.BaseRequestType) {
    const { method, url } = endpoints.get_user_data;
    const query = queryHandler({ ...data });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  listTransactions(
    data: tp.ListTransactionsRequestType
  ): Promise<tp.ListTransactionsResponseType> {
    const { method, url } = endpoints.list_transactions;

    const query = queryHandler({ ...data });

    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  getResellers(data: tp.BaseRequestType): Promise<tp.GetResellersResponseType> {
    const { method, url } = endpoints.get_sellers;
    const query = queryHandler({ ...data });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query), data);
  },

  getResellerSettings(
    data: tp.GetResellersSettingsRequestType
  ): Promise<tp.GetResellersSettingsResponseType> {
    const { method, url } = endpoints.get_seller_settings;
    const query = queryHandler({ ...data });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  createReseller(
    data: tp.CreateResellerRequestType
  ): Promise<tp.CreateResellerResponseType> {
    const { method, url } = endpoints.create_seller;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },

  saveResellerSettiings(
    data: tp.SaveSellerSettingsRequestBodyType,
    queryData: tp.SaveSellerSettingsRequestType
  ): Promise<tp.SaveSellerSettingsResponseType> {
    const { method, url } = endpoints.save_seller_settings;
    const query = queryHandler({ ...queryData });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query), data);
  },

  getTransactionsGroup(
    data: tp.GetTransactionGroupRequestType
  ): Promise<tp.GetTransactionGroupResponseType> {
    const { method, url } = endpoints.get_transaction_group;
    const query = queryHandler({ ...data });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  getUsers(data: tp.GetUsersRequestType): Promise<tp.GetUsersResponseType> {
    const { method, url } = endpoints.get_users;
    const query = queryHandler({ ...data });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  getUserSettings(
    data: tp.GetUsersSettingsRequestType
  ): Promise<tp.GetUsersSettingsResponseType> {
    const { method, url } = endpoints.get_user_settings;
    const query = queryHandler({ ...data });

    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  uploadFile(data: tp.UploadFileRequestType) {
    return axios({
      method: endpoints.upload_file.method,
      url: endpoints.upload_file.url,
      data,
    });
  },

  addDataToStore(data: tp.AddToDataStoreRequestBodyType) {
    const { method, url } = endpoints.add_to_datastore;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },

  getFromDataStore(data: tp.getFromDataStoreRequestType) {
    const { method, url } = endpoints.get_from_data;
    const query = queryHandler({ ...data });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  getTransactionDetails(data: tp.GetTransactionDetailsRequestType) {
    const { method, url } = endpoints.get_transaction_details;
    const query = queryHandler({ ...data });
    return makeAuthorizedRequestWithHeadersAndPayload(method, url(query));
  },

  checkDomain(data: tp.CheckDomainRequestBodyType) {
    const { method, url } = endpoints.check_domain;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },

  saveDomain(data: tp.CheckDomainRequestBodyType) {
    const { method, url } = endpoints.save_domain;
    return makeAuthorizedRequestWithHeadersAndPayload(method, url, data);
  },
};

const queryHandler = (queryObj: Record<string, any>): string => {
  let query = "";

  const params = Object.keys(queryObj) as Array<keyof typeof queryObj>;

  params.forEach((param) => {
    if (queryObj[param]) {
      if (query.length === 0) {
        query += "?";
      } else {
        query += "&";
      }
      query += `${param}=${queryObj[param]}`;
    }
  });
  return query;
};
