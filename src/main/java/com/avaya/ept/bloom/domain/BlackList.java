package com.avaya.ept.bloom.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.avaya.ept.bloom.domain.enumeration.NumberSource;

/**
 * A BlackList.
 */
@Entity
@Table(name = "black_list")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BlackList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "blacknumber", length = 20, nullable = false)
    private String blacknumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "number_source")
    private NumberSource numberSource;

    @Column(name = "validity_period")
    private Integer validityPeriod;

    @Size(max = 20)
    @Column(name = "add_reason", length = 20)
    private String addReason;

    @Size(max = 20)
    @Column(name = "applicant", length = 20)
    private String applicant;

    @Size(max = 50)
    @Column(name = "createtime", length = 50)
    private String createtime;

    @Size(max = 50)
    @Column(name = "changetime", length = 50)
    private String changetime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBlacknumber() {
        return blacknumber;
    }

    public BlackList blacknumber(String blacknumber) {
        this.blacknumber = blacknumber;
        return this;
    }

    public void setBlacknumber(String blacknumber) {
        this.blacknumber = blacknumber;
    }

    public NumberSource getNumberSource() {
        return numberSource;
    }

    public BlackList numberSource(NumberSource numberSource) {
        this.numberSource = numberSource;
        return this;
    }

    public void setNumberSource(NumberSource numberSource) {
        this.numberSource = numberSource;
    }

    public Integer getValidityPeriod() {
        return validityPeriod;
    }

    public BlackList validityPeriod(Integer validityPeriod) {
        this.validityPeriod = validityPeriod;
        return this;
    }

    public void setValidityPeriod(Integer validityPeriod) {
        this.validityPeriod = validityPeriod;
    }

    public String getAddReason() {
        return addReason;
    }

    public BlackList addReason(String addReason) {
        this.addReason = addReason;
        return this;
    }

    public void setAddReason(String addReason) {
        this.addReason = addReason;
    }

    public String getApplicant() {
        return applicant;
    }

    public BlackList applicant(String applicant) {
        this.applicant = applicant;
        return this;
    }

    public void setApplicant(String applicant) {
        this.applicant = applicant;
    }

    public String getCreatetime() {
        return createtime;
    }

    public BlackList createtime(String createtime) {
        this.createtime = createtime;
        return this;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    public String getChangetime() {
        return changetime;
    }

    public BlackList changetime(String changetime) {
        this.changetime = changetime;
        return this;
    }

    public void setChangetime(String changetime) {
        this.changetime = changetime;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BlackList blackList = (BlackList) o;
        if (blackList.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blackList.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlackList{" +
            "id=" + getId() +
            ", blacknumber='" + getBlacknumber() + "'" +
            ", numberSource='" + getNumberSource() + "'" +
            ", validityPeriod=" + getValidityPeriod() +
            ", addReason='" + getAddReason() + "'" +
            ", applicant='" + getApplicant() + "'" +
            ", createtime='" + getCreatetime() + "'" +
            ", changetime='" + getChangetime() + "'" +
            "}";
    }
}
