
namespace sap.brh.db;


using {
  cuid,
  managed
} from '@sap/cds/common';

type CommonName : String(120);
type CommonAge : Integer default 118;
type CommonSex : Integer default 203;

aspect softDeletable:{
  Deleted : Boolean default false;
}

aspect People {
  Name : CommonName;
  Age  : CommonAge;
  Weight: Decimal;
  Sex : CommonSex;
}

entity EarthPeople : cuid, People, softDeletable{
  Address : String(500);
}

entity MoonPeople : cuid, People {

}