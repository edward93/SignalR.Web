import * as Http from "./Http.Client";

export const pushMessage = message => {
  return Http.Post(`api/message`, {}, message, false, false).then(result => {
    if (result) {
      return result;
    }
    return false;
  });
};