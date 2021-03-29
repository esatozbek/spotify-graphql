import ConsoleLoggerTarget from './console.target';
import ILoggerTarget from './logger.target';

export enum LEVEL {
    DEBUG = 1,
    INFO,
    WARN,
    ERROR,
}

class Logger {
    level: LEVEL;
    targets: ILoggerTarget[];

    constructor(level: LEVEL = LEVEL.DEBUG, targets: ILoggerTarget[] = [new ConsoleLoggerTarget()]) {
        this.level = level;
        this.targets = targets;

        this.formatData = this.formatData.bind(this);
    }

    private formatData(data: any) {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return `${formatter.format(date)} || ${String(data)}`;
    }

    private log(data: any, level: LEVEL) {
        if (level >= this.level) {
            this.targets.forEach((target) => target.write(this.formatData(data), level));
        }
    }

    info(data: any) {
        this.log(data, LEVEL.INFO);
    }

    warn(data: any) {
        this.log(data, LEVEL.WARN);
    }

    error(data: any) {
        this.log(data, LEVEL.ERROR);
    }

    debug(data: any) {
        this.log(data, LEVEL.DEBUG);
    }
}

export default new Logger();
