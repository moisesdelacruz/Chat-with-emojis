import Backbone from 'backbone'
import $ from 'jquery'
import Message from 'src/client/js/views/chat/message'

class Messages extends Backbone.View {
  get el () { return $('#chat-messages') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.render, this)
    //this.listenTo(this.collection, 'remove', this.removeOne, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne(message) {
    let messageView = new Message({ model: message })
    this.$el.append(messageView.render().el)
    this.$el.animate({ scrollTop: this.$el.get(0).scrollHeight }, 600)
  }

  addAll () {
    this.collection.forEach(this.addOne, this)
  }
}


export default Messages
