import Backbone from 'backbone'
import uid from 'uid'
import moment from 'moment'
import es from 'moment/locale/es'

class User extends Backbone.Model {
  default () {
    let data = { username: `Guest-${uid(6)}`, join: moment().format() }
    localStorage.setItem('username', data.username)
    return data
  }

  initialize () {
    if(!localStorage.getItem('username'))
      this.attributes = this.default()
    else
      this.attributes = { username: localStorage.getItem('username') }
  }
}

export default User
