let initialTranslate = {
    "ar": {
        placeholder: 'البحث بالإسم  أو البريد الإلكتروني أو الهاتف .....',
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "ACTIVE", text: "نشط" },
            { value: "INACTIVE", text: "غير نشط" },
            { value: "PENDING", text: "معلقة" },
        ],
        TableHeader: [
            "إسم  المستخدم",
            "بريد إلكتروني",
            " هاتف ",
            "حالة المستخدم",
            "منصب",
            "الإجراء"
        ],
        ExcelHeader: [
            "إسم  المستخدم",
            " هاتف ",
            "بريد إلكتروني",
            "منصب",
            "حالة المستخدم",
            "تاريخ الانشاء"
        ],
        Actions: [
            { name: "الإجراءات" },
            { name: "تعديل" },
            { name: "حذف", titleModel: "حذف المستخدم", btn1: " إحذف الان", btn2: "رجــوع" },
        ],
        add: [
            { btn: 'إضافه' },
            { nav1: 'المستخدمين', nav2: 'إضافة مستخدم' },
            {
                header: 'إضافه مستخدم جديد',
                Label1: 'إسم المستخدم', Label2: 'البريد الألكتروني ', Label3: 'الدوله', Label4: 'رقم الهاتف ', Label5: 'الرقم السري ', Label6: 'مدينه'

            },
            { save: "حفظ", cancel: 'رجــوع' }
        ],
        roule: {
            name: 'رتبــه'
        },
        edit: [
            { nav1: 'المستخدمين', nav2: 'تعديل المستخدم' },
            {
                header: 'تعديل بيانات المستخدم',
                Label1: 'إسم المستخدم', Label2: 'البريد الألكتروني ', Label3: 'الدوله', Label4: 'رقم الهاتف ',
                Label5: 'الرقم السري ', Label6: 'مدينه'

            },
            { save: "حفظ", cancel: 'رجــوع' }
        ],
        toast: {
            add: 'تمت إضافة مستخدم جديد بنجاح',
            update: "تم التحديث بنجاح",
            delete: "تم حذف المستخدم",
            edit: "تم تحديث بيانات المستخدم",
            updatePassword:'تم تغيير الرقم السري بنجاح'
        },
        excelSheet: ' تصدير إلى إكسل',
        filename: '  بيانات المستخدمين    ',

    },
    "en": {
        placeholder: 'Search by name or email or phone.....',
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "ACTIVE", text: "Active" },
            { value: "INACTIVE", text: " InActive  " },
            { value: "PENDING", text: "Pending" },
        ],
        TableHeader: [
            "User Name",
            "Email",
            "Phone  ",
            "User State",
            "Role",
            "Action"
        ],
        ExcelHeader: [
            "User Name",
            "Phone  ",
            "Email",
            "Role",
            "User State",
            "Create Date"
        ],
        Actions: [
            { name: "Actions" },
            { name: "Edit" },
            { name: "Deleted", titleModel: "Delete User", btn1: "Delete Now", btn2: "Cancel" },
        ],
        add: [
            { btn: 'Add' },
            { nav1: 'Users', nav2: 'Add User' },
            { header: 'Add New User', Label1: 'Users Name', Label2: 'Email', Label3: 'Country', Label4: 'Mobile phone', Label5: 'Password', Label6: 'City' },
            { save: "Save", cancel: 'Cancel' }
        ],
        roule: {
            name: 'Roles',

        },
        edit: [
            { nav1: 'Users', nav2: 'Edit User' },
            { header: 'Edit User', Label1: 'Users Name', Label2: 'Email', Label3: 'Country', Label4: 'Mobile phone', Label5: 'Password', Label6: 'City' },
            { save: "Save", cancel: 'Cancel' }
        ],
        toast: {
            update: "Updated Successfully",
            delete: "user has been deleted ",
            add: 'New user added successfully!',
            edit: "User data has been updated ",
            updatePassword:' Password has been changed successfully'

        },
        excelSheet: 'Export into excel',
        filename: 'Users data',
    }
}

export default initialTranslate