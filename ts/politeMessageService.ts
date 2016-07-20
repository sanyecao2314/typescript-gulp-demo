export default class PoliteMessageService {
    public makeRequestPolite(message: string): string {
        return `Please, ${message}`;
    }
}