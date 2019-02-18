package com.avaya.ept.bloom.web.rest.util;

import liquibase.util.csv.CSVReader;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CommonUtils {

    private static final Logger log = LoggerFactory.getLogger(CommonUtils.class);
    private static SimpleDateFormat SAM_DF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static SimpleDateFormat SAM_DF_DAY = new SimpleDateFormat("yyyy-MM-dd");
    private static String REG = "^\\d{11}$";

    public static String getCurrentDate() {
        return SAM_DF.format(new Date());
    }

    public static List<String[]> getList(MultipartFile file) {

        File convFile = new File("C:\\var\\ftp\\" + file.getOriginalFilename());
        FileOutputStream fos = null;
        List<String[]> rtnList = null;
        try {
            convFile.createNewFile();
            fos = new FileOutputStream(convFile);
            fos.write(file.getBytes());
            rtnList = readCsvFile(convFile);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                boolean resultDel = convFile.delete();
                log.info("dleete result :" + String.valueOf(resultDel));
            }
        }
        return rtnList;
    }

    private static  List<String[]> readCsvFile(File csvFile) throws IOException {
        List<String[]> list = new ArrayList<>();
        FileReader fileReader = null;
        BufferedReader bufferedReader = null;
        try {
            fileReader = new FileReader(csvFile);
            bufferedReader = new BufferedReader(fileReader);
            CSVReader csvReader = new CSVReader(bufferedReader);
            list = csvReader.readAll();
        } catch (IOException e) {
            throw e;
        } finally {
            bufferedReader.close();
        }
        return list;
    }

    public static String combineLine(String line, String failedLine) {
        if (StringUtils.isEmpty(failedLine)) {
            return line;
        } else {
            return failedLine + "," + line;
        }
    }


    /**
     * @param str the tested
     * @return dateValid valid if str is date format or invalid if str is not date
     */
    public static boolean ckDateParse(String str) {
        if (str == null) {
            return false;
        }
        boolean dateValid= false;
        try {
            SAM_DF_DAY.setLenient(false);
            SAM_DF_DAY.parse(str);
            dateValid = true;
        } catch (ParseException e) {
            log.debug("Date character: [" + str + "] is invalid");
        }
        return dateValid;
    }

    /**
     * @param number black list number
     * @return numberValid if 11 digital number true else false
     */
    public static boolean ckBlackNumber(String number) {
        boolean numberValid =  false;
        if (number == null) {
            return false;
        }
        if(number.matches(REG)) {
            numberValid = true;
        } else {
            log.debug("Black number: [" + number + "] is invalid");
        }
        return numberValid;
    }

    public static String getFormatDate(String date) throws ParseException {
        return SAM_DF.format(SAM_DF_DAY.parse(date));
    }
}
