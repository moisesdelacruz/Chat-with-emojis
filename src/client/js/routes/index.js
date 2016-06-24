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
import ChatProfileView from 'src/client/js/views/chat/profile'
import ChatSendView from 'src/client/js/views/chat/sendMessage'


class Router extends Backbone.Router {
  get routes () {
    return {
      "": "start"
    }
  }

  initialize () {
    this.initEvents() // initializing  globals events
    // uncomment the following line to enable socket.io
    // this.initSocket() // initializing  socket events

    this.messages = new Messages()
    this.chatView = new ChatView({ collection: this.messages })
    this.chatSendView = new ChatSendView()
    this.chatProfileView = new ChatProfileView({ model: new User() })

    Backbone.history.start({
      root: "/",
      pushState: true
    })
  }

  initEvents () {
    this.events = {}
    _.extend(this.events, Backbone.Events)

    this.events.on('message:send', text => this.sendMessage(text))
    this.events.on('message:received', message => this.receivedMessage(message))
    this.events.on('messages', messages => this.lastMessages(messages))
  }

  initSocket () {
    // set up socket io
    this.socket = io.connect('http://localhost:3000')

    this.socket.on('message', message => this.events.trigger('message:received', message))
    this.socket.on('messages', messages => this.events.trigger('messages', messages))
  }

  start () {
    this.messages.add(new Message({
      text: "This is a message of testing",
      username: "Chat"
      //date: moment().format()
    }))
  }

  lastMessages (messages) {
    this.messages.reset()
    messages.forEach(this.receivedMessage, this)
  }

  receivedMessage (message) {
    message.text = this.chatSendView.textFormat(message.text)
    this.messages.add(new Message (message))
  }

  sendMessage(text) {
    // set up message
    let message = {
      text: text,
      username: this.chatProfileView.model.get('username'),
      date: moment().format()
    }
    // emit message to server
    //this.socket.emit('message', message)
    // add message to chatView
    message.text = this.chatSendView.textFormat(text)
    this.messages.add(new Message(message))
  }
}

export default Router