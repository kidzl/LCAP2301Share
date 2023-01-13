using { Marketing_Contact } from './external/Marketing_Contact.cds';

using { ES5_E2EBJ_Flight } from './external/ES5_E2EBJ_Flight.cds';

using { ExternalCUD as my } from '../db/schema';

@path : 'service/ExternalCUD'
service ExternalCUDService
{
    entity TravelagencyCollection as
        projection on ES5_E2EBJ_Flight.TravelagencyCollection;

    entity Contacts as
        projection on Marketing_Contact.Contacts;
}

annotate ExternalCUDService with @requires :
[
    'authenticated-user'
];
