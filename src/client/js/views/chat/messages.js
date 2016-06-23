import Backbone from 'backbone'
import $ from 'jquery'
import Message from 'src/client/js/views/message'

class Messages extends Backbone.View {
  get el () { return $('#container-chat-messages') }

  initialize () {
    this.listenTo(this.collection, 'add', this.addOne, this)
    this.listenTo(this.collection, 'reset', this.addAll, this)
    //this.listenTo(this.collection, 'remove', this.removeOne, this)
  }

  render () {
    this.$el.empty()
    this.addAll()
  }

  addOne(message) {
    let messageView = new Message({ model: message })
    this.$el.append(messageView.render().el)
    this.$el.animate({ scrollTop: this.$el.scrollHeight }, 600)
  }
}
