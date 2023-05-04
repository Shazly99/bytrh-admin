let initialTranslation = {
    "ar": {
        FilterStatus: [
            { value: "All", text: "الكل" },
            { ServiceActivated: 1, value: "ACTIVE", text: "نشط" },
            { ServiceActivated: 0, value: "INACTIVE", text: "غير نشط" },
        ],
        TableHeader: [
            "إسم الخدمة",
            "حالة الخدمة",
            "الإجراء"
        ],
        Actions:   { action: "الإجراءات" ,edit: "تعديل" },
            
        add: {
            btn: 'إضافه', nav1: 'الخدمات', nav2: 'إضافة خدمة',
            header: 'إضافه خدمة جديد',
            Label3: 'إسم الخدمة (Ar)', 
            Label1: 'إسم الخدمة (En)',
            save: "حفظ", cancel: 'رجــوع'
        },

        edit: {
            nav1: 'الخدمــات', nav2: 'تعديل الخدمة',
            header: 'تعديل بيانات  الخدمة ',
            Label3: 'إسم الخدمة (Ar)', 
            Label1: 'إسم الخدمة (En)',
            save: "حفظ", cancel: 'رجــوع'
        },
        toast:
        {
            update: "تم التحديث بنجاح",
            add: 'تمت إضافة خدمة جديدة بنجاح',
            edit: "تم تحديث بيانات الخدمة"
        },

    },
    "en": {
        FilterStatus: [
            { value: "All", text: "All" },
            { ServiceActivated: 1, value: "ACTIVE", text: "Active" },
            { ServiceActivated: 0, value: "INACTIVE", text: "InActive" },
        ],
        TableHeader: [
            "Service Name",
            "Service Status",
            "Action"
        ],
        Actions:  { action: "Actions" , edit: "Edit"},
        
        add: {
            btn: 'Add', nav1: 'Services', nav2: 'Add Service ',
            header: 'Add New Service',
            Label1: 'Name (En)',
            Label3: 'Name (Ar)',
            save: "Save",
            cancel: 'Cancel'
        },
        edit: {
            nav1: 'Services', nav2: 'Edit Services',
            header: 'Edit Service ', 
            Label1: 'Name (En)', 
            Label3: 'Name (Ar)', 
            save: "Save", cancel: 'Cancel'
        },
        toast: {
            edit: "Service data has been updated",
            update: "Updated Successfully",
            add: 'New service added successfully'
        },
    }
}

export default initialTranslation