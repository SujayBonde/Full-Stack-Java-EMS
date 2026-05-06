package com.sujay.emp_backend.repository;

import com.sujay.emp_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
