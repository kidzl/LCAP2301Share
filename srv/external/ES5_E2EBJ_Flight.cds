/* checksum : f5b45def4be2eabb14c9c05a1f6a1997 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service ES5_E2EBJ_Flight {};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.semantics : 'subscriptions'
entity ES5_E2EBJ_Flight.SubscriptionCollection {
  @sap.label : 'Sub. ID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.filterable : 'false'
  key ID : String(32) not null;
  @m.FC_TargetPath : 'SyndicationAuthorName'
  @m.FC_KeepInContent : 'false'
  @sap.label : 'User Name'
  @sap.creatable : 'false'
  @sap.filterable : 'false'
  user : String(12) null;
  @odata.Type : 'Edm.DateTime'
  @m.FC_TargetPath : 'SyndicationUpdated'
  @m.FC_KeepInContent : 'false'
  @sap.label : 'Time Stamp'
  @sap.creatable : 'false'
  @sap.filterable : 'false'
  updated : DateTime null;
  @m.FC_TargetPath : 'SyndicationTitle'
  @m.FC_KeepInContent : 'false'
  @sap.label : 'Title'
  @sap.filterable : 'false'
  title : String(255) null;
  @sap.label : 'Delivery Address'
  @sap.filterable : 'false'
  deliveryAddress : LargeString null;
  @sap.label : 'Persist Notification'
  @sap.filterable : 'false'
  persistNotifications : Boolean null;
  @sap.label : 'Collection'
  @sap.filterable : 'false'
  collection : String(40) null;
  @sap.label : 'Filter'
  @sap.filterable : 'false'
  filter : LargeString null;
  @sap.label : 'Select'
  @sap.filterable : 'false'
  ![select] : String(255) null;
  @sap.label : 'Change Type'
  changeType : String(30) null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
@sap.semantics : 'notifications'
entity ES5_E2EBJ_Flight.NotificationCollection {
  @sap.label : 'Notification ID'
  key ID : String(32) not null;
  @sap.label : 'Collection'
  collection : String(40) null;
  @m.FC_TargetPath : 'SyndicationTitle'
  @m.FC_KeepInContent : 'false'
  @sap.label : 'Notif. Text'
  title : LargeString null;
  @odata.Type : 'Edm.DateTime'
  @m.FC_TargetPath : 'SyndicationUpdated'
  @m.FC_KeepInContent : 'false'
  @sap.label : 'Time Stamp'
  updated : DateTime null;
  @sap.label : 'Change Type'
  changeType : String(30) null;
  @sap.label : 'No. of Entries'
  entriesOfInterest : Integer null;
  @sap.label : 'Recipient'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  recipient : String(112) null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
entity ES5_E2EBJ_Flight.FlightCollection {
  @sap.label : 'Airline'
  key carrid : String(3) not null;
  @sap.label : 'Flight Number'
  key connid : String(4) not null;
  @odata.Type : 'Edm.DateTime'
  @sap.label : 'Date'
  key fldate : DateTime not null;
  flightDetails : ES5_E2EBJ_Flight.FlightDetails not null;
  @sap.unit : 'CURRENCY'
  @sap.label : 'Airfare'
  PRICE : Decimal(15, 2) null;
  @sap.label : 'Airline Currency'
  @sap.sortable : 'false'
  @sap.semantics : 'currency-code'
  CURRENCY : String(5) null;
  @sap.label : 'Type of the plane'
  PLANETYPE : String(10) null;
  @sap.label : 'Max. capacity econ.'
  SEATSMAX : Integer null;
  @sap.label : 'Occupied econ.'
  SEATSOCC : Integer null;
  @sap.label : 'Total'
  PAYMENTSUM : Decimal(17, 2) null;
  @sap.label : 'Max. capacity bus.'
  SEATSMAX_B : Integer null;
  @sap.label : 'Occupied bus.'
  SEATSOCC_B : Integer null;
  @sap.label : 'Max. capacity 1st'
  SEATSMAX_F : Integer null;
  @sap.label : 'Occupied 1st'
  SEATSOCC_F : Integer null;
  @cds.ambiguous : 'missing on condition?'
  flightbooking : Association to ES5_E2EBJ_Flight.BookingCollection on flightbooking.fldate = fldate and flightbooking.connid = connid and flightbooking.carrid = carrid;
  @cds.ambiguous : 'missing on condition?'
  flightBookings : Association to many ES5_E2EBJ_Flight.BookingCollection on flightBookings.fldate = fldate and flightBookings.connid = connid and flightBookings.carrid = carrid;
  @cds.ambiguous : 'missing on condition?'
  FlightCarrier : Association to ES5_E2EBJ_Flight.CarrierCollection {  };
  @cds.ambiguous : 'missing on condition?'
  FlightCarrier_FW : Association to ES5_E2EBJ_Flight.CarrierCollection {  };
} actions {
  function CheckFlightAvailability(
    @sap.value.list : 'standard'
    airlineid : String(3) null,
    connectionid : String(4) null,
    @odata.Type : 'Edm.DateTime'
    flightdate : DateTime null
  ) returns ES5_E2EBJ_Flight.FlightAvailability null;
  function GetFlightDetails(
    airlineid : String(3) null,
    connectionid : String(4) null
  ) returns ES5_E2EBJ_Flight.FlightDetails null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
entity ES5_E2EBJ_Flight.FlightCollection_DQ {
  @sap.label : 'Airline'
  key carrid : String(3) not null;
  @sap.label : 'Flight Number'
  key connid : String(4) not null;
  @odata.Type : 'Edm.DateTime'
  @sap.label : 'Date'
  key fldate : DateTime not null;
  @sap.unit : 'CURRENCY'
  @sap.label : 'Airfare'
  PRICE : Decimal(15, 2) null;
  @sap.label : 'Airline Currency'
  @sap.sortable : 'false'
  @sap.semantics : 'currency-code'
  CURRENCY : String(5) null;
  @sap.label : 'Type of the plane'
  PLANETYPE : String(10) null;
  @sap.label : 'Max. capacity econ.'
  SEATSMAX : Integer null;
  @sap.label : 'Occupied econ.'
  SEATSOCC : Integer null;
  @sap.label : 'Total'
  PAYMENTSUM : Decimal(17, 2) null;
  @sap.label : 'Max. capacity bus.'
  SEATSMAX_B : Integer null;
  @sap.label : 'Occupied bus.'
  SEATSOCC_B : Integer null;
  @sap.label : 'Max. capacity 1st'
  SEATSMAX_F : Integer null;
  @sap.label : 'Occupied 1st'
  SEATSOCC_F : Integer null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.pageable : 'false'
@sap.content.version : '1'
@sap.label : 'Flight Booking'
@sap.semantics : 'FLIGHT_BOOKING'
entity ES5_E2EBJ_Flight.BookingCollection {
  @sap.label : 'Airline'
  key carrid : String(3) not null;
  @sap.label : 'Flight Number'
  key connid : String(4) not null;
  @odata.Type : 'Edm.DateTime'
  @sap.label : 'Date'
  key fldate : DateTime not null;
  @sap.label : 'Booking number'
  key bookid : String(8) not null;
  @sap.label : 'Customer Number'
  CUSTOMID : String(8) null;
  @sap.label : 'B/P customer'
  CUSTTYPE : String(1) null;
  @sap.label : 'Smoker'
  @sap.value.list : 'standard'
  SMOKER : String(1) null;
  @sap.label : 'Unit of measure'
  @sap.semantics : 'unit-of-measure'
  WUNIT : String(3) null;
  @sap.unit : 'WUNIT'
  @sap.label : 'Luggage Weight'
  @sap.value.list : 'fixed-values'
  LUGGWEIGHT : String(9) null;
  @sap.label : 'Invoice pty.'
  INVOICE : String(1) null;
  @sap.label : 'Class'
  CLASS : String(1) null;
  @sap.unit : 'FORCURKEY'
  @sap.label : 'Amount'
  FORCURAM : Decimal(15, 14) null;
  @sap.label : 'Paymnt currency'
  @sap.semantics : 'currency-code'
  FORCURKEY : String(5) null;
  @sap.unit : 'LOCCURKEY'
  @sap.label : 'Amount'
  LOCCURAM : Decimal(15, 14) null;
  @sap.label : 'Airline Currency'
  @sap.semantics : 'currency-code'
  LOCCURKEY : String(5) null;
  @odata.Type : 'Edm.DateTime'
  @sap.label : 'Booking date'
  @sap.updatable : 'false'
  ORDER_DATE : DateTime null;
  @sap.label : 'Sales office'
  @sap.updatable : 'false'
  COUNTER : String(8) null;
  @sap.label : 'Agency No.'
  @sap.updatable : 'false'
  AGENCYNUM : String(8) null;
  @sap.label : 'Cancelation flag'
  @sap.updatable : 'false'
  CANCELLED : String(1) null;
  @sap.label : 'Reserved'
  @sap.updatable : 'false'
  RESERVED : String(1) null;
  @sap.label : 'Passenger Name'
  PASSNAME : String(25) null;
  @sap.label : 'Title'
  PASSFORM : String(15) null;
  @odata.Type : 'Edm.DateTime'
  @sap.label : 'DOB of Passeng.'
  PASSBIRTH : DateTime null;
  @sap.label : 'Flight bookings'
  @cds.ambiguous : 'missing on condition?'
  bookedFlight : Association to ES5_E2EBJ_Flight.FlightCollection on bookedFlight.fldate = fldate and bookedFlight.connid = connid and bookedFlight.carrid = carrid;
  @sap.label : 'Type of the plane'
  @cds.ambiguous : 'missing on condition?'
  bookedCarrier : Association to ES5_E2EBJ_Flight.CarrierCollection on bookedCarrier.carrid = carrid;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
entity ES5_E2EBJ_Flight.CarrierCollection {
  @sap.label : 'Airline'
  key carrid : String(3) not null;
  @sap.label : 'Airline'
  CARRNAME : String(20) null;
  @sap.label : 'Airline Currency'
  @sap.semantics : 'currency-code'
  CURRCODE : String(5) null;
  @sap.label : 'URL'
  @sap.semantics : 'url'
  URL : String(255) null;
  @sap.label : 'MIME Type'
  @sap.filterable : 'false'
  mimeType : String(128) null;
  @Core.MediaType : 'application/octet-stream'
  blob : LargeBinary null;
  @cds.ambiguous : 'missing on condition?'
  carrierFlights : Association to many ES5_E2EBJ_Flight.FlightCollection {  };
  @cds.ambiguous : 'missing on condition?'
  carrierFlights_FW : Association to many ES5_E2EBJ_Flight.FlightCollection {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.label : 'Travel Agencies'
@sap.searchable : 'true'
@sap.content.version : '1'
entity ES5_E2EBJ_Flight.TravelagencyCollection {
  @sap.label : 'Agency No.'
  key agencynum : String(8) not null;
  @sap.label : 'Travel agency name'
  NAME : String(25) null;
  @sap.label : 'Street'
  STREET : String(30) null;
  @sap.label : 'PO Box'
  POSTBOX : String(10) null;
  @sap.label : 'Postal Code'
  POSTCODE : String(10) null;
  @sap.label : 'City'
  CITY : String(25) null;
  @sap.label : 'Country'
  COUNTRY : String(3) null;
  @sap.label : 'Region'
  REGION : String(3) null;
  @sap.label : 'Tel.'
  TELEPHONE : String(30) null;
  @sap.label : 'Travel agency URL'
  URL : String(255) null;
  @sap.label : 'Language'
  LANGU : String(2) null;
  @sap.label : 'Trav.Agency.Curr'
  @sap.semantics : 'currency-code'
  CURRENCY : String(5) null;
  @sap.label : 'MIME Type'
  mimeType : String(128) null;
} actions {
  function GetAgencyDetails() returns ES5_E2EBJ_Flight.TravelagencyCollection null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.searchable : 'true'
@sap.content.version : '1'
entity ES5_E2EBJ_Flight.TravelAgencies {
  @sap.label : 'Agency No.'
  key agencynum : String(8) not null;
  @sap.label : 'Travel agency name'
  NAME : String(25) null;
  @sap.label : 'Street'
  STREET : String(30) null;
  @sap.label : 'PO Box'
  POSTBOX : String(10) null;
  @sap.label : 'Postal Code'
  POSTCODE : String(10) null;
  @sap.label : 'City'
  CITY : String(25) null;
  @sap.label : 'Country'
  COUNTRY : String(3) null;
  @sap.label : 'Region'
  REGION : String(3) null;
  @sap.label : 'Tel.'
  TELEPHONE : String(30) null;
  @sap.label : 'Travel agency URL'
  URL : String(255) null;
  @sap.label : 'Language'
  LANGU : String(2) null;
  @sap.label : 'Trav.Agency.Curr'
  @sap.semantics : 'currency-code'
  CURRENCY : String(5) null;
  @sap.label : 'MIME Type'
  mimeType : String(128) null;
} actions {
  function GetAgencyDetails() returns ES5_E2EBJ_Flight.TravelagencyCollection null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.searchable : 'true'
@sap.content.version : '1'
entity ES5_E2EBJ_Flight.TravelAgencies_DQ {
  @sap.label : 'Agency No.'
  key agencynum : String(8) not null;
  @sap.label : 'Travel agency name'
  NAME : String(25) null;
  @sap.label : 'Street'
  STREET : String(30) null;
  @sap.label : 'PO Box'
  POSTBOX : String(10) null;
  @sap.label : 'Postal Code'
  POSTCODE : String(10) null;
  @sap.label : 'City'
  CITY : String(25) null;
  @sap.label : 'Country'
  COUNTRY : String(3) null;
  @sap.label : 'Region'
  REGION : String(3) null;
  @sap.label : 'Tel.'
  TELEPHONE : String(30) null;
  @sap.label : 'Travel agency URL'
  URL : String(255) null;
  @sap.label : 'Language'
  LANGU : String(2) null;
  @sap.label : 'Trav.Agency.Curr'
  @sap.semantics : 'currency-code'
  CURRENCY : String(5) null;
  @sap.label : 'MIME Type'
  mimeType : String(128) null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.value.list : 'true'
entity ES5_E2EBJ_Flight.VL_BOOK_SMOKER_ES {
  @sap.value.list : 'standard'
  key ID : LargeString not null;
  NAME : LargeString null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.value.list : 'true'
entity ES5_E2EBJ_Flight.VL_VL_BOOK_SMOKER_ID_ES {
  key ID : LargeString not null;
  NAME : LargeString null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.value.list : 'true'
entity ES5_E2EBJ_Flight.VL_MY_CURR_ES {
  key CURR_ID : LargeString not null;
  CURR_NAME : LargeString null;
  @cds.ambiguous : 'missing on condition?'
  NavProp1 : Association to ES5_E2EBJ_Flight.BookingCollection {  };
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.value.list : 'true'
entity ES5_E2EBJ_Flight.VL_BOOK_ADDRESS_COUNTRY_DEEP_ES {
  key CountryID : LargeString not null;
  Country : LargeString null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.value.list : 'true'
entity ES5_E2EBJ_Flight.VL_CT_FLIGHT_DETAILS_AIRPORT_TO_ES {
  key AirportID : LargeString not null;
  AirportName : LargeString null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.content.version : '1'
@sap.value.list : 'true'
entity ES5_E2EBJ_Flight.VL_ACTION_PARAMETER_AIRLINE_ID_ES {
  key AirlineID : LargeString not null;
  AirlineName : LargeString null;
};

@cds.external : true
type ES5_E2EBJ_Flight.FlightDetails {
  @sap.label : 'Country'
  countryFrom : String(3) null;
  @sap.label : 'Depart.city'
  cityFrom : String(20) null;
  @sap.label : 'Dep. airport'
  airportFrom : String(3) null;
  @sap.label : 'Country'
  countryTo : String(3) null;
  @sap.label : 'Arrival city'
  cityTo : String(20) null;
  @sap.label : 'Dest. airport'
  airportTo : String(3) null;
  @sap.label : 'Flight time'
  flightTime : Integer null;
  @sap.label : 'Departure'
  departureTime : Time null;
  @sap.label : 'Arrival Time'
  arrivalTime : Time null;
  @sap.unit : 'distanceUnit'
  @sap.label : 'Distance'
  distance : Decimal(9, 4) null;
  @sap.label : 'Distance in'
  @sap.semantics : 'unit-of-measure'
  distanceUnit : String(3) null;
  @sap.label : 'Charter'
  flightType : String(1) null;
  @odata.Type : 'Edm.Byte'
  @sap.label : 'n day(s) later'
  period : Integer null;
};

@cds.external : true
type ES5_E2EBJ_Flight.FlightAvailability {
  @sap.label : 'Max. capacity econ.'
  ECONOMAX : Integer null;
  @sap.label : 'Free seats'
  ECONOFREE : Integer null;
  @sap.label : 'Max. capacity bus.'
  BUSINMAX : Integer null;
  @sap.label : 'Free seats'
  BUSINFREE : Integer null;
  @sap.label : 'Max. capacity 1st'
  FIRSTMAX : Integer null;
  @sap.label : 'Free seats'
  FIRSTFREE : Integer null;
};

@cds.external : true
type ES5_E2EBJ_Flight.FlightAvailability2 : ES5_E2EBJ_Flight.FlightAvailability { };

@cds.external : true
function ES5_E2EBJ_Flight.GetAvailableFlights(
  @odata.Type : 'Edm.DateTime'
  fromdate : DateTime null,
  @odata.Type : 'Edm.DateTime'
  todate : DateTime null,
  cityfrom : String(20) null,
  cityto : String(20) null
) returns many ES5_E2EBJ_Flight.FlightCollection null;

