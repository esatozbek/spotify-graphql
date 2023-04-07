import fs from 'fs';
import Logger from 'utils/logger';

export function writeToFile(fileName: string, content: any = ''): boolean {
    Logger.debug('writeToFile');
    try {
        fs.writeFileSync(fileName, content);
        return true;
    } catch (err) {
        Logger.error(`Read file ${fileName} failed!`);
        return false;
    }
}

export function readFromFile(fileName: string): string | null {
    Logger.debug('readFromFile');
    try {
        return fs.readFileSync(fileName, 'utf-8');
    } catch (err) {
        Logger.error(`Read file ${fileName} failed!`);
        return null;
    }
}

export function parseFileContent(fileContent: string): Record<string, string> {
    Logger.debug('parseFileContent');
    try {
        const lines = fileContent.split('\n');
        const parsedContent = lines.reduce<Record<string, string>>((acc, line) => {
            const seperatorIdx = line.indexOf('=');
            const key = line.slice(0, seperatorIdx);
            const value = line.slice(seperatorIdx + 1, line.length);
            if (!key || key === '') {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        return parsedContent;
    } catch (e) {
        Logger.error(e);
        return {};
    }
}

export function serializeContent(content: Record<string, string>) {
    Logger.debug('serializeContent');
    return Object.entries(content)
        .map(([key, value]) => {
            return key + '=' + value;
        })
        .reduce((acc, line) => acc + '\n' + line, '');
}

export function writeKeyValueToFile(fileName: string, key: string, value?: string): boolean {
    Logger.debug('writeKeyValueToFile');

    if (!value) {
        return false;
    }
    const content = readFromFile(fileName);
    const parsedContent = parseFileContent(content || '');
    parsedContent[key] = value;
    const serializedContent = serializeContent(parsedContent);
    return writeToFile(fileName, serializedContent);
}

export function readValueFromFile(fileName: string, key: string): string | null {
    Logger.debug('readValueFromFile' + 'fileName' + fileName);
    const content = readFromFile(fileName);
    if (!content) {
        writeToFile(fileName);
        return null;
    }
    const parsedContent = parseFileContent(content);
    return parsedContent[key];
}
