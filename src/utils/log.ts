
const ConsoleLogJSON = function ConsoleLogJSON(
    title: string,
    data: {
        [k: string]: any;
    },
    color?: string
) {
    if (data === undefined) {
        return;
    }
    console.group(title);
    Object.keys(data).forEach((key: string) => {
        const type = typeof data[key];
        if (type === 'string' || type === 'number' || type === 'boolean') {
            ConsoleLogValue(key, data[key], color);
        } else if (data[key] instanceof Array) {
            ConsoleLogValue(key, JSON.stringify(data[key]), color);
        } else if (data[key] instanceof Object) {
            ConsoleLogJSON(key, data[key]);
        }
    });
    console.groupEnd();
}

function ConsoleLogValue(key: string, value: string, color?: string) {
    console.log(`%c ${key}: ${value}`, `color:${color || '#546c9c'}`);
}

function ConsoleLog(key: string, value = '', title = false) {
    console.log(`%c ${key}:`, `background:${title ? '#2276d7;border-radius:2px;color:#fff;padding-right:4px' : ''}`, `${value}`);
}
export {
    ConsoleLogJSON,
    ConsoleLog
}