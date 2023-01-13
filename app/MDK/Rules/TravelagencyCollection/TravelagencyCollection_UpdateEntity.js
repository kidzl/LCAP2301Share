export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDK/Services/service1.service').isDraftEnabled('TravelagencyCollection')) {
        return clientAPI.executeAction({
            'Name': '/MDK/Actions/TravelagencyCollection/TravelagencyCollection_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MDK/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'TravelagencyCollection'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDK/Actions/TravelagencyCollection/TravelagencyCollection_UpdateEntity.action');
    }
}