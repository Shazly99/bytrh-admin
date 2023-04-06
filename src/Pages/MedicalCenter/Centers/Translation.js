let initialTranslation = {
    "ar": {
        placeholder: 'البحث عن طريق اسم المركز الطبي أو الهاتف.....',
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "PENDING", text: " قيد الانتظار  " },
            { value: "ACTIVE", text: "   نشــط  " },
            { value: "INACTIVE", text: " غير نشط  " },
        ],
        Filtertype: [
            { value: "All", text: "جميع انواع المنتجات" },
            { value: "CENTER", text: " مركز  " },
            { value: "CLINIC", text: "   عيادة  " },
        ],
        TableHeader: [
            "  صورة",
            " معلومات المركز الطبي ",
            "نوع ",
            "حالة ",
            "تاريخ الإنشاء ",
            "اسم المنطقة",
            'أجراءات'
        ],

        filter: {
            Country: 'حدد الدولة',
            allCountry: 'بلدان',
            city: 'اختر مدينة',
            allCity: 'مدن',
            area: 'حدد المنطقة',
            allarea: 'المناطق',
            Product: 'نوع المنتج',
            Products: '    حدد نوع المنتج    ',
            status: 'حدد الحالة',
            allStatus: 'كل الحالة',
            SubCategory: 'حدد الفئة الفرعية',
            allSubCategory: 'فئة الحيوانات'
        },
        Actions: { action: "أجراءات", currency: "ريال سعودي", edit: "يحرر", view: 'عرض الصفحة الشخصية', add: "إضافة ملف" },
        centerProfileDetails: {
            nav1: 'Medicals centers ',
            nav2: 'Profile ',
            header1:'Medical Center Info',
            MCName: ' Medical Center Name',
            MCPhone: '  Medical Center Phone ',
            MCEmail: '  Medical Center Email ',
            MCAddress: 'Medical Center Address',
            MCType: 'Medical Center Type',
            MCStatus: ' Status',
            MCDPath: 'Center Document Path',
            MCDType: ' Center Document Type',
            MCDExpireDate: ' Center Document Expire Date',
            MCPicture: 'Medical Center Picture',
            AreaName: ' Area Name ',
            CityName: '   City Name  ',
            MCLat: 'Medical Center Lat',
            MCLong: ' Medical Center Long ',
        }
    },
    "en": {
        placeholder: 'Search by medical center name or phone.....',
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "PENDING", text: " Pending  " },
            { value: "ACTIVE", text: "   Active  " },
            { value: "INACTIVE", text: " InActive  " },
        ],
        Filtertype: [
            { value: "All", text: "All" },
            { value: "CENTER", text: " Center  " },
            { value: "CLINIC", text: "   Clinic  " },
        ],
        TableHeader: [
            "  Image",
            " Medical center Info ",
            "Type ",
            "Status ",
            "Create Date ",
            "Area Name",
            'Actions'

        ],

        filter: {
            Country: 'Select Country',
            allCountry: 'Countries',
            city: 'Select City',
            allCity: 'Cities',
            area: 'Select Area',
            allarea: 'Areas',
            Product: 'Product Type',
            Products: 'Animals Product Type',
            status: 'Select Status',
            allStatus: 'All Status',
            SubCategory: 'Select SubCategory',
            allSubCategory: 'Animals SubCategory'
        },
        Actions: { action: "Actions", currency: "SAR", edit: "Edit", view: 'View Profile' , add: "Upload Docu" },
        centerProfileDetails: {
            nav1: 'Medicals centers ',
            nav2: 'Profile ',
            header1:'Medical Center Info',
            MCName: ' Medical Center Name',
            MCPhone: '  Medical Center Phone ',
            MCEmail: 'Medical Center Email ',
            MCAddress: 'Medical Center Address',
            MCType: 'Medical Center Type',
            MCStatus: 'Status',
            MCDPath: 'Center Document Path',
            MCDType: 'Center Document Type',
            MCDExpireDate: 'Center Document Expire Date',
            MCPicture: 'Medical Center Picture',
            AreaName: 'Area Name ',
            CityName: 'City Name  ',
            MCLat: 'Medical Center Lat',
            MCLong: ' Medical Center Long ',
            RoutecenterProfile:'Medical Center Location',
            pinMarkF:'Medical Center'
        }
    }
}

export default initialTranslation