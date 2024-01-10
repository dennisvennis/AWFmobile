import Api from "./Api";

const ApiServices = {
  //////// REQUEST SERVICES //////////
  addRequest(formData) {
    return Api().post("/expense", formData);
  },
  getRequest(params) {
    return Api().get("/expense", { params });
  },
  getSingleRequest(requestId) {
    return Api().get(`/${requestId}/approval`);
  },

  //////// NOTIFICATION SERVICES //////////
  getAllNotifications(pageLimit, pageNumber, read) {
    let params = {
      pageLimit,
      pageNumber,
      read,
    };
    return Api().get("/notifications", { params });
  },

  //////// EXPENSE TYPE SERVICES //////////
  getAllExpenseTypes() {
    return Api().get("/expenseTypes");
  },
  getAllDocumentTypes() {
    return Api().get("/documentTypes");
  },

  //////// CURRENCY SERVICES //////////
  getAllCurrencies() {
    return Api().get("/currencies");
  },

  //////// COMMENT SERVICES //////////
  addCommentToRequest(workflowId, formData) {
    return Api().put(`/comment/${workflowId}`, formData);
  },
  veiwComments(workflowIds) {
    let params = {
      workflowIds,
    };
    return Api().get("/comments", { params });
  },

  //////// BANK SERVICES //////////
  getAllBanks() {
    return Api().get("/banks/info");
  },
};

export default ApiServices;
