import Backbone from 'backbone'
import Message from 'src/client/js/collections/message'

class MessageS extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Message
  }
}

export default Message
