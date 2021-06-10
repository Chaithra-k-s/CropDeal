export class admin{
    constructor(
        public name:String,
        public email:String,
        public password:String,
        public contact:Number,
        public gender:String,
        public role:String
    ){}  
}
class location{
    constructor(
        public Addressline1:String,
        public Addressline2:String,
        public localArea:String,
        public State:String,
        public Country:String,
        public pincode:Number
    ){}
}

class sub_crop{
    constructor( 
        public crop_name:String,
        public crop_type:String){}
}

export class crop{
    constructor(
        public crop_name:String,
        public crop_type:String,
        public crop_quantity:Number,
        public crop_price:Number,
        public location:location,
        public crop_img: String,
        public uploaded_by:String,
        public available:boolean,
        public soldto:String
    ){}
}

class bank{
    constructor(
        public account_number : Number,
        public bank_name : String,
        public ifsc_code : String
    ){} 
}
export class farmer{
   constructor( 
        public name:String,
        public email:String,
        public password:String,
        public contact:Number,
        public gender:String,
        public cropsgrown:Array<String>,
        public bank_details:bank,
        public Role:String
        ){}
}

export class dealer{
    constructor( 
        public name:String,
        public email:String,
        public password:String,
        public contact:Number,
        public gender:String,
        public subscribed_crops:sub_crop,
        public bank_details:bank,
        public Role:String
        ){}
 }