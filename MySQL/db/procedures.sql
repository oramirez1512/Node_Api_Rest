USE company;

DELIMITER $$
USE `company`$$

CREATE procedure employeeAddOrEdit(
in nuid int,
in sbname varchar(45),
in nusalary int
)
begin
	if nuid =0 then 
		insert into employees(name, salary) values(sbname,nusalary);
		set nuid= last_insert_id();
	else
		update employees
		set
			name = sbname,
			salary =nusalary
			where id = nuid;
	end if ;    
    select nuid as id;
end;