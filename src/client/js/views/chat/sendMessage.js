import Backbone from 'backbone'
import $ from 'jquery'

class SendMessage extends Backbone.View {
  get el () { return $('#chat-form') }
  get events () {
    return {
      'submit': 'sendMessage',
      'keypress': 'matchEnter'
    }
  }

  initialize () {
    this.$textarea = this.$el.find('#form-message')
  }

  matchEnter (ev) {
    if (window.matchMedia("(min-width : 800px)").matches){
      if (ev.keyCode === 13 && !ev.shiftKey) {
        ev.preventDefault()
        this.$el.submit()
      }
    }
  }

  sendMessage (ev) {
    ev.preventDefault()
    let exp = /.\S/i
    let text = this.$textarea.val()
    if (exp.test(text)) {
      Chat.events.trigger('message:send', text)
      this.$textarea
        .val('')
        .focus()
    }
  }

  textFormat (text) {
    let exp = {
      http: /(\b(https?|ftps?|git):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
      blank: /\r?\n/g
    }
    return text.replace(exp.http, '<a href="$1" target="_blank">$1</a>')
              .replace(exp.blank, '<br/>')
  }

}

export default SendMessage
