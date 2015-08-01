// appModule.config(httpInterceptors) // add httpInterceptors

httpInterceptors.$inject = ['$httpProvider']
function httpInterceptors ($httpProvider) {
  $httpProvider.interceptors.push(httpErrorHandler)
  $httpProvider.interceptors.push(httpReqResHandler)

  function isHtmlFile (fileName) {
    return fileName.slice(fileName.length - 5) === '.html'
  }

  httpReqResHandler.$inject = ['$q', '$window', '$injector']
  function httpReqResHandler ($q, $window, $injector) {
    return {
      request (config) {
        if ($window.localStorage.debug && !isHtmlFile(config.url)) {
          // Full debug info for request
          $window.console.debug('%c REQUEST: ' + config.url, 'color: gray')
          $window.console.debug(config)
          if (['POST', 'PUT', 'DELETE'].indexOf(config.method) !== -1) {
            $injector.get('coNotificationService').success({header: config.method})
          }
        }
        config.headers = config.headers || {}
        return config
      },

      response (res) {
        if ($window.localStorage.debug && !isHtmlFile(res.config.url)) {
          // Full debug info for response
          $window.console.debug('%c RESPONSE: ' + res.config.url, 'color: green')
          $window.console.debug(res)
        }
        return res
      }
    }
  }
}

httpErrorHandler.$inject = ['$injector', '$q', '$window']
function httpErrorHandler ($injector, $q, $window) {

  return {
    responseError (response) {
      $window.console.debug('%c RESPONSE ERROR: ', 'color: red', response)
      switch (response.status) {
        /**
         * 400 Bad Request
         * The server cannot or will not process the request due to something that is
         * perceived to be a client error (e.g., malformed request syntax, invalid
         * request message framing, or deceptive request routing).
         **/
        case 400:
          $injector.get('coNotificationService').error({
            header: 'Error',
            body: '400 Bad Request'
          })
          break

        /**
         * 401 Unauthorized
         * Similar to 403 Forbidden, but specifically for use when authentication is
         * required and has failed or has not yet been provided. The response must
         * include a WWW-Authenticate header field containing a challenge applicable
         * to the requested resource.
         **/
        case 401:
          $injector.get('coNotificationService').error({
            header: 'Error',
            body: '401 Unauthorized'
          })
          break

        /**
         * 403 Forbidden
         * The request was a valid request, but the server is refusing to respond to it.
         * Unlike a 401 Unauthorized response, authenticating will make no difference.
         **/
        case 403:
          $injector.get('coNotificationService').error({
            header: 'Error',
            body: '403 Forbidden'
          })
          break

        /**
         * 405 Method Not Allowed
         * A request was made of a resource using a request method not supported by that
         * resource for example, using GET on a form which requires data to be presented
         * via POST, or using PUT on a read-only resource.
         **/
        case 405:
          $injector.get('coNotificationService').error({
            header: 'Error',
            body: '401 Method Not Allowed'
          })
          break

        /**
         * 404 Not Found
         * The requested resource could not be found but may be available again in the future.
         * Subsequent requests by the client are permissible.
         **/
        case 404:
          $injector.get('coNotificationService').error({
            header: 'Error',
            body: '404 Not Found'
          })
          break
        /**
         * 410 Gone
         * Indicates that the resource requested is no longer available and will not be available
         * again. This should be used when a resource has been intentionally removed and the
         * resource should be purged.
         **/
        case 410:
          $injector.get('coNotificationService').error({
            header: 'Error',
            body: '410 Gone'
          })
          break

        /**
         * 500 Internal Server Error
         * A generic error message, given when an unexpected condition was encountered and no
         * more specific message is suitable.
         **/
        case 500:
          $injector.get('coNotificationService').error({\
            header: 'Error',
            body: '500 Server Error'
          })
          break

        default:
          $injector.get('coNotificationService').error({header: 'Error'})
          break
      }
      return $q.reject(response)
    }
  }
}

export default httpInterceptors
