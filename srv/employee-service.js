const cds = require('@sap/cds')

module.exports = cds.service.impl(function () {

  const { Employees } = this.entities
  const { SELECT } = cds.ql   // ✅ IMPORTANT

  // -------------------------------
  // CREATE validation
  // -------------------------------
  this.before('CREATE', Employees, req => {
    const { firstName, lastName } = req.data

    if (!firstName || !lastName) {
      req.error(400, 'First name and Last name are mandatory')
    }

    // ✅ Auto-generate name
    req.data.name = `${firstName} ${lastName}`

    req.data.createdAt = new Date()
  })

  // -------------------------------
  // READ (default behavior, optional)
  // -------------------------------
  this.on('READ', Employees, async req => {
    return cds.tx(req).run(req.query)
  })

  // -------------------------------
  // UPDATE / PATCH validation
  // -------------------------------
  this.before(['UPDATE', 'PATCH'], Employees, req => {
    if (req.data.salary !== undefined && req.data.salary < 0) {
      req.error(400, 'Salary cannot be negative')
    }
  })

  // -------------------------------
  // DELETE protection
  // -------------------------------
  this.before('DELETE', Employees, async req => {
    const employee = await cds.tx(req).run(
      SELECT.one.from(Employees).where({ ID: req.data.ID })
    )

    if (employee?.role === 'Manager') {
      req.error(403, 'Managers cannot be deleted')
    }
  })

})
