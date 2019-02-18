package com.avaya.ept.bloom.service.impl;

import com.avaya.ept.bloom.domain.BlackList;
import com.avaya.ept.bloom.domain.enumeration.NumberSource;
import com.avaya.ept.bloom.repository.BlackListRepository;
import com.avaya.ept.bloom.service.BlackListService;
import com.avaya.ept.bloom.web.rest.util.CommonUtils;
import com.avaya.ept.bloom.web.rest.util.GlobalConst;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BlackListServiceImpl implements BlackListService {

    private final Logger log = LoggerFactory.getLogger(BlackListServiceImpl.class);
    private static SimpleDateFormat SAM_DF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private BlackListRepository blackListRepository;

    @Override
    public BlackList createBlackList(BlackList blackList) {
        String currentDT = CommonUtils.getCurrentDate();
        blackList.setNumberSource(NumberSource.MANUAL);
        blackList.setCreatetime(currentDT);
        blackList.setChangetime(currentDT);

        log.debug("REST request to save BlackList : {}", blackList);
        return blackListRepository.save(blackList);
    }

    @Override
    public BlackList updateBlackList(BlackList blackList) {
        String currentDT = CommonUtils.getCurrentDate();
        blackList.setChangetime(currentDT);
        log.debug("REST request to save BlackList : {}", blackList);
        return blackListRepository.save(blackList);
    }

    @Override
    public Map<String, String> uploadBlackList(List<String[]> strList, String application) {
        Map<String, String> rtnMap = null;
        String failedRow = "";
        int len = strList.size();
        if (len > 1000) {
            rtnMap = new HashMap<>();
            rtnMap.put(GlobalConst.EXCEED, "Number of line is out of range");
            log.info("Import row is: [" + len + "] out of limit range");
            return rtnMap;
        }
        for (int i = 1; i < len; i ++) {
            rtnMap = new HashMap<>();
            String[] temStr = strList.get(i);
            String row = String.valueOf(i + 1);
            if (temStr.length != 3) {
                failedRow = CommonUtils.combineLine(row, failedRow);
                log.debug("Each row of import data must be 3 columns");
            } else {
                if (ckNumberAndDate(temStr[0], temStr[1])) {

                    BlackList saveBlackList = getSavedBlackList(temStr[0], temStr[1], temStr[2], application);
                    List<BlackList> ckOnlyList = blackListRepository.findByBlacknumber(saveBlackList.getBlacknumber());

                    if (ckOnlyList.size() > 0) {
                        saveBlackList.setId(ckOnlyList.get(0).getId());
                    }
                    log.debug("Batch saved black number is: "  + saveBlackList.toString() );
                    this.blackListRepository.save(saveBlackList);
                } else {
                    log.debug("The [" + row + "] row is invalid, check number or date format is correct!");
                    failedRow = CommonUtils.combineLine(row, failedRow);
                }
            }
        }
        if (StringUtils.isNotEmpty(failedRow)) {
            log.debug("Number of rows failed to import: " + failedRow);
            rtnMap.put(GlobalConst.FAILED_ROW, failedRow);
        }
        return rtnMap;
    }

    /**
     * @param number
     * @param date
     * @return true: both of number and date is valid
     *         false: number is invalid or date is invalid
     */
    private boolean ckNumberAndDate(String number, String date) {
        return CommonUtils.ckBlackNumber(number) && CommonUtils.ckDateParse(date);
    }

    private BlackList getSavedBlackList(String number, String date, String reason ,String application) {

        String currentDT = CommonUtils.getCurrentDate();
        BlackList saveBlackList = new BlackList();
        saveBlackList.setBlacknumber(number);
        try {
            saveBlackList.setValidityPeriod(CommonUtils.getFormatDate(date));
        } catch (ParseException e) {
            log.debug(e.getMessage());
        }
        saveBlackList.setAddReason(reason);
        saveBlackList.setCreatetime(currentDT);
        saveBlackList.setChangetime(currentDT);
        saveBlackList.setNumberSource(NumberSource.BATCH);
        saveBlackList.setApplicant(application);

        return saveBlackList;
    }
}
