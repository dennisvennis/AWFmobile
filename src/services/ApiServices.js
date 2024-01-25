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
    return Api().get("/expense/types");
  },
  getAllDocumentTypes() {
    return Api().get("/documentTypes");
  },

  //////// CURRENCY SERVICES //////////
  getAllCurrencies() {
    return Api().get("/currencies");
  },

  //////// CURRENCY SERVICES //////////
  getAlldepartments() {
    return Api().get("/departments");
  },

  //////// COMMENT SERVICES //////////
  addCommentToRequest(workflowId, payload) {
    return Api().put(`/comment/${workflowId}`, payload);
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

  //////// REACTION SERVICES //////////
  reactToRequest(workflowId, formData) {
    return Api().patch(`/reaction/${workflowId}`, formData);
  },

  //////// FILES SERVICES //////////
  getAllFilesOnExpense(workflowId) {
    return Api().get(`/${workflowId}/file`);
  },
  getFileInfoWithId(fileId) {
    return Api().get(`/file/${fileId}`);
  },
};

export default ApiServices;
