import { LEVEL } from './index';

interface ILoggerTarget {
    write(log: string, level: LEVEL): void;
}

export default ILoggerTarget;
