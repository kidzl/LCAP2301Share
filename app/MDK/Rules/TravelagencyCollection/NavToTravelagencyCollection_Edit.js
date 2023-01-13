export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MDK/Services/service1.service').isDraftEnabled('TravelagencyCollection')) {
        return clientAPI.executeAction({
            'Name': '/MDK/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'TravelagencyCollection'
                },
                'OnSuccess': '/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Edit.action');
    }
}