const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
      return moment(date).utc().format(format)
    },
    truncate: function (str, len) {
      if (str.length > len && str.length > 0) {
        let new_str = str + ' '
        new_str = str.substr(0, len)
        new_str = str.substr(0, new_str.lastIndexOf(' '))
        new_str = new_str.length > 0 ? new_str : str.substr(0, len)
        return new_str + '...'
      }
      return str
    },
    stripTags: function (input) {
      return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (logUser, loggedUser, logId, floating = true) {
        if (logUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/logs/edit/${logId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/logs/edit/${logId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    },
}