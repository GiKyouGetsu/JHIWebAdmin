package com.avaya.ept.bloom.repository;

import com.avaya.ept.bloom.domain.BlackList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BlackList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlackListRepository extends JpaRepository<BlackList, Long> {

//    @Query(value = "select black_list.id, black_list.blacknumber" +
//        ", black_list.applicant, black_list.addReason" +
//        ", black_list.numberSource, black_list.validityPeriod" +
//        ", black_list.createtime, black_list.changetime" +
//        " from BlackList black_list " +
//        " where" +
//        " black_list.blacknumber like ?1% and black_list.applicant like ?2%", nativeQuery = true)
//    Page<BlackList> queryBlackList(String blacknumber, String applicant, Pageable pageable);

        @Query(value = "select *" +
        " from black_list" +
        " where" +
        " blacknumber like %?1% and applicant like %?2%", nativeQuery = true)
    Page<BlackList> queryBlackList(String blacknumber, String applicant, Pageable pageable);
}
