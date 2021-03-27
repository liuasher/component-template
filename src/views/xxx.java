private String generateCode() {
    StringBuilder codeBuilder = new StringBuilder();
    //特殊判断一下，G3后的摄像头才用新的模式
    String modelHead = getIntent().getStringExtra("model");
    if (DeviceModelConstants.isNewQRCode(modelHead)) {
        codeBuilder.append("b=").append(mBindKey)
                .append("&d=").append(LocationHelper.getFastlinkUrl())
                .append("&x=").append(ScanUtils.qrcodeEncrypt(mWifi))
                .append("&y=").append(ScanUtils.qrcodeEncrypt(mPwd))
                .append("&l=").append(Locale.getDefault().getLanguage().toLowerCase());
    } else {
        byte[] wifiBytes, pwdBytes;
        wifiBytes = mWifi.getBytes(StandardCharsets.UTF_8);
        pwdBytes = xor(mPwd).getBytes(StandardCharsets.UTF_8);
        codeBuilder.append("b=").append(mBindKey)
                .append("&d=").append(LocationHelper.getFastlinkUrl())
                .append("&s=").append(Base64Utils.print(wifiBytes, 0, wifiBytes.length))
                .append("&p=").append(Base64Utils.print(pwdBytes, 0, pwdBytes.length))
                .append("&l=").append(Locale.getDefault().getLanguage().toLowerCase());
    }

    return codeBuilder.toString();
}

public static Pair<Boolean, Integer> encrypt_char(byte in) {
    //min max sign mask;
    int[][] table = new int[][]{
            {-128, -48, 33, 164},
            {-47, 32, 34, 83},
            {33, 35, -1, 0},
            {127, 127, 35, -91}
    };
    for (int i = 0; i < table.length; i++) {
        if (!(table[i][0] <= in && table[i][1] >= in)) {//不在范围内
            continue;
        }
        int sign = table[i][2] != -1 ? table[i][2] : in;
        int mask = table[i][3];
        return new Pair<>(false, (sign << 8) + mask + in);
    }
    return new Pair<>(true, -1);
}

public static String qrcodeEncrypt(String str) {
    byte[] strBytes = str.getBytes();
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < strBytes.length; i++) {
        Pair<Boolean, Integer> rPair = encrypt_char(strBytes[i]);
        int r = rPair.second;
        if (rPair.first) {
            sb.append((char) ((126 + 36) - strBytes[i]));
        } else {
            sb.append((char) ((r & 0xff00) >> 8));
            sb.append((char) (r & 0xff));
        }
    }
    return sb.toString();
}
    //TODO 测试代码
//    String originStr = "LUMIwifi-GFW-5G£₱";
//    String originStr2 = "qwertyuiopasdfghjklzxcvbnm,.1234567890";
//    String result1 = ScanUtils.qrcodeEncrypt(originStr);
//    String result2 = ScanUtils.qrcodeEncrypt(originStr2);
//
//                Logs.d("biu biu ------> wtf --->", result1, "\t\t\t" + ScanUtils.qrcode_decrypt(result1));
//                Logs.d("biu biu ------> wtf --->", result2, "\t\t\t" + ScanUtils.qrcode_decrypt(result2));
//                Logs.d("biu biu ------> wtf --->", ScanUtils.qrcodeEncrypt("中高\uD83D\uDE01\uD83D\uDC4CLUMIwifi-GFW-5G"), "\t\t" + ScanUtils.qrcode_decrypt("7!\\!Q\"<!O!<\"C!C!<!%\"C!C!5!0VMUY+9<9u[\\Kum["));



public static String print(byte[] input, int offset, int len) {
    char[] buf = new char[(len + 2) / 3 * 4];
    int ptr = print(input, offset, len, buf, 0);

    assert ptr == buf.length;

    return new String(buf);
}

public static int print(byte[] input, int offset, int len, char[] buf, int ptr) {
    for(int i = offset; i < len; i += 3) {
        switch(len - i) {
            case 1:
                buf[ptr++] = encode(input[i] >> 2);
                buf[ptr++] = encode((input[i] & 3) << 4);
                buf[ptr++] = 61;
                buf[ptr++] = 61;
                break;
            case 2:
                buf[ptr++] = encode(input[i] >> 2);
                buf[ptr++] = encode((input[i] & 3) << 4 | input[i + 1] >> 4 & 15);
                buf[ptr++] = encode((input[i + 1] & 15) << 2);
                buf[ptr++] = 61;
                break;
            default:
                buf[ptr++] = encode(input[i] >> 2);
                buf[ptr++] = encode((input[i] & 3) << 4 | input[i + 1] >> 4 & 15);
                buf[ptr++] = encode((input[i + 1] & 15) << 2 | input[i + 2] >> 6 & 3);
                buf[ptr++] = encode(input[i + 2] & 63);
        }
    }

    return ptr;
}


private String xor(String content) {
    int strLength = content.length();
    int keyLength = KEY.length();
    char[] result = new char[strLength];
    for (int i = 0; i < result.length; i++) {
        result[i] = 0;
    }
    for (int i = 0; i < strLength; i++) {
        result[i] = (char) (content.charAt(i) ^ KEY.charAt(i % keyLength));
        if (result[i] == 0) {
            result[i] = content.charAt(i);
        }
    }
    return new String(result);
}