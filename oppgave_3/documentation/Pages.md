## Pages
### [Go back](../README.md)
---
### [Hjem](../pages/index.tsx)
- API endpoints: /api/settings/yearsize & /api/settings/vacations

Here you choose a week to see all the days in that week.
### [Week](../pages/week/[index].tsx)
- API endpoints: /api/week/[index]

Shows the page for the given week.
### [Søk](../pages/search.tsx)
- API endpoints: /api/search/[name]

Here you can search for an employee, the search for redirect you a page with that employee/s.

### [Registrer](../pages/create.tsx)
- API endpoints: /api/create/employee

Here you can register a employee, you can apply the different rules for both day and week. And the algorithm will rerun after an employee is added.

### [Periode Søk](../pages/span.tsx)
- API endpoints: /api/span/[..id]

You can choose to see between two given weeks. Forexample: week 1 - 7 etc.
### [Oppdater Uke](../pages/update.tsx)
- API endpoints: /api/week/[index]

Update week - you choose which week you want to update and given day, that day will be and employee will be added to the overwrite database and the original - employee will be displayed in red text in the update week page.
### [Oppdater ansatt](../pages/updateEmployee.tsx)
- API endpoints: /api/employee/[id]

You can change the name of a given employee.
### [Personalliste](../pages/personnellist.tsx)
- API endpoints: /api/allEmployees

Overview page of all employees with name and rules.

### [Instillinger](../pages/settings.tsx)
- API endpoints: /api/settings/settings

Page that allows you to change the settings you want the algorithm run.