let initialTranslation = {
    "ar": {
        placeholder: 'البحث بإسم الدولة ....',
        FilterStatus: [
            { value: "All", text: "الكل" },
            { CountryActive: 1, value: "ACTIVE", text: "نشط" },
            { CountryActive: 0, value: "INACTIVE", text: "غير نشط" },
        ],
        TableHeader: [
            "إسم  الدولة",
            "الرقم الدولي",
            "المنطقة الزمنية للبلد",
            "حالة البلد",
            "الإجراء"
        ],
        Actions:   { action: "الإجراءات" ,edit: "تعديل" },
            
        add: {
            btn: 'إضافه', nav1: 'الدول', nav2: 'إضافة دولــة',
            header: 'إضافه دولــة جديد',
            Label3: 'إسم الدولة (Ar)', 
            Label2: 'المنطقة الزمنية',
            Label1: 'إسم الدولة (En)',
            Label4: 'الرقم الدولي   ',
            save: "حفظ", cancel: 'رجــوع'
        },

        edit: {
            nav1: 'المستخدمين', nav2: 'تعديل المستخدم',
            header: 'تعديل بيانات  الدولــة ',
            Label3: 'إسم الدولة (Ar)', 
            Label2: 'المنطقة الزمنية',
            Label1: 'إسم الدولة (En)',
            Label4: 'الرقم الدولي   ',
            save: "حفظ", cancel: 'رجــوع'
        },
        toast:
        {
            update: "تم التحديث بنجاح",
            add: 'تمت إضافة دوله جديدة بنجاح',
            edit: "تم تحديث بيانات دولة"
        },

    },
    "en": {
        placeholder: 'Search by country.....',
        FilterStatus: [
            { value: "All", text: "All" },
            { CountryActive: 1, value: "ACTIVE", text: "Active" },
            { CountryActive: 0, value: "INACTIVE", text: " InActive  " },
        ],
        TableHeader: [
            "Country Name  ",
            "Country Code",
            "Country Time Zone  ",
            "Country Status  ",
            "Action"
        ],
        Actions:  { action: "Actions" , edit: "Edit"},
           
        add: {
            btn: 'Add', nav1: 'Countries', nav2: 'Add Country ',
            header: 'Add New Country',
            Label1: 'Name (En)',
            Label2: 'Time Zone',
            Label3: 'Name (Ar)   ',
            Label4: 'Country Code  ',
            save: "Save",
            cancel: 'Cancel'
        },
        edit: {
            nav1: 'Countries', nav2: 'Edit Countries',
            header: 'Edit Country ', Label1: 'Name (En)', Label2: 'Time Zone', Label3: 'Name (Ar)   ', Label4: 'Country Code  ',
            save: "Save", cancel: 'Cancel'
        },
        toast: {
            edit: "Country data has been updated",
            update: "Updated Successfully",
            add: 'New country added successfully'
        },
    }
}

export default initialTranslation