System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "defaultExtension": "ts"
    },
    "common": {
      "defaultExtension": "ts"
    }
  },

  map: {
    "Foxandxss/angular-toastr": "github:Foxandxss/angular-toastr@1.4.1",
    "angular": "github:angular/bower-angular@1.4.3",
    "angular-animate": "github:angular/bower-angular-animate@1.4.3",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "calleboketoft/coDebug": "github:calleboketoft/coDebug@0.1.4",
    "calleboketoft/coSelectableItems": "github:calleboketoft/coSelectableItems@0.1.5",
    "css": "github:systemjs/plugin-css@0.1.13",
    "less": "github:aaike/jspm-less-plugin@0.0.5",
    "text": "github:systemjs/plugin-text@0.0.2",
    "typescript": "npm:typescript@1.8.10",
    "github:aaike/jspm-less-plugin@0.0.5": {
      "less.js": "github:distros/less@2.4.0"
    },
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:angular/bower-angular-animate@1.4.3": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:typescript@1.8.10": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    }
  }
});
