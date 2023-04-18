let initialTranslate = {
    "ar": {
        placeholder: 'البحث بالإسم  أو البريد الإلكتروني أو الهاتف .....',
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "ACTIVE", text: "نشط" },
            { value: "INACTIVE", text: "غير نشط" },
            { value: "BLOCKED", text: "محظور" },
        ],
        loginBy:[
            { value: "All", text: "جميع الحسابات" }, 
            {value:'MANUAL',text:'يدوي'},
            {value:'FACEBOOK',text:'فيسبوك'},
            {value:'TWITTER',text:'تويتر'},
            {value:'GOOGLE',text:'جوجل'},
            {value:'APPLE',text:'أبل'},
        ],
        TableHeader: [
            "إسم  المستخدم",
            "دولة",
            "تسجيل الدخول عن طريق",
            "توازن",
            "حالة",
            "تاريخ التسجيل",
            "الإجراء"
        ],
        Actions: [
            { name: "الإجراءات" },
            { name: "إعادة ضبط كلمة المرور" },
            { name: "ضبط الرصيد", titleModel: "ضبط الرصيد لـ", btn1: "  ضبط الرصيد", btn2: "رجــوع" },
            { name: "حذف", titleModel: "حذف العميل", btn1: " إحذف الان", btn2: "رجــوع" },
        ],
        toast: {
            update: "تم التحديث بنجاح",
            wallet: "تم تحديث المحفظة   ",
            reset: "تم إعادة تعيين كلمة المرور بنجاح ",
            delete: "تم حذف المستخدم"
        },
        excelSheet:' تصدير إلى ملف إكسل',
        dataExport:'بيانات العملاء',
        currency:'ريال سعودي',
        ExcelHeader: [
            "اسم العميل",
            "هاتف العميل", 
            "البريد الإلكتروني للعميل", 
            "تسجيل الدخول عن طريق",
            "رصيد العميل ",
            "نقاط العميل الحالية ", 
            "اسم الدولة",
            'حالة العميل',
            '  تاريخ التسجيل'
        ],
        filter:{
            Country:'حدد الدولة',
            allCountry:'بلدان',
            city:' حدد منطقة  ',
            allCity:'المناطق',            
            area:'حدد مدينه',
            allarea:'مدن',
            Product:'نوع المنتج',
            Products:'    حدد نوع المنتج    ',
            status:'حدد الحالة',
            loginBy:'تسجيل الدخول بواسطة',
            allStatus:'كل الحالة',
            SubCategory:'حدد الفئة الفرعية',
            allSubCategory:'فئة الحيوانات'
        }  ,

    },
    "en": {
        placeholder: 'Search by name or email or phone.....',
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "ACTIVE", text: "Active" },
            { value: "INACTIVE", text: " InActive  " },
            { value: "BLOCKED", text: "Blocked" },
        ],
        loginBy:[
            { value: "All", text: "All Accounts" }, 
            {value:'MANUAL',text:'Manual'},
            {value:'FACEBOOK',text:'Facebook'},
            {value:'TWITTER',text:'Twitter'},
            {value:'GOOGLE',text:'Google'},
            {value:'APPLE',text:'Apple'},
        ],
        currency:'SAR  ',

        TableHeader: [
            "User Name",
            "Country",
            "Login by",
            "Balance",
            "Status",
            "Register Date",
            "Action"
        ],
        Actions: [
            { name: "Actions" },
            { name: "Reset password" },
            { name: "Set Balance", titleModel: "Set the balance for", btn1: "Set Balance", btn2: "Cancel" },
            { name: "Deleted", titleModel: "Delete Client", btn1: "Delete Now", btn2: "Cancel" },
        ],
        toast: {
            update: "Updated Successfully",
            wallet: "wallet updated ",
            reset: "Password reset successfully ",
            delete: "user has been deleted "
        },
        excelSheet:'Export to excel sheet',
        dataExport:'Clients Data',
        ExcelHeader: [
            "Client name",
            "Client phone", 
            "Client email", 
            "Login by",
            "Client balance ",
            "Client current points ", 
            "Country name",
            'Client Status',
            'Register Date  '
        ],
        filter:{
            Country:'Select Country',
            allCountry:'Countries',
            city:'Select Area',
            allCity:'Areas',            
            area:'Select City',
            allarea:'Cities',
            Product:'Product Type',
            Products:'Animals Product Type',
            status:'Select Status',
            loginBy:' Login By ',
            allStatus:'All Status',
            SubCategory:'Select SubCategory',
            allSubCategory:'Animals SubCategory'
        },
    }
}

export default initialTranslate