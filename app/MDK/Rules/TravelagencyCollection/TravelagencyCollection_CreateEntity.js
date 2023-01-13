export default function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDK/Services/service1.service').isDraftEnabled('TravelagencyCollection')) {
        return clientAPI.executeAction({
            'Name': '/MDK/Actions/TravelagencyCollection/TravelagencyCollection_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MDK/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'TravelagencyCollection',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDK/Actions/TravelagencyCollection/TravelagencyCollection_CreateEntity.action');
    }
}