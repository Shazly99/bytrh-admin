let initialTranslation = {
    "ar": {
        placeholder: {
            client: ' بحث عن طريق العميل .....',
            doc: ' بحث عن طريق الطبيب ....'
        },
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "ONGOING", text: "جاري التنفيذ" },
            { value: "PENDING", text: " قيد الانتظار  " },
            { value: "ENDED", text: " انتهى  " },
            { value: "EXPIRED", text: " منتهي الصلاحية  " },
            { value: "CANCELLED", text: " الغاء  " },
            { value: "NO_RESPONSE", text: "  لا يوجد رد  " },
            { value: "SKIPPED", text: " تم تخطي  " },
            { value: "REJECTED", text: " مرفوض  " },
            { value: "ACCEPTED", text: " قبلت  " },
        ],
        ConsultType:[ 
            { value: "NORMAL", text: "عادية  " },
            { value: "URGENT", text: " عاجلة " },
        ],

        TableHeader: [
            "معلومات العميل  ",
            " معلومات الطبيب  ",
            "نوع الاستشارة  ",
            "  مبلغ الاستشارة  ",
            "  استشر الحالة  ",
            "الإجراء"
        ],
        Actions: { action: "الإجراءات", chat: "محادثة", endChat: 'إنهاء المحادثة' },
        toast: { endChat: "تم إنهاء الدردشة" },
        consultChat: {
            nav1:'قائمة الاستشارات',
            nav2:'استشارة',
            header:'تفاصيل الاستشارة :',
            hello:'مرحباً',
            rout:'مسؤل',
            chatEmpty:'هذه الاستشارة فارغة..',
            clientName: 'إسم العميل :',
            clientPhone: 'هاتف العميل :',
            doctorName: 'إسم الطبيب :',
            doctorPhone: 'هاتف الطبيب :',
            Status: "حاله الاستشارة",
            date: 'تاريخ بدء الاستشارة'
        },
        complain:{
            title:'تفاصيل الشكوى',
            userClient:'العميل :',
            userDr:'دكتور : ',
            btn:'غلق'
        },
        excelSheet: 'تصدير إلى ملف إكسل',
        filename: ' البيانات الاستشارات',
        ComplainBody:'لا يوجد شكوي ',
        currency:'ريال سعودي  ',

        ExcelHeader: [
            "اسم العميل",
            "هاتف العميل",
            "اسم الطبيب  ",
            "هاتف الطبيب ",
            "نوع الاستشارة",
            " مبلغ الاستشارة ",
            "حالة الاستشارة ",
            "شكوى العميل ",
            "يشكو الطبيب "
        ],
    },
    "en": {
        placeholder: {
            client: 'Search by client.....',
            doc: 'Search by doctor....'
        },
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "ONGOING", text: "Ongoing" },
            { value: "PENDING", text: " Pending  " },
            { value: "ENDED", text: " Ended  " },
            { value: "EXPIRED", text: " Expired  " },
            { value: "CANCELLED", text: " Cancelled  " },
            { value: "NO_RESPONSE", text: " No Response  " },
            { value: "SKIPPED", text: " Skipped  " },
            { value: "REJECTED", text: " Rejected  " },
            { value: "ACCEPTED", text: " Accepted  " },
        ],
        TableHeader: [
            "Client Info",
            "Doctor Info  ",
            "Consult Type",
            "Consult Amount ",
            "Counseling status ",
            "Action"
        ],
        ExcelHeader: [
            "Client name",
            "Client phone",
            "Doctor name  ",
            "Doctor phone  ",
            "Consult Type",
            "Consult Amount ",
            "Counseling status ",
            "Client Complain ",
            "Doctor Complain "
        ],
        Actions: { action: "Actions", chat: "Chat", endChat: ' End Chat  ' },
        toast: { endChat: "Chat has been ended" },
        consultChat: {
            nav1:'Consults List',
            nav2:'Consult',
            header:'Consult Details :',
            hello:'Welcome',
            rout:'Admin',
            chatEmpty:'This Consult Is Empty.',
            clientName: 'Client Name:',
            clientPhone: 'Client Phone:',
            doctorName: 'Doctor Name:',
            doctorPhone: 'Doctor Phone:',
            Status: "Counseling status:",
            date: 'Create Date :'
        } ,
        complain:{
            title:'Complaint Details',
            userClient:'Client :',
            userDr:'Dr.',
            btn:'Close'
        },
        ConsultType:[ 
            { value: "NORMAL", text: "Normal  " },
            { value: "URGENT", text: " Urgent " },
        ],
        excelSheet: 'Export to excel sheet',
        filename: '  Consulting data',
        ComplainBody:'There are no complaints',
        currency:'SAR  ',


    }
}

export default initialTranslation