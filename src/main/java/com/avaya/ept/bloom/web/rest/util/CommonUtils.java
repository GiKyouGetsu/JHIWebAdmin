package com.avaya.ept.bloom.web.rest.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtils {

    private static SimpleDateFormat SAM_DF= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static String getCurrentDate() {
        return SAM_DF.format(new Date());
    }

}
