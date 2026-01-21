sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"my/employee/project1/test/integration/pages/EmployeesList",
	"my/employee/project1/test/integration/pages/EmployeesObjectPage"
], function (JourneyRunner, EmployeesList, EmployeesObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('my/employee/project1') + '/test/flp.html#app-preview',
        pages: {
			onTheEmployeesList: EmployeesList,
			onTheEmployeesObjectPage: EmployeesObjectPage
        },
        async: true
    });

    return runner;
});

