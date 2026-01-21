namespace my.employee;

entity Employees {
    key ID          : UUID;
    firstName       : String(100);
    lastName        : String(100);
    email           : String(100);
    department      : String(50);
    role            : String(50);
    salary          : Integer;
    joiningDate     : Date;
}
