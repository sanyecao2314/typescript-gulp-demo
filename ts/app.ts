import PoliteMessageService from "./politeMessageService";

class PoliteConsoleLogger {
    constructor(
        private _messageService: PoliteMessageService
    ) {
    }

    public log(message: string): void {
        console.log(this._messageService.makeRequestPolite(message));
    }
}

let logger = new PoliteConsoleLogger(new PoliteMessageService());
logger.log("DO STUFF!");