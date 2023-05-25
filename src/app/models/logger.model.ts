/* enum LogLevel {
    INFO = 0,
    WARNING = 1,
    ERROR = 2
} */

export enum LogLevel {
    INFO = 'blue',
    WARNING = 'yellow',
    ERROR = 'red'
}

export class Logger {
    level: LogLevel;
    message: string;

    constructor(level: LogLevel, message: string) {
        this.level = level;
        this.message = message;
    }

    print() {
        const date = (new Date()).toISOString();
        console.log(`%c ${date}: ${this.message}`, `color: ${this.level}`);
    }
}