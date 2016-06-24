import Backbone from 'backbone'
import $ from 'jquery'
import es from 'moment/locale/es'
import moment from 'moment'
import template from 'src/client/templates/message.hbs'

class Message extends Backbone.View {
  get tagName () { return 'div' }
  get className () { return 'message' }

  render () {
    let message = this.model.toJSON()
    let html = template(message)
    this.$el.html(html)
    twemoji.parse(this.el)
    this.created = message.date
    this.$time = this.$el.find('#date')
    this.updateTime()
    return this
  }

  updateTime () {
    let relativeTime = moment(this.created).fromNow()
    this.$time.html(relativeTime)
    setTimeout(() => this.updateTime(), 60000)
  }

}

export default Message
