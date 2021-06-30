class CommentModel {
  /**
   * Represents a comment
   * @constructor
   * @param {int} id
   * @param {string} createAt
   * @param {string} commentClient
   */
  constructor(id, createAt, commentClient) {
    this.id = id;
    this.createAt = createAt;
    this.commentClient = commentClient;
  }

}
