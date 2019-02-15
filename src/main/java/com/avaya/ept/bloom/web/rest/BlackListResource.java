package com.avaya.ept.bloom.web.rest;

import com.avaya.ept.bloom.domain.BlackList;
import com.avaya.ept.bloom.repository.BlackListRepository;
import com.avaya.ept.bloom.service.BlackListService;
import com.avaya.ept.bloom.service.storge.StorageService;
import com.avaya.ept.bloom.web.rest.errors.BadRequestAlertException;
import com.avaya.ept.bloom.web.rest.util.CommonUtils;
import com.avaya.ept.bloom.web.rest.util.HeaderUtil;
import com.avaya.ept.bloom.web.rest.util.PaginationUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import liquibase.util.csv.CSVReader;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing BlackList.
 */
@RestController
@RequestMapping("/api")
public class BlackListResource {

    private final Logger log = LoggerFactory.getLogger(BlackListResource.class);

    private static final String ENTITY_NAME = "blackList";

    private final BlackListRepository blackListRepository;

    @Autowired
    private BlackListService blackListService;

    public BlackListResource(BlackListRepository blackListRepository) {
        this.blackListRepository = blackListRepository;
    }

    @Autowired
    private StorageService storageService;
    /**
     * POST  /black-lists : Create a new blackList.
     *
     * @param blackList the blackList to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blackList, or with status 400 (Bad Request) if the blackList has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/black-lists")
    @Timed
    public ResponseEntity<BlackList> createBlackList(@Valid @RequestBody BlackList blackList) throws URISyntaxException {
        log.debug("REST request to save BlackList : {}", blackList);
        if (blackList.getId() != null) {
            throw new BadRequestAlertException("A new blackList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlackList result = blackListService.createBlackList(blackList);
        return ResponseEntity.created(new URI("/api/black-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /black-lists : Updates an existing blackList.
     *
     * @param blackList the blackList to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blackList,
     * or with status 400 (Bad Request) if the blackList is not valid,
     * or with status 500 (Internal Server Error) if the blackList couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/black-lists")
    @Timed
    public ResponseEntity<BlackList> updateBlackList(@Valid @RequestBody BlackList blackList) throws URISyntaxException {
        log.debug("REST request to update BlackList : {}", blackList);
        if (blackList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BlackList result = blackListService.updateBlackList(blackList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blackList.getId().toString()))
            .body(result);
    }

    /**
     * GET  /black-lists : get all the blackLists.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blackLists in body
     */
    @GetMapping("/black-lists")
    @Timed
    public ResponseEntity<List<BlackList>> getAllBlackLists(Pageable pageable) {
        log.debug("REST request to get a page of BlackLists");
        Page<BlackList> page = blackListRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/black-lists");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/black-lists/all")
    @Timed
    public ResponseEntity<List<BlackList>> getAll(Pageable pageable) {
        log.debug("REST request to get all BlackLists without pageable");
        List<BlackList> results = blackListRepository.findAll();
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/black-lists");
        return ResponseEntity.ok().body(results);
    }
    /**
     * GET  /black-lists/:id : get the "id" blackList.
     *
     * @param id the id of the blackList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blackList, or with status 404 (Not Found)
     */
    @GetMapping("/black-lists/{id}")
    @Timed
    public ResponseEntity<BlackList> getBlackList(@PathVariable Long id) {
        log.debug("REST request to get BlackList : {}", id);
        Optional<BlackList> blackList = blackListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(blackList);
    }

    /**
     * GET  /black-lists : get the "id" blackList.
     *
     * @param number the blacknumber of the blackList to retrieve
     * @param applicant the applicant of the blackList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blackList, or with status 404 (Not Found)
     */
    @GetMapping("/black-lists/filter")
    @Timed
    public ResponseEntity<List<BlackList>> getParamsBlackList(@RequestParam("blacknumber") String number,
                                                        @RequestParam("applicant") String applicant, Pageable pageable) {
        log.debug("REST request to get BlackList : {}", number, applicant);
        Page<BlackList> pageList = blackListRepository.queryBlackList(number, applicant, pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(pageList, "/api/black-lists/filter");
        return ResponseEntity.ok().headers(headers).body(pageList.getContent());
    }


    /**
     * GET  /black-lists : get the "id" blackList
     * @param  file of the blackList to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blackList, or with status 404 (Not Found)
     */
    @PostMapping("/black-lists/upload")
    @Timed
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("owner") String owner) {
        log.info("upload file");
        log.info("upload onwer: " + owner);

        Map<String, String> result = blackListService.uploadBlackList(CommonUtils.getList(file), owner);
        String returnParam = "";
        if (StringUtils.isNotEmpty(result.get("EXCEED_LINE"))) {
            returnParam = "EXCEED_LINE";
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityExceedLineAlert(ENTITY_NAME, returnParam)).body("success");
        } else {
            if (StringUtils.isNotEmpty(result.get("FAILED_LINE"))) {
                returnParam = result.get("FAILED_LINE");
                return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUploadAlert(ENTITY_NAME, returnParam)).body("success");
            } else {
                return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntitySucceedLineAlert(ENTITY_NAME, returnParam)).body("success");
            }
        }
    }

    /**
     * DELETE  /black-lists/:id : delete the "id" blackList.
     *
     * @param id the id of the blackList to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/black-lists/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlackList(@PathVariable Long id) {
        log.debug("REST request to delete BlackList : {}", id);

        blackListRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
