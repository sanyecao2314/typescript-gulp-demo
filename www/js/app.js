System.register("politeMessageService", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PoliteMessageService;
    return {
        setters:[],
        execute: function() {
            PoliteMessageService = (function () {
                function PoliteMessageService() {
                }
                PoliteMessageService.prototype.makeRequestPolite = function (message) {
                    return "Please, " + message;
                };
                return PoliteMessageService;
            }());
            exports_1("default", PoliteMessageService);
        }
    }
});
System.register("app", ["politeMessageService"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var politeMessageService_1;
    var PoliteConsoleLogger, logger;
    return {
        setters:[
            function (politeMessageService_1_1) {
                politeMessageService_1 = politeMessageService_1_1;
            }],
        execute: function() {
            PoliteConsoleLogger = (function () {
                function PoliteConsoleLogger(_messageService) {
                    this._messageService = _messageService;
                }
                PoliteConsoleLogger.prototype.log = function (message) {
                    console.log(this._messageService.makeRequestPolite(message));
                };
                return PoliteConsoleLogger;
            }());
            logger = new PoliteConsoleLogger(new politeMessageService_1.default());
            logger.log("DO STUFF!");
        }
    }
});
