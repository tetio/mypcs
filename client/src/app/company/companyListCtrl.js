(function () {
    'use strict';
    angular
        .module('pcsManagement')
        .controller('CompanyListCtrl',
                    ['companyResource',
                        CompanyListCtrl]);

    function CompanyListCtrl(companyResource) {
        var vm = this;

        vm.companies = [
            {
                "_id": "55e7181cc906aaef9d1893bb",
                "last_modification": "2015-09-02T15:39:08.791Z",
                "situation": "A",
                "fax": "(716) 201-1843",
                "phone": "(373) 309-7497",
                "postal_code": "A5V 4S5",
                "country": "Pitcairn Islands",
                "region": "Quebec",
                "city": "Diecipoh",
                "address": "1706 Civu Court",
                "email": "contact@bryanholt.com",
                "web": "www.bryanholt.com",
                "name": "Bryan Holt Ltd.",
                "code": "RI63908",
                "__v": 0,
                "services": [],
                "primary_contact": {
                    "first_name": "Jane",
                    "last_name": "Evans",
                    "mobile": "(772) 711-1211",
                    "email": "jane.evans@bryanholt.com"
                }
            },
            {
                "_id": "55e7181dc906aaef9d1893bc",
                "last_modification": "2015-09-02T15:39:09.321Z",
                "situation": "A",
                "fax": "(922) 865-2537",
                "phone": "(748) 887-4052",
                "postal_code": "C0K 8N7",
                "country": "Barbados",
                "region": "Quebec",
                "city": "Wugrovew",
                "address": "462 Mezsu View",
                "email": "contact@harrymaxwell.com",
                "web": "www.harrymaxwell.com",
                "name": "Harry Maxwell Ltd.",
                "code": "AZ02970",
                "__v": 0,
                "services": [],
                "primary_contact": {
                    "first_name": "Harry",
                    "last_name": "Edwards",
                    "mobile": "(717) 380-8925",
                    "email": "harry.edwards@harrymaxwell.com"
                }
            },
            {
                "_id": "55e7181dc906aaef9d1893bd",
                "last_modification": "2015-09-02T15:39:09.958Z",
                "situation": "A",
                "fax": "(974) 939-9556",
                "phone": "(987) 376-5381",
                "postal_code": "G3Z 6D7",
                "country": "Liechtenstein",
                "region": "Newfoundland and Labrador",
                "city": "Gehomcev",
                "address": "1530 Usves Key",
                "email": "contact@leahperkins.com",
                "web": "www.leahperkins.com",
                "name": "Leah Perkins Ltd.",
                "code": "KS56468",
                "__v": 0,
                "services": [],
                "primary_contact": {
                    "first_name": "Jacob",
                    "last_name": "Ford",
                    "mobile": "(856) 594-5070",
                    "email": "jacob.ford@leahperkins.com"
                }
            },
            {
                "_id": "55e7181ec906aaef9d1893be",
                "last_modification": "2015-09-02T15:39:10.557Z",
                "situation": "A",
                "fax": "(964) 428-8012",
                "phone": "(858) 517-3176",
                "postal_code": "G6R 5W3",
                "country": "Mauritius",
                "region": "New Brunswick",
                "city": "Sokavovam",
                "address": "868 Vajtut Avenue",
                "email": "contact@cliffordcobb.com",
                "web": "www.cliffordcobb.com",
                "name": "Clifford Cobb Ltd.",
                "code": "AZ92966",
                "__v": 0,
                "services": [],
                "primary_contact": {
                    "first_name": "Eleanor",
                    "last_name": "Brady",
                    "mobile": "(735) 977-2190",
                    "email": "eleanor.brady@cliffordcobb.com"
                }
            },
            {
                "_id": "55e7181fc906aaef9d1893bf",
                "last_modification": "2015-09-02T15:39:11.271Z",
                "situation": "A",
                "fax": "(960) 844-5174",
                "phone": "(740) 323-5478",
                "postal_code": "K6M 7Y1",
                "country": "Honduras",
                "region": "British Columbia",
                "city": "Labimo",
                "address": "1506 Zizne Pass",
                "email": "contact@billytyler.com",
                "web": "www.billytyler.com",
                "name": "Billy Tyler Ltd.",
                "code": "ME09989",
                "__v": 0,
                "services": [],
                "primary_contact": {
                    "first_name": "Cecelia",
                    "last_name": "Manning",
                    "mobile": "(886) 923-7226",
                    "email": "cecelia.manning@billytyler.com"
                }
            },
            {
                "_id": "55e73273e1da72b2a51fc594",
                "last_modification": "2015-09-02T17:31:31.227Z",
                "situation": "A",
                "fax": "(382) 814-8680",
                "phone": "(369) 986-2832",
                "postal_code": "C6J 5A1",
                "country": "South Georgia and the South Sandwich Islands",
                "region": "Prince Edward Island",
                "city": "Kunizen",
                "address": "1626 Riga Street",
                "email": "contact@hannahmoody.com",
                "web": "www.hannahmoody.com",
                "name": "Hannah Moody Ltd.",
                "code": "DC17845",
                "__v": 0,
                "services": [],
                "primary_contact": {
                    "first_name": "Erik",
                    "last_name": "Ballard",
                    "mobile": "(589) 880-8268",
                    "email": "erik.ballard@hannahmoody.com"
                }
            },
            {
                "_id": "55e7328fe1da72b2a51fc595",
                "last_modification": "2015-09-02T17:31:59.080Z",
                "situation": "A",
                "fax": "(755) 939-2524",
                "phone": "(460) 369-1844",
                "postal_code": "M3I 3Z7",
                "country": "Albania",
                "region": "Nova Scotia",
                "city": "Jacirik",
                "address": "365 Teduv Extension",
                "email": "contact@lenacole.com",
                "web": "www.lenacole.com",
                "name": "Lena Cole Ltd.",
                "code": "OH03512",
                "__v": 0,
                "services": [],
                "primary_contact": {
                    "first_name": "Ryan",
                    "last_name": "Arnold",
                    "mobile": "(423) 632-7809",
                    "email": "ryan.arnold@lenacole.com"
                }
            },
            {
                "_id": "55e7329fe1da72b2a51fc596",
                "last_modification": "2015-09-04T07:14:06.943Z",
                "situation": "A",
                "fax": "(476) 601-4109",
                "phone": "(927) 721-2897",
                "postal_code": "R7W 7T3",
                "country": "Greenland",
                "region": "New Brunswick",
                "city": "Opeggu",
                "address": "1947 Mopbi River",
                "email": "contact@berthaterry.com",
                "web": "www.berthaterry.com",
                "name": "Bertha Terry Ltd.",
                "code": "MN91450",
                "__v": 0,
                "services": [],
                "primary_contact": {
                    "first_name": "Joseph",
                    "last_name": "McKinney",
                    "mobile": "(362) 376-8944",
                    "email": "joseph.mckinney@berthaterry.com"
                }
            }
        ];

        companyResource.query(function (data) {
            vm.companies = data;
        });

        vm.gridOptions = {
            columnDefs: [{ field: '_id' }, { field: 'name' }, { field: 'code' }, { field: 'situation' }, { field: 'last_modification' }],
            data: vm.companies
        };
    }
}());