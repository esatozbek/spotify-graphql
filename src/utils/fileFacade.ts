import fs from 'fs';
import Logger from 'utils/logger';

export function writeToFile(fileName: string, content: any = ''): boolean {
    try {
        fs.writeFileSync(fileName, content);
        return true;
    } catch (err) {
        Logger.error(`Read file ${fileName} failed!`);
        return false;
    }
}

export function readFromFile(fileName: string): string | null {
    try {
        return fs.readFileSync(fileName, 'utf-8');
    } catch (err) {
        Logger.error(`Read file ${fileName} failed!`);
        return null;
    }
}
