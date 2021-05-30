export class admin{
    constructor(
        public name:String,
        public email:String,
        public password:String,
        public role:String
    ){}
    
}
export class crop{
    constructor(
        public crop_name:String,
       public crop_type:String,
        public crop_quantity:Number,
        public location:{

        },
        public crop_img_url: String,
        public uploaded_by:String,
        public role:String
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
        public description:String,
        public bank_details:bank,
        public Role:String){}
}

export class dealer{
    constructor( 
        public name:String,
        public email:String,
        public password:String,
        public subscribed_crops:{
            crop_name:String,
            crop_type:String
        },
        public bank_details:bank,
        public Role:String){}
 }