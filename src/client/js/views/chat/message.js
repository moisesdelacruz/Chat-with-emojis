import Backbone from 'backbone'
import $ from 'jquery'
import es from 'moment/locale/es'
import moment from 'moment'
//import template from 'src/client/templates/chat/message.hbs'

class Message extends Backbone.View {
  get tagName () { return 'div' }
  get className () { return 'message' }

  render () {
    let message = this.model.toJSON()
    let html = template(message)
    this.$el.html(html)
    this.created = this.model.get('time')
    this.updateTime()
    return this
  }

  updateTime () {
    let relativeTime = moment(this.created).fromNow()
    this.$el.find('#date').html(relativeTime)
    setTimeout(() => this.updateTime(), 60000)
  }

}
