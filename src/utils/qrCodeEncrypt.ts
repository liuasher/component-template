import { ConsoleLog } from './log'

const encryptChar = (param: Number): {
    first: Boolean;
    second: Number
} => {
    const matrix = [
        [-128, -48, 33, 164],
        [-47, 32, 34, 83],
        [33, 35, -1, 0],
        [127, 127, 35, -91],
    ];
    for (let i = 0; i < matrix.length; i++) {
        if (!(matrix[i][0] <= Number(param) && matrix[i][1] >= Number(param))) {
            //不在范围内
            continue;
        }
        const sign = matrix[i][2] != -1 ? matrix[i][2] : param;
        const mask = matrix[i][3];
        return {
            first: false,
            second: (Number(sign) << 8) + mask + Number(param),
        };
    }
    return {
        first: true,
        second: -1,
    };
}

const getBytes = function (str = '') {
    const result = []
    for (let i = 0; i < str.length; i++) {
        result.push(str[i].charCodeAt(0))
    }
    return result
}

/**
 * G3后的摄像头才用新的模式
 * @param str 
 * @returns 
 */
const newQrCodeEncrypt = (str: string) => {
    const strBytes: number[] = getBytes(str);
    const sb: any[] = [];
    for (let i = 0; i < strBytes.length; i++) {
        const rPair = encryptChar(strBytes[i]);
        const r = rPair.second;
        if (rPair.first) {
            sb.push((126 + 36 - strBytes[i]));
        } else {
            sb.push(((Number(r) & 0xff00) >> 8));
            sb.push((Number(r) & 0xff));
        }
    }
    return String.fromCharCode(...sb);
}

const xor = (content: string): string => {
    const KEY = ''
    const strLength = content.length;
    const keyLength = KEY.length;
    const result = [strLength];
    for (let i = 0; i < result.length; i++) {
        result[i] = 0;
    }
    for (let i = 0; i < strLength; i++) {
        result[i] = (Number(content.charAt(i)) ^ Number(KEY.charAt(i % keyLength)));
        if (result[i] == 0) {
            result[i] = Number(content.charAt(i));
        }
    }
    return String.fromCharCode(...result);
}

const oldQrCodeEncrypt = (str: string, needXor: boolean) => {

    ConsoleLog(str, '', true)

    const input = needXor ? xor(str) : str

    ConsoleLog('input: ', input)

    // const buf = [Math.floor((str.length + 2) / 3 * 4)];

    // intPrint(input, 0, str.length, buf, 0);

    // ConsoleLog('buf: ', `${JSON.stringify(buf)} ${buf.length}`)
    // ConsoleLog('result: ', String.fromCharCode(...buf))

    // return String.fromCharCode(...buf);
}

const intPrint = (input: number[], offset: number, len: number, buf: number[], ptr: number) => {
    for (let i = offset; i < len; i += 3) {
        switch (len - i) {
            case 1:
                buf[ptr++] = input[i] >> 2
                buf[ptr++] = (input[i] & 3) << 4
                buf[ptr++] = 61
                buf[ptr++] = 61;
                break;
            case 2:
                buf[ptr++] = input[i] >> 2
                buf[ptr++] = (input[i] & 3) << 4 | input[i + 1] >> 4 & 15
                buf[ptr++] = (input[i + 1] & 15) << 2
                buf[ptr++] = 61;
                break;
            default:
                buf[ptr++] = input[i] >> 2
                buf[ptr++] = (input[i] & 3) << 4 | input[i + 1] >> 4 & 15
                buf[ptr++] = (input[i + 1] & 15) << 2 | input[i + 2] >> 6 & 3
                buf[ptr++] = input[i + 2] & 63
        }
    }
    return ptr;
}

export {
    newQrCodeEncrypt,
    oldQrCodeEncrypt
}