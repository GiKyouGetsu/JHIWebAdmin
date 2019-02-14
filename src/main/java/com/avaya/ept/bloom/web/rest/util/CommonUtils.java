package com.avaya.ept.bloom.web.rest.util;

import liquibase.util.csv.CSVReader;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CommonUtils {

    private static SimpleDateFormat SAM_DF= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

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
            convFile.delete();
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
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
}
