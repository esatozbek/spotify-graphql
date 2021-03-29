import LoggerTarget from './logger.target';
import { LEVEL } from './index';

class ConsoleLoggerTarget implements LoggerTarget {
    write(log: string, level: LEVEL) {
        switch (level) {
            case LEVEL.DEBUG:
                console.log('\x1b[1m%s\x1b[0m %s', ' DEBUG ', log);
                return;
            case LEVEL.INFO:
                console.log('\x1b[1m\x1b[100m%s\x1b[0m  %s', ' INFO ', log);
                return;
            case LEVEL.WARN:
                console.log('\x1b[1m\x1b[43m\x1b[30m%s\x1b[0m  %s', ' WARN ', log);
                return;
            case LEVEL.ERROR:
                console.log('\x1b[1m\x1b[41m\x1b[30m%s\x1b[0m %s', ' ERROR ', log);
                return;
        }
    }
}

export default ConsoleLoggerTarget;
