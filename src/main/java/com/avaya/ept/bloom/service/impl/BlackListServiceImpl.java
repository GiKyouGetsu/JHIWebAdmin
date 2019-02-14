package com.avaya.ept.bloom.service.impl;

import com.avaya.ept.bloom.domain.BlackList;
import com.avaya.ept.bloom.domain.enumeration.NumberSource;
import com.avaya.ept.bloom.repository.BlackListRepository;
import com.avaya.ept.bloom.service.BlackListService;
import com.avaya.ept.bloom.web.rest.util.CommonUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BlackListServiceImpl implements BlackListService {

    private final Logger log = LoggerFactory.getLogger(BlackListServiceImpl.class);

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
        String failed_line = "";
        int len = strList.size();
        Map<String, String> temMap;
        if (len > 1000) {
            rtnMap = new HashMap<>();
            rtnMap.put("EXCEED_LINE", "Number of line is out of range");
            return rtnMap;
        }
        for (int i = 1; i < len; i ++) {
            rtnMap = new HashMap<>();
            String[] temStr = strList.get(i);
            if (temStr.length != 3) {
                failed_line = CommonUtils.combineLine(String.valueOf(i), failed_line);
            } else {
                String currentDT = CommonUtils.getCurrentDate();
                BlackList saveBlackList = new BlackList();
                saveBlackList.setBlacknumber(temStr[0]);
                saveBlackList.setValidityPeriod(temStr[1]);
                saveBlackList.setAddReason(temStr[2]);
                saveBlackList.setCreatetime(currentDT);
                saveBlackList.setChangetime(currentDT);
                saveBlackList.setNumberSource(NumberSource.BATCH);
                saveBlackList.setApplicant(application);

                List<BlackList> ckOnlyList = blackListRepository.findByBlacknumber(saveBlackList.getBlacknumber());

                if (ckOnlyList.size() > 0) {
                    saveBlackList.setId(ckOnlyList.get(0).getId());
                }
                this.blackListRepository.save(saveBlackList);
            }
        }
        if (StringUtils.isNotEmpty(failed_line)) {
            rtnMap.put("FAILED_LINE", failed_line);
        }
        return rtnMap;
    }


}
