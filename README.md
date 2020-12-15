# Healthcare Information And Appointments Portal

- This project aims to connect the healthcare service providers to the patients
- Patients will be able to make appointments from home hassle-free saving the work, money and time before seeing a doctor. No more long queues:)

# Key Features:
This project facilitates patients to search for healthcare services based on three different categories, namely, doctors, departments and hospitals. Patients can also book appointments with doctors, wherein, they have to provide some basic details,viz, name, email,etc. and after verification through otp sent to the email provided, appointment booking will be successfull.

All data of different healthcare organisations are provided by the organisations themselves. All healthcare organisations will have to register. Registration with the portal provides an single organisation account where it can provide all schedules. The schedules can be edited and deleted by the hospital/clinic via same account. Login authentication is necessary to access account.


This project is made with HTML, CSS, Javascript, NodeJS and MySQL.

# How To Use:

This project needs the following installations
- NodeJS :https://nodejs.org/en/
- MySQL: https://www.mysql.com/downloads/
- Git: https://git-scm.com/downloads
After all above are installed, the following commands need to be used from terminal/command line:
`//Clone this repository
$ git clone https://github.com/G12project/healthcaresystem
//Go into the repository
$ cd healthcaresystem
//Install dependencies
$ npm install`
Note: `node` can be used from the command prompt in Windows.

Once the above commands are executed, the following commands must be run once in the given order to setup the database:

`//Go to required directory
$ cd healthcaresystem/mysql
//Setup DB
$ node cdb.js
$ node ctbhospital.js
$ node ctbdept.js
$ node ctbdoc.js
$ node ctbschd.js
$ node ctbappnts.js
$ node ctbverification.js
$ node cevnts.js`

Note: All names and passwords need to be set accordingly the the files.
