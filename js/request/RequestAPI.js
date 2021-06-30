class RequestAPI {
  /**
   * Container request
   * @constructor
   * @param {string} baseUrl General part of a url
   * @param {string} options settings header request
   * @param {string} interceptor interceptor errors request
   */
  constructor(baseUrl, options, interceptor) {
    this.baseUrl = baseUrl;
    this.options = options;
    this.interceptor = interceptor;
  }

  /**
   * @function
   * @param {string} endPoint specific part of a url
   * @param {Array} options optional header configuration
   * @returns
   */
  async makeRequest(endPoint, options) {
    const [error, response] = await fetch(endPoint, options)
      .then(async (response) => [null, await this.interceptor(response)])
      .catch((error) => [error, null]);

    return [error, response];
  }

  /**
   * A Get request
   * @function
   * @param {string} url specific part of a url
   * @param {string} params params request
   * @param {Array} options optional header configuration
   * @returns
   */
  async get(url, params, options = {}) {
    const endPoint = `${this.baseUrl}${url}${
        params ? `?${queryString(params)}` : ""
      }`,
      method = "GET",
      timeout = 6000;

    return this.makeRequest(endPoint, {
      method,
      timeout,
      ...options,
      headers: this.options.headers(method, url),
    });
  }

  /**
   * A Post request
   * @function
   * @param {string} url specific part of a url
   * @param {object} data send data
   * @param {Array} params params request
   * @param {Array} options optional header configuration
   * @returns
   */
  async post(url, data, params, options = {}) {
    const endPoint = `${this.baseUrl}${url}${
        params ? `?${queryString(params)}` : ""
      }`,
      method = "POST",
      timeout = 6000;

    return this.makeRequest(endPoint, {
      method,
      timeout,
      headers: this.options.headers(method, url),
      ...(data && { body: JSON.stringify(data), ...options }),
    });
  }
}
