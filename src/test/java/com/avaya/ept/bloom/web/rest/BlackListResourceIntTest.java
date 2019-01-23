package com.avaya.ept.bloom.web.rest;

import com.avaya.ept.bloom.AvayaBloomAdminApp;

import com.avaya.ept.bloom.domain.BlackList;
import com.avaya.ept.bloom.repository.BlackListRepository;
import com.avaya.ept.bloom.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.avaya.ept.bloom.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.avaya.ept.bloom.domain.enumeration.NumberSource;
/**
 * Test class for the BlackListResource REST controller.
 *
 * @see BlackListResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AvayaBloomAdminApp.class)
public class BlackListResourceIntTest {

    private static final String DEFAULT_BLACKNUMBER = "AAAAAAAAAA";
    private static final String UPDATED_BLACKNUMBER = "BBBBBBBBBB";

    private static final NumberSource DEFAULT_NUMBER_SOURCE = NumberSource.MANUAL;
    private static final NumberSource UPDATED_NUMBER_SOURCE = NumberSource.BATCH;

    private static final Integer DEFAULT_VALIDITY_PERIOD = 1;
    private static final Integer UPDATED_VALIDITY_PERIOD = 2;

    private static final String DEFAULT_ADD_REASON = "AAAAAAAAAA";
    private static final String UPDATED_ADD_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_APPLICANT = "AAAAAAAAAA";
    private static final String UPDATED_APPLICANT = "BBBBBBBBBB";

    private static final String DEFAULT_CREATETIME = "AAAAAAAAAA";
    private static final String UPDATED_CREATETIME = "BBBBBBBBBB";

    private static final String DEFAULT_CHANGETIME = "AAAAAAAAAA";
    private static final String UPDATED_CHANGETIME = "BBBBBBBBBB";

    @Autowired
    private BlackListRepository blackListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBlackListMockMvc;

    private BlackList blackList;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BlackListResource blackListResource = new BlackListResource(blackListRepository);
        this.restBlackListMockMvc = MockMvcBuilders.standaloneSetup(blackListResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlackList createEntity(EntityManager em) {
        BlackList blackList = new BlackList()
            .blacknumber(DEFAULT_BLACKNUMBER)
            .numberSource(DEFAULT_NUMBER_SOURCE)
            .validityPeriod(DEFAULT_VALIDITY_PERIOD)
            .addReason(DEFAULT_ADD_REASON)
            .applicant(DEFAULT_APPLICANT)
            .createtime(DEFAULT_CREATETIME)
            .changetime(DEFAULT_CHANGETIME);
        return blackList;
    }

    @Before
    public void initTest() {
        blackList = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlackList() throws Exception {
        int databaseSizeBeforeCreate = blackListRepository.findAll().size();

        // Create the BlackList
        restBlackListMockMvc.perform(post("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackList)))
            .andExpect(status().isCreated());

        // Validate the BlackList in the database
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeCreate + 1);
        BlackList testBlackList = blackListList.get(blackListList.size() - 1);
        assertThat(testBlackList.getBlacknumber()).isEqualTo(DEFAULT_BLACKNUMBER);
        assertThat(testBlackList.getNumberSource()).isEqualTo(DEFAULT_NUMBER_SOURCE);
        assertThat(testBlackList.getValidityPeriod()).isEqualTo(DEFAULT_VALIDITY_PERIOD);
        assertThat(testBlackList.getAddReason()).isEqualTo(DEFAULT_ADD_REASON);
        assertThat(testBlackList.getApplicant()).isEqualTo(DEFAULT_APPLICANT);
        assertThat(testBlackList.getCreatetime()).isEqualTo(DEFAULT_CREATETIME);
        assertThat(testBlackList.getChangetime()).isEqualTo(DEFAULT_CHANGETIME);
    }

    @Test
    @Transactional
    public void createBlackListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blackListRepository.findAll().size();

        // Create the BlackList with an existing ID
        blackList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlackListMockMvc.perform(post("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackList)))
            .andExpect(status().isBadRequest());

        // Validate the BlackList in the database
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBlacknumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = blackListRepository.findAll().size();
        // set the field null
        blackList.setBlacknumber(null);

        // Create the BlackList, which fails.

        restBlackListMockMvc.perform(post("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackList)))
            .andExpect(status().isBadRequest());

        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBlackLists() throws Exception {
        // Initialize the database
        blackListRepository.saveAndFlush(blackList);

        // Get all the blackListList
        restBlackListMockMvc.perform(get("/api/black-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blackList.getId().intValue())))
            .andExpect(jsonPath("$.[*].blacknumber").value(hasItem(DEFAULT_BLACKNUMBER.toString())))
            .andExpect(jsonPath("$.[*].numberSource").value(hasItem(DEFAULT_NUMBER_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].validityPeriod").value(hasItem(DEFAULT_VALIDITY_PERIOD)))
            .andExpect(jsonPath("$.[*].addReason").value(hasItem(DEFAULT_ADD_REASON.toString())))
            .andExpect(jsonPath("$.[*].applicant").value(hasItem(DEFAULT_APPLICANT.toString())))
            .andExpect(jsonPath("$.[*].createtime").value(hasItem(DEFAULT_CREATETIME.toString())))
            .andExpect(jsonPath("$.[*].changetime").value(hasItem(DEFAULT_CHANGETIME.toString())));
    }
    
    @Test
    @Transactional
    public void getBlackList() throws Exception {
        // Initialize the database
        blackListRepository.saveAndFlush(blackList);

        // Get the blackList
        restBlackListMockMvc.perform(get("/api/black-lists/{id}", blackList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(blackList.getId().intValue()))
            .andExpect(jsonPath("$.blacknumber").value(DEFAULT_BLACKNUMBER.toString()))
            .andExpect(jsonPath("$.numberSource").value(DEFAULT_NUMBER_SOURCE.toString()))
            .andExpect(jsonPath("$.validityPeriod").value(DEFAULT_VALIDITY_PERIOD))
            .andExpect(jsonPath("$.addReason").value(DEFAULT_ADD_REASON.toString()))
            .andExpect(jsonPath("$.applicant").value(DEFAULT_APPLICANT.toString()))
            .andExpect(jsonPath("$.createtime").value(DEFAULT_CREATETIME.toString()))
            .andExpect(jsonPath("$.changetime").value(DEFAULT_CHANGETIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBlackList() throws Exception {
        // Get the blackList
        restBlackListMockMvc.perform(get("/api/black-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlackList() throws Exception {
        // Initialize the database
        blackListRepository.saveAndFlush(blackList);

        int databaseSizeBeforeUpdate = blackListRepository.findAll().size();

        // Update the blackList
        BlackList updatedBlackList = blackListRepository.findById(blackList.getId()).get();
        // Disconnect from session so that the updates on updatedBlackList are not directly saved in db
        em.detach(updatedBlackList);
        updatedBlackList
            .blacknumber(UPDATED_BLACKNUMBER)
            .numberSource(UPDATED_NUMBER_SOURCE)
            .validityPeriod(UPDATED_VALIDITY_PERIOD)
            .addReason(UPDATED_ADD_REASON)
            .applicant(UPDATED_APPLICANT)
            .createtime(UPDATED_CREATETIME)
            .changetime(UPDATED_CHANGETIME);

        restBlackListMockMvc.perform(put("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBlackList)))
            .andExpect(status().isOk());

        // Validate the BlackList in the database
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeUpdate);
        BlackList testBlackList = blackListList.get(blackListList.size() - 1);
        assertThat(testBlackList.getBlacknumber()).isEqualTo(UPDATED_BLACKNUMBER);
        assertThat(testBlackList.getNumberSource()).isEqualTo(UPDATED_NUMBER_SOURCE);
        assertThat(testBlackList.getValidityPeriod()).isEqualTo(UPDATED_VALIDITY_PERIOD);
        assertThat(testBlackList.getAddReason()).isEqualTo(UPDATED_ADD_REASON);
        assertThat(testBlackList.getApplicant()).isEqualTo(UPDATED_APPLICANT);
        assertThat(testBlackList.getCreatetime()).isEqualTo(UPDATED_CREATETIME);
        assertThat(testBlackList.getChangetime()).isEqualTo(UPDATED_CHANGETIME);
    }

    @Test
    @Transactional
    public void updateNonExistingBlackList() throws Exception {
        int databaseSizeBeforeUpdate = blackListRepository.findAll().size();

        // Create the BlackList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlackListMockMvc.perform(put("/api/black-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blackList)))
            .andExpect(status().isBadRequest());

        // Validate the BlackList in the database
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBlackList() throws Exception {
        // Initialize the database
        blackListRepository.saveAndFlush(blackList);

        int databaseSizeBeforeDelete = blackListRepository.findAll().size();

        // Get the blackList
        restBlackListMockMvc.perform(delete("/api/black-lists/{id}", blackList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BlackList> blackListList = blackListRepository.findAll();
        assertThat(blackListList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlackList.class);
        BlackList blackList1 = new BlackList();
        blackList1.setId(1L);
        BlackList blackList2 = new BlackList();
        blackList2.setId(blackList1.getId());
        assertThat(blackList1).isEqualTo(blackList2);
        blackList2.setId(2L);
        assertThat(blackList1).isNotEqualTo(blackList2);
        blackList1.setId(null);
        assertThat(blackList1).isNotEqualTo(blackList2);
    }
}
