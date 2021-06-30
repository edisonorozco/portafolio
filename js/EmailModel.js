class EmailModel {
  /**
   * Represents a Email.
   * @constructor
   * @param {string} nameClient - Client's name.
   * @param {string} emailClient - Email's client.
   * @param {string} subject - Subject's mial.
   * @param {string} message - Message's mail.
   */
  constructor(nameClient, emailClient, subject, message) {
    this.nameClient = nameClient;
    this.emailClient = emailClient;
    this.subject = subject;
    this.message = message;
  }
}
