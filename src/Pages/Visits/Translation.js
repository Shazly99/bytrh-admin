let initialTranslation = {
    "ar": {
        placeholder: {
            client: ' بحث عن طريق العميل .....',
            doc: ' بحث عن طريق الطبيب ....'
        },
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "PENDING", text: " قيد الانتظار  " },
            { value: "ACCEPTED", text: " قبلت  " },
            { value: "CANCELLED", text: " الغاء  " },
            { value: "REJECTED", text: " مرفوض  " },
            { value: "ONGOING", text: "جاري التنفيذ" },
            { value: "ENDED", text: " انتهى  " } 
        ],
        TableHeader: [
            "معلومات العميل" ,
            "معلومات المركز الطبي",
            "معلومات الطبيب" ,
            "سعر الزيارة",
            "نوع الزيارة",
            "حالة ",
            "تاريخ بدء الزيارة ",
            "الإجراء"
        ],
        Actions: { action: "الإجراءات",vistType:'نوع الزيارة',currency:"ريال سعودي "},
        toast: { endChat: "تم إنهاء الدردشة" }, 
        filterVisitType:[
            { value: "All", text: "جميع انواع الزيارات" },
            { value: "HOME", text: " منزليه  " },
            { value: "CENTER", text: " بالمركز  " },
        ], 
        

    },
    "en": {
        placeholder: {
            client: 'Search by client.....',
            doc: 'Search by doctor....'
        },
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "PENDING", text: " Pending  " },
            { value: "ACCEPTED", text: " Accepted  " },
            { value: "CANCELLED", text: " Cancelled  " },
            { value: "REJECTED", text: " Rejected  " },
            { value: "ONGOING", text: "Ongoing" },
            { value: "ENDED", text: " Ended  " }
        ],
        TableHeader: [
            "Client Info",
            "Medical Center Info ",
            "Doctor Info  ",
            "Visit Total Price",
            "Visit Type ",
            "Status ",
            "Start Date ",
            "Action"
        ],
        Actions: { action: "Actions", vistType:"vist Type",currency:"SAR"},
        toast: { endChat: "Chat has been ended" },
        filterVisitType:[
            { value: "All", text: " All visits type"    },
            { value: "HOME", text: " Home  " },
            { value: "CENTER", text: " Center  " },
        ]

    }
}

export default initialTranslation