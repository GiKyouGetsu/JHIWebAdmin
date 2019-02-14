package com.avaya.ept.bloom.service.impl;

import com.avaya.ept.bloom.domain.BlackList;
import com.avaya.ept.bloom.domain.enumeration.NumberSource;
import com.avaya.ept.bloom.repository.BlackListRepository;
import com.avaya.ept.bloom.service.BlackListService;
import com.avaya.ept.bloom.web.rest.util.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
