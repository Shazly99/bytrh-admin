let initialTranslation = {
    "ar": {
        placeholder: 'البحث بإسم المدينه ....',
        FilterStatus: [
            { value: "All", text: "الكل" },
            { AreaActive: 1, value: "ACTIVE", text: "نشط" },
            { AreaActive: 0, value: "INACTIVE", text: "غير نشط" },
        ],
        TableHeader: [
            "إسم الدولة",
            " إسم المنطقة",
            "إسم المدينة",
            "حالة المنطقة",
            "الإجراء"
        ],
        Actions: { action: "الإجراءات", edit: "تعديل" },

        add: {
            btn: 'إضافه',
            nav1: 'مدينة', nav2: 'إضافة مدينة',
            header: 'إضافه مدينــة جديـدة',
            Label3: 'إسم مدينة (Ar)',
            Label2: "إسم الدوله",
            Label1: 'إسم مدينة (En)',
            Label4: 'إسم المدينة ',
            save: "حفظ", cancel: 'رجــوع'
        },

        edit: {
            nav1: 'المستخدمين', nav2: 'تعديل المستخدم',
            header: 'تعديل بيانات  المدينـة ', 
            Label3: 'إسم مدينة (Ar)',
            Label2: 'المنطقة الزمنية',
            Label1: 'إسم مدينة (En)',
            Label4: 'الرقم الدولي   ',
             save: "حفظ", cancel: 'رجــوع'
        },

        toast: {
            update: "تم التحديث بنجاح",
            add: 'تمت إضافة دوله جديدة بنجاح',
            edit: "تم تحديث بيانات دولة"
        },

    },
    "en": {
        placeholder: 'Search by country.....',
        FilterStatus: [
            { value: "All", text: "All" },
            { AreaActive: 1, value: "ACTIVE", text: "Active" },
            { AreaActive: 0, value: "INACTIVE", text: " InActive  " },
        ],
        TableHeader: [
            "Country Name  ",
            "Area Name",
            "City Name  ",
            "Area status  ",
            "Action"
        ],
        Actions: { action: "Actions", edit: "Edit" },

        add: {
            btn: 'Add',
            nav1: 'Cities  ', nav2: 'Add City  ',
            header: 'Add New City', 
            Label1: 'Name (En)',
             Label2: 'Country',  
             Label3: 'Name (Ar)   ', 
             Label4: 'City ',
            save: "Save", cancel: 'Cancel'
        },
        edit: {
            nav1: 'Areas', nav2: 'Edit City',
            header: 'Edit Country ', 
            Label1: 'Name (En)',
            Label2: 'Country',  
            Label3: 'Name (Ar)   ', 
            Label4: 'City ',
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