import Backbone from 'backbone'
import uid from 'uid'
import moment from 'moment'
import es from 'moment/locale/es'

class User extends Backbone.Model {
  default () {
    return {
      'username': `Guest-${uid(6)}`,
      'join': moment().format()
    }
  }

  initialize () {
    this.attributes = this.default()
  }
}

export default User
