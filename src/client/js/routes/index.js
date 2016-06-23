import Backbone from 'backbone'
import moment from 'moment'
import es from 'moment/locale/es'
import _ from 'backbone/node_modules/underscore'
import $ from 'jquery'

// Collections ===
import Messages from 'src/client/js/collections/messages'
// Models ========
import Message from 'src/client/js/models/message'
import User from 'src/client/js/models/user'
// Views =========
import ChatView from 'src/client/js/views/chat/messages'
//import ChatMessageView from 'src/client/js/views/chat/message'
import ChatSendView from 'src/client/js/views/chat/sendMessage'
// set up socket io
// const socket = io.connect('http://localhost:3000')

class Router extends Backbone.Router {
  get routes () {
    return {
      "": "start"
    }
  }

  initialize () {
    this.initEvents() // initializing  globals events

    this.messages = new Messages()
    this.chatView = new ChatView({ collection: this.messages })
    this.chatSendView = new ChatSendView()

    Backbone.history.start({
      root: "/",
      pushState: true
    })
  }

  initEvents () {
    this.events = {}
    _.extends(this.events, Backbone.Events)
  }

  addMessage(text) {
    // set up message
    let message = {
      text: text,
      username: this.chatProfileView.model.get('username'),
      date: moment().format()
    }
    // emit message to server
    //socket.emit('message' message)
    // add message to chatView
    message.text = this.ChatSendView.textFormat(text)
    this.messages.add(new Message(message))
  }
}
