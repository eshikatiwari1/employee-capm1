namespace my.employee;

entity Employees {
  key ID         : UUID;
      employeeId : String;
      firstName  : String;
      lastName   : String;
      email      : String;
      department : String;
      role       : String;
      salary     : Integer;
      joiningDate: Date;
      status     : String;
      createdAt  : Timestamp;
      createdBy  : String;
      modifiedAt : Timestamp;
      modifiedBy : String;
}
