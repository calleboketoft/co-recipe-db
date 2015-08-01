import 'jspm_packages/github/Foxandxss/angular-toastr@1.4.1/angular-toastr.tpls.js'
import 'jspm_packages/github/Foxandxss/angular-toastr@1.4.1/angular-toastr.min.css!css'

class CoNotificationService {
  public static $inject = [
    'toastr'
  ]
  constructor (
    private toastr
  ) { }

  defaultOptions = {
    timeOut: 5000,
    extendedTimeOut: 5000
  }

  success (message, options) {
    this.toastr.success(message.body, message.header, angular.extend({}, this.defaultOptions, options))
  }

  info (message, options) {
    this.toastr.info(message.body, message.header, options)
  }

  error (message, options = {}) {
    let mergedOptions = angular.extend({
      closeButton: true,
      autoDismiss: false,
      timeOut: 0,
      tapToDismiss: false
    }, options)
    return this.toastr.error(message.body, message.header, mergedOptions)
  }

  warning (message, options) {
    this.toastr.warning(message.body, message.header, options)
  }
}

export default angular.module('coNotification', ['toastr'])

.config(['toastrConfig', function (toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-bottom-right',
    maxOpened: 2,
    preventOpenDuplicates: true
  })
}])

.service('coNotificationService', CoNotificationService)