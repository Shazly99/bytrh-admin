let initialTranslation = {
    "ar": {
        placeholder: 'البحث بالإسم  أو البريد الإلكتروني أو الهاتف .....',
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "PENDING", text: " قيد الانتظار  " },
            { value: "ACTIVE", text: "   نشــط  " },
            { value: "CANCELLED", text: " الغاء  " },
            { value: "SOLD", text: " مُبــاع  " },
            { value: "REJECTED", text: "مرفـوض" },
            { value: "RESERVED", text: " محجــوز  " }
        ],
        Filtertype: [
            { value: "All", text: "جميع انواع المنتجات" },
            { value: "SINGLE", text: " فردي  " },
            { value: "GROUP", text: "   مجموعة  " },
        ],
        TableHeader: [
            "صوره المنتح",
            " معلومات العميل",
            " تصنيف فرعي",
            "سعر  ",
            "نوع المنتج",
            "حالة ",
            "تاريخ البدء ",
            "تاريخ الانتهاء ",
            "  تاريخ الإنشاء  ",
            "تفاصبل منتج"
        ],
        ExcelHeader: [
            " اسم العميل ",
            " هاتف العميل ",
            "تصنيف فرعي    ",
            "سعر",
            " نوع المنتج  ",
            "حالة ",
            "تاريخ البدء ",
            "تاريخ الانتهاء ",
            "تاريخ الإنشاء",
        ],
        bidding: {
            nav1: ' المزايدة على الحيوانات  ', nav2: 'تفاصيل المزايدة',
            header1: 'معلومات المنتج',
            category: 'فئة',
            subCategory: 'تصنيف فرعي',
            type: 'نوع المنتج',
            cinfo: 'معلومات العميل',
            name: 'اسم',
            phone: 'هاتف',
            city: 'مدينة',
            price: 'سعر',
            age: 'عمر',
            gender: 'جنس',
            size: 'مقاس',
            whatsapp: 'واتس اب',
            status: 'حالة',
            endDate: 'تاريخ الانتهاء',
            startDate: 'تاريخ البدء',
            entryFees: 'رسوم الدخول',
            minAmount: 'المبلغ الأدنى',
            productName: 'اسم المنتج',
            des: 'وصف المنتج',
            gallery: 'معرض المنتجات',
            requestsTitle: '    طلبات المنتجات الحيوانية',
            Requests: [
                'معلومات المشتري',
                'سعلا المنتج ',
                'حالة',
            ]

        },
        filter: {
            Country: 'حدد الدولة',
            allCountry: 'بلدان',
            city: 'حدد المنطقة',
            allCity: 'المناطق',
            area: 'حدد المدينة',
            allarea: 'مدن',
            Product: 'نوع المنتج',
            Products: '    حدد نوع المنتج    ',
            status: 'حدد الحالة',
            allStatus: 'كل الحالة',
            SubCategory: 'حدد الفئة الفرعية',
            allSubCategory: 'فئة الحيوانات'
        },
        Actions: { action: "الإجراءات", currency: "ريال سعودي " },
        excelSheet: 'تصدير إلى ملف إكسل',
        filename: '     بيانات المزادات ',
    },
    "en": {
        placeholder: 'Search by client name or email or phone.....',
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "PENDING", text: " Pending  " },
            { value: "ACTIVE", text: "   Active  " },
            { value: "CANCELLED", text: " Cancelled  " },
            { value: "SOLD", text: " Sold  " },
            { value: "REJECTED", text: "Rejected" },
            { value: "RESERVED", text: " Reserved  " }
        ],
        Filtertype: [
            { value: "All", text: "All" },
            { value: "SINGLE", text: " Single  " },
            { value: "GROUP", text: "   Group  " },
        ],
        TableHeader: [
            " Product Image",
            " Client Info ",
            "SubCategory     ",
            "Price",
            "Type ",
            "Status ",
            "Start  Date ",
            "End  Date ",
            "Create Date ",
            "View"
        ],
        ExcelHeader: [
            " Client name ",
            " Client phone ",
            "Sub Category     ",
            "Price",
            "Type ",
            "Status ",
            "Start  Date ",
            "End  Date ",
            "Create Date ",
        ],
        bidding: {
            nav1: 'Animal bidding', nav2: 'Bidding details',
            header1: 'Product Info',
            category: 'Category',
            subCategory: 'Sub Category',
            type: 'Product Type',
            cinfo: 'Client Info',
            name: 'Name',
            phone: 'Phone',
            city: 'City',
            price: 'Price',
            age: 'Age',
            gender: 'Gender',
            size: 'Size',
            whatsapp: 'Whatsapp',
            status: 'Status',
            endDate: 'End Date',
            startDate: 'Start Date',
            entryFees: 'Entry Fees',
            minAmount: 'Min Amount',
            productName: 'Product Name',
            des: 'Product Description',
            gallery: 'Product Gallery',
            requestsTitle: 'Animal Product Requests',
            Requests: [
                'Buyer Info',
                'Price',
                'Status',
            ]

        },
        filter: {
            Country: 'Select Country',
            allCountry: 'Countries',
            city: 'Select Area',
            allCity: 'Areas',
            area: 'Select City',
            allarea: 'Cities',
            Product: 'Product Type',
            Products: 'Animals Product Type',
            status: 'Select Status',
            allStatus: 'All Status',
            SubCategory: 'Select SubCategory',
            allSubCategory: 'Animals SubCategory'
        },
        Actions: { action: "Actions", currency: "SAR" },
        excelSheet: 'Export to excel sheet',
        filename: 'Data Bidding',
    }
}

export default initialTranslation