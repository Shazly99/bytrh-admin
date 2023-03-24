let initialTranslate = {
    "ar": {
        placeholder: 'البحث بالاسم أو البريد الإلكتروني أو الهاتف .....',
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "ACTIVE", text: "نشط" },
            { value: "INACTIVE", text: "غير نشط" },
            { value: "BLOCKED", text: "محظور" },
        ],
        TableHeader: [
            "اسم المستخدم",
            "دولة",
            "تسجيل الدخول عن طريق" ,
            "توازن",
            "حالة",
            "تاريخ التسجيل",
            "الإجراء"
        ],
        Actions:[
            {name:"الإجراءات"},
            {name:"إعادة ضبط كلمة المرور"},
            {name:"ضبط الرصيد", titleModel:"ضبط الرصيد لـ",btn1:"  ضبط الرصيد",btn2:"إلغاء"},
            {name:"حذف", titleModel:"حذف العميل",btn1:" إحذف الان",btn2:"إلغاء"},
        ],
    },
    "en": {
        placeholder: 'Search by name or email or phone.....',
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "ACTIVE", text: "Active" },
            { value: "INACTIVE", text: " InActive  " },
            { value: "BLOCKED", text: "Blocked" },
        ],
        TableHeader: [
            "User Name",
            "Country",
            "Login by",
            "Balance",
            "Status",
            "Register Date",
            "Action"
        ],
        Actions:[
            {name:"Actions"},
            {name:"Reset password"},
            {name:"Set Balance", titleModel:"Set the balance for",btn1:"Set Balance",btn2:"Cancel"},
            {name:"Deleted", titleModel:"Delete Client",btn1:"Delete Now",btn2:"Cancel"},
        ],
        
    }
}

export default initialTranslate