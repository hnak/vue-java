package jp.co.toiware.condor.domain.repository;

import jp.co.toiware.condor.domain.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface UserRepository extends JpaRepositoryBase<User, Long>, JpaSpecificationExecutor<User> {

}
