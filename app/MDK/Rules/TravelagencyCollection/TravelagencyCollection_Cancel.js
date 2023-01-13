export default function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/MDK/Services/service1.service').isDraftEnabled('TravelagencyCollection')) {
        return clientAPI.executeAction({
            'Name': '/MDK/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'TravelagencyCollection'
                },
                'OnSuccess': '/MDK/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDK/Actions/CloseModalPage_Cancel.action');
    }
}