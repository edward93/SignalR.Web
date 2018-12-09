import "whatwg-fetch";
import Config from "Config";

const BaseUrl = Config.ServerUrl;

export const StringifyUrlEncoded = obj => {
  let urlEncoded = "";
  for (const key in obj) {
    urlEncoded += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + "&";
  }
  return urlEncoded;
};

export const Post = (url, headers, body, authorized = false, plainBody = false) => {
  if (authorized) {
    const authData = JSON.parse(localStorage.getItem("AuthData"));

    if (authData && authData.token) {
      headers.Authorization = "Bearer " + authData.token;
    }
  }

  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(BaseUrl + "/" + url, {
    method: "POST",
    headers,
    body: plainBody ? body : JSON.stringify(body).toString()
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 409) {
          return true;
        }
        return false;
      }
      // This is just a OPTIONS call to the server to make sure that the request is OK
      // Here can be done some manual checks.
      return response.json();
    })
    .catch(data => {
      console.log("Error", data);
    });
};

export const Delete = (url, headers, body, authorized = false, plainBody = false) => {
  if (authorized) {
    const authData = JSON.parse(localStorage.getItem("AuthData"));

    if (authData && authData.token) {
      headers.Authorization = "Bearer " + authData.token;
    }
  }

  // if (!headers["Content-Type"]) {
  //   headers["Content-Type"] = "application/json";
  // }

  return fetch(BaseUrl + "/" + url, {
    method: "DELETE",
    headers,
    body: plainBody ? body : JSON.stringify(body).toString()
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 409) {
          return true;
        }
        return false;
      }
      // This is just a OPTIONS call to the server to make sure that the request is OK
      // Here can be done some manual checks.
      return response.json();
    })
    .catch(data => {
      console.log("Error", data);
    });
};

export const Get = (url, headers, authorized = false) => {
  if (authorized) {
    const authData = JSON.parse(localStorage.getItem("AuthData"));

    if (authData && authData.token) {
      headers.Authorization = "Bearer " + authData.token;
    }
  }

  if (!headers.Accept) {
    headers.Accept = "application/json, */*";
  }

  return fetch(BaseUrl + "/" + url, {
    method: "GET",
    headers
  })
    .then(response => {
      // This is just a OPTIONS call to the server to make sure that the request is OK
      // Here can be done some manual checks.
      return response.json();
    })
    .catch(data => {
      console.log("Error", data);
    });
};

export const Put = (url, headers, body, authorized = false) => {
  if (authorized) {
    const authData = JSON.parse(localStorage.getItem("AuthData"));

    if (authData && authData.token) {
      headers.Authorization = "Bearer " + authData.token;
    }
  }

  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(BaseUrl + "/" + url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body).toString()
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 409) {
          return true;
        }
        return false;
      }
      // This is just a OPTIONS call to the server to make sure that the request is OK
      // Here can be done some manual checks.
      return response.json();
    })
    .catch(data => {
      console.log("Error", data);
    });
};
