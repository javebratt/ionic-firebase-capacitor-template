// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-mocha-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],

    // TRIGGER:
    autoWatch: true,
    singleRun: false,

    // BUILD:
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    basePath: "",
    angularCli: {
      environment: "dev",
    },

    // RUN:
    port: 9876,
    browsers: ["Chrome"],

    // REPORT:
    colors: true,
    logLevel: config.LOG_INFO,
    reporters: ["mocha"],

    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },

    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },

    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/ngv"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    restartOnFileChange: true,
  });
};
