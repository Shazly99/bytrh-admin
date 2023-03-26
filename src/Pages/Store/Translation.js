let initialTranslation = {
    "ar": {
        placeholder: 'البحث بالإسم  أو البريد الإلكتروني أو الهاتف .....',

        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "PENDING", text: " قيد الانتظار  " },
            { value: "ACTIVE", text: "   نشيط  " },
            { value: "CANCELLED", text: " الغاء  " },
            { value: "SOLD", text: " مُباع  " },
            { value: "REJECTED", text: "مرفوض" },
            { value: "RESERVED", text: " محجوز  " }
        ],
        TableHeader: [
            "صوره المنتح" ,
            " مغلومات العميل",
            " تصنيف فرعي" ,
            "سعر  ",
            "نوع المنتج",
            "حالة ",
            "  تاريخ الإنشاء  ",
            "تفاصبل منتج"
        ],
        Actions: { action: "الإجراءات",vistType:'نوع الزيارة'},
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
            { value: "ACTIVE", text: "   Active  " },
            { value: "CANCELLED", text: " Cancelled  " },
            { value: "SOLD", text: " Sold  " },
            { value: "REJECTED", text: "Rejected" },
            { value: "RESERVED", text: " Reserved  " }
        ],
        TableHeader: [
            " Product Image",
            " Client Info ",
            "SubCategory     ",
            "Price",
            "Type ",
            "Status ",
            "Create Date ",
            "View"
        ],
        Actions: { action: "Actions", vistType:"vist Type"},
        toast: { endChat: "Chat has been ended" },
        filterVisitType:[
            { value: "All", text: " All visits type"    },
            { value: "HOME", text: " Home  " },
            { value: "CENTER", text: " Center  " },
        ]

    }
}

export default initialTranslation