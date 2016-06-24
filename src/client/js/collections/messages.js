import Backbone from 'backbone'
import Message from 'src/client/js/models/message'

class Messages extends Backbone.Collection {
  constructor (options) {
    super(options)
    this.model = Message
  }
}

export default Messages
