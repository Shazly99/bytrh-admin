let initialTranslation = {
    "ar": {
        placeholder: 'البحث عن طريق اسم المركز الطبي أو الهاتف.....', 
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "PENDING", text: " قيد الانتظار  " },
            { value: "ACTIVE", text: "   قبول  " },
            { value: "REJECTED  ", text: "مرفوض" }, 
        ],
        Filtertype: [
            { value: "All", text: "جميع انواع المنتجات" },
            { value: "CENTER", text: " مركز  " },
            { value: "CLINIC", text: "   عيادة  " }, 
        ],
        TableHeader: [
            "معلومات الطبيب ",
            "طلب المستخدم ",
            "حالة طبيب المركز الطبي",  
            "الإجراء"
         ], 
 
        filter:{
            Country:'حدد الدولة',
            allCountry:'بلدان',
            city:'اختر مدينة',
            allCity:'مدن',            
            area:'حدد المنطقة',
            allarea:'المناطق',
            Product:'نوع المنتج',
            Products:'    حدد نوع المنتج    ',
            status:'حدد الحالة',
            allStatus:'كل الحالة',
            SubCategory:'حدد الفئة الفرعية',
            allSubCategory:'فئة الحيوانات'
        }  ,
        Actions: { action: "الإجراءات",currency:"ريال سعودي "},

    },
    "en": {
        placeholder:   'Search by medical center name or phone.....', 
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "PENDING", text: " Pending  " },
            { value: "ACTIVE", text: "   Accept  " },
            { value: "REJECTED", text: " Rejected  " }, 
        ],
        Filtertype: [
            { value: "All", text: "All" },
            { value: "CENTER", text: " Center  " },
            { value: "CLINIC", text: "   Clinic  " }, 
        ],
        TableHeader: [ 
            "Doctor Info ",
            "Request User ",
            "Medical Center Doctor Status ",  
         'Action'
         ],  
  
        filter:{
            Country:'Select Country',
            allCountry:'Countries',
            city:'Select City',
            allCity:'Cities',            
            area:'Select Area',
            allarea:'Areas',
            Product:'Product Type',
            Products:'Animals Product Type',
            status:'Select Status',
            allStatus:'All Status',
            SubCategory:'Select SubCategory',
            allSubCategory:'Animals SubCategory'
        },
        Actions: { action: "Actions",currency:"SAR"},

    }
}

export default initialTranslation