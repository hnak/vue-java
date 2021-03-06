package jp.co.toiware.condor.domain.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Data
@MappedSuperclass
@EntityListeners({AuditingEntityListener.class})
public abstract class EntityBase implements Serializable {

	@CreatedBy
	private String inputUser;

	@CreatedDate
	private LocalDateTime inputDateTime;

	@LastModifiedBy
	private String updateUser;

	@LastModifiedDate
	private LocalDateTime updateDateTime;

	private boolean isDeleted;

	@Version
	private Integer version;
}
