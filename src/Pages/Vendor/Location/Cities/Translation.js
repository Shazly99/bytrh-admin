let initialTranslation = {
    "ar": {
        placeholder: 'البحث بإسم المنطقة ....',
        FilterStatus: [
            { value: "All", text: "الكل" },
            { CityActive: 1, value: "ACTIVE", text: "نشط" },
            { CityActive: 0, value: "INACTIVE", text: "غير نشط" },
        ],
        TableHeader: [
            "إسم  الدولة",
            " إسم  المنطقة",
            "حالة المنطقة  ",
            "الإجراء"
        ],
        Actions:   { action: "الإجراءات" ,edit: "تعديل" },

        add: {
            btn: 'إضافه', nav1: 'المناطق', nav2: 'إضافة منطقة',
            header: ' أضف منطقة جديدة'   ,
            Label3: 'إسم منطقة (Ar)', 
            Label2: 'رمز المنطقة  ',
            Label1: 'إسم منطقة (En)',
            Label4: '  إسم الدولة  ',
            save: "حفظ", cancel: 'رجــوع'
        },
        edit: {
            nav1: 'المناطق', nav2: 'تعديل منطقة',
            header: 'تعديل بيانات  الدولــة ',
            Label3: 'إسم منطقة (Ar)', 
            Label2: '   إسم الدوله',
            Label1: 'إسم منطقة (En)', 
            save: "حفظ", cancel: 'رجــوع'
        },
        toast: {
            update: "تم التحديث بنجاح",
            add: 'تمت إضافة دوله جديدة بنجاح',
            edit: "تم تحديث بيانات دولة"
        },
        filter:{
            Country:'حدد الدولة',
            allCountry:'بلدان',
            area:'اختر مدينة',
            allarea:'مدن',            
            city:'حدد المنطقة',
            allCity:'المناطق',
            Product:'نوع المنتج',
            Products:'  أنواع المنتجات الحيوانية  ',
            status:'حدد الحالة',
            allStatus:'كل الحالة',
            SubCategory:'حدد الفئة الفرعية',
            allSubCategory:'فئة الحيوانات'
        }

    },



    "en": {
        placeholder: 'Search by country.....',
        FilterStatus: [
            { value: "All", text: "All" },
            { CityActive: 1, value: "ACTIVE", text: "Active" },
            { CityActive: 0, value: "INACTIVE", text: " InActive  " },
        ],
        TableHeader: [
            "Country Name  ",
            "Area Name",
            "Area status",
            "Action"
        ],
        Actions:  { action: "Actions" , edit: "Edit"}, 
        add: {
            btn: 'Add', nav1: 'Areas', nav2: 'Add Area ',
            header: 'Add New Area',
            Label1: 'Name (En)',
            Label2: 'Area Code',
            Label3: 'Name (Ar)   ',
            Label4: 'Country   ',
            save: "Save", cancel: 'Cancel'
        },

        edit: { 
            nav1: 'Areas', nav2: 'Edit Area' ,
            header: 'Edit  Area',
             Label1: 'Name (En)',
             Label2: 'Country Name', 
             Label3: 'Name (Ar)   ' ,
            save: "Save", cancel: 'Cancel'
        }, 
          
        toast:
        {
            edit: "Country data has been updated",
            update: "Updated Successfully",
            add: 'New country added successfully'
        },
        filter:{
            Country:'Select Country',
            allCountry:'Countries',
            area:'Select City',
            allarea:'Cities',            
            city:'Select Area',
            allCity:'Areas',
            Product:'Product Type',
            Products:'Animals Product Type',
            status:'Select Status',
            allStatus:'All Status',
            SubCategory:'Select SubCategory',
            allSubCategory:'Animals SubCategory'
        }   

    }
}

export default initialTranslation