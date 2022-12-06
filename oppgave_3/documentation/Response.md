## Status/Response
### [Go back](../README.md)
---
## [/api/week](../pages/api/week/%5B...id%5D.ts)
> GET

- Response 200 - returns status 200 and data
- Response 500 - returns status 500 and message as 'internal server error'

> PUT

- Response 200 - returns status 200 and data
- Response 400 - returns status 400 and message as 'Id missing'
- Response 500 - returns status 500 and message as 'internal server error'

## [/api/employee](../pages/api/employee/%5Bid%5D.ts)
> GET

- Response 200 - returns status 200 and employee as data
- Response 400 - returns status 400 and message as 'Id missing'
- Response 404 - returns status 404 and message as 'Employee not found'
- Response 500 - returns status 500 and message as 'internal server error'

> POST

- Response 405 - returns status 405 and message as 'Method not allowed' 

> PUT

- Response 200 - returns status 200 and employee as data
- Response 400 - returns status 400 and message as 'Id missing'
- Response 500 - returns status 500 and message as 'internal server error'

> DELETE

- Response 405 - returns status 405 and message as 'Method not allowed' 

## [/api/span](../pages/api/span/%5B...id%5D.ts)
> GET

- Response 200 - returns status 200 and employee as data
- Response 400 - returns status 400 and message as 'Id missing'
- Response 500 - returns status 500 and message as 'internal server error'


## [/api/create](../pages/api/create/employee.ts)
> GET

- Response 200 - returns status 200 and employee
- Response 400 - returns status 400 and message as 'Error creating employee'
- Response 405 - returns status 405 and message as 'Method not allowed' 
- Response 500 - returns status 500 and message as 'internal server error'

## [/api/search](../pages/api/search/%5Bname%5D.tsx)

> GET

- Response 200 - returns status 200 and employee
- Response 204 - returns status 204 and message as 'Fant ingen ansatte med dette navnet'
- Response 500 - returns status 500 and message as 'internal server error'

## [/api/settings](../pages/api/settings)
## Settings
> GET

- Response 200 - returns status 200 and data as settings

> POST

- Response 200 - returns status 200 and data as settings
- Response 401 - returns status 401 and message as 'Not allowed'

## Vacations
> GET

- Response 200 - returns status 200 and data as settings.vactions
- Response 401 - returns status 401 and message as 'Not allowed'

## Yearsize
> GET

- Response 200 - returns status 200 and data as settings.yearsize
- Response 401 - returns status 401 and message as 'Not allowed'

## [/api/allEmployees](../pages/api/allEmployees.ts)
> GET

- Response 200 - returns status 200 and data as data2
- Response 400 - returns status 400 and message as 'Bad request'
- Response 500 - returns status 500 and message as 'Internal server error'

## [/api/demo](../pages/api/demo.ts)
> GET

- Response 200 - returns status 200 and message as 'Success'
- Response 405 - returns status 400 and message as 'Method not allowed'
- Response 500 - returns status 500 and message as 'Internal server error'


## [/api/algo](../pages/api/algo.ts)
> GET

- Response 200 - returns status 200 and message as 'Success'
- Response 405 - returns status 400 and message as 'Method not allowed'
- Response 500 - returns status 500 and error as error?.message

