package com.avaya.ept.bloom.service;

import com.avaya.ept.bloom.domain.BlackList;

import java.util.List;
import java.util.Map;

public interface BlackListService {
    BlackList createBlackList(BlackList blackList);
    BlackList updateBlackList(BlackList blackList);
    Map<String, String> uploadBlackList(List<String[]> strList, String application);
}
