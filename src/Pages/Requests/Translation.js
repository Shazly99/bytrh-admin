let initialTranslation = {
    "ar": {
        FilterStatus: [
            { value: "All", text: "الكل" },
            { ServiceStatus: 'ACTIVE', value: "ACTIVE", text: "نشط" },
            { ServiceStatus: 'INACTIVE', value: "INACTIVE", text: "غير نشط" },
            { ServiceStatus: "PENDING", value: "PENDING", text: "قيد الانتظار" },

        ],
        FilterStatus2: [
            { value: "PROCESSED", text: "تمت المعالجة " },
            { value: "PENDING", text: "قيد الانتظار   " },
            { value: "REJECTED", text: " مرفوض" },
        ],
        TableHeader: [
            "نوع الطلب",
            "عنوان الطلب",
            // "وصف",
            "تاريخ",
            'تفاصيل '

        ],
        Actions: { action: "الإجراءات", edit: "تعديل" },

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
            { ServiceStatus: "ACTIVE", value: "ACTIVE", text: "Active" },
            { ServiceStatus: "INACTIVE", value: "INACTIVE", text: "InActive" },
            { ServiceStatus: "PENDING", value: "PENDING", text: "Pending" },
        ],

        StatusWithdrow: [
            { value: "All", text: "All" },
            { ServiceStatus: "ACTIVE", value: "ACTIVE", text: "Active" },
            { ServiceStatus: "INACTIVE", value: "INACTIVE", text: "InActive" },
            { ServiceStatus: "PENDING", value: "PENDING", text: "Pending" },
        ],


        TableHeader: [
            "Request Type",
            "Request Title",
            // "Description",
            "Date",
            'Details'
        ],
        Actions: { action: "Actions", edit: "Edit" },

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