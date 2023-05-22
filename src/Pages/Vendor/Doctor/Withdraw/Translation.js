let initialTranslation = {
    "ar": {
        placeholder: 'البحث بالإسم  أو البريد الإلكتروني أو الهاتف .....',

        TableHeader: [
            "رقم حساب",
            "سحب المبلغ",
            "إسم الحساب ",
            "اسم البنك  ",
            " رقم الحساب بصيغة IBAN ",
            "حالة   ",
            'تاريخ السحب',
            "الإجراء",

        ],

        nav: [
            { navList1: 'الاطباء' },
            { navList2: 'طلبات سحب الطبيب' },
        ],

        FilterStatus: [ 
            { value: "PROCESSED", text: "تمت المعالجة " },
            { value: "REJECTED", text: " مرفوض" }, 
        ],
        toast: { 
            update: "تم التحديث بنجاح",
            delete: "تم حذف المستخدم",  
        },
        ActionsNamebtn:'الإجراءات'

    },
    "en": {
        placeholder: 'Search by client name or email or phone.....',

        TableHeader: [
            "Acc. Num",
            "Withdraw Amount",
            "Acc. Name ",
            "Bank Name  ",
            " IBAN ",
            "Status   ",
            ' Date',
            ' File',
            "Action",

        ],
        nav: [
            { navList1: 'Doctors' },
            { navList2: 'Doctor Withdraw Requests' },
        ],

        FilterStatus: [ 
            { value: "PROCESSED", text: "Processed" },
            { value: "REJECTED", text: " Rejected" }, 
        ],

        toast: {
            update: "Updated Successfully",
            delete: "user has been deleted ", 

        },
        ActionsNamebtn:'Actions'
    }
}

export default initialTranslation