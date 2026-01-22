const cds = require('@sap/cds');
const path = require('path');
const employeesData = require(path.join(__dirname, 'db', 'data', 'employee-Employees.json'));
const { v4: uuidv4 } = require('uuid');

async function seed() {
  const db = await cds.connect.to('db');
  console.log('DB connected:', db.kind);

  const { Employees } = cds.entities('my.employee');

  // Delete existing data
  await db.run(DELETE.from(Employees));
  console.log('🗑️  Existing Employees deleted');

  // Prepare valid data
  const validData = employeesData.map(emp => ({
    ID: emp.ID || uuidv4(),
    firstName: emp.firstName,
    lastName: emp.lastName,
    email: emp.email,
    department: emp.department,
    role: emp.role,
    salary: emp.salary,
    joiningDate: emp.joiningDate ? new Date(emp.joiningDate) : new Date()
  }));

  // Insert each record individually to log
  for (const emp of validData) {
    await db.run(INSERT.into(Employees).entries(emp));
    console.log(`✅ Inserted: ${emp.firstName} ${emp.lastName} (${emp.email})`);
  }

  console.log(`🎉 Seed complete: ${validData.length} employees added to ${db.kind}`);
}

seed().catch(err => {
  console.error('❌ Seed failed');
  console.error(err);
});
