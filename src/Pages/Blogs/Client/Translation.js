let initialTranslation = {
    "ar": {
        placeholder: 'البحث بالإسم  أو البريد الإلكتروني أو الهاتف .....', 
        FilterStatus: [
            { value: "All", text: "الجميع" },
            { value: "PENDING", text: " قيد الانتظار  "},
            { value: "REJECTED", text: "تــم الرفض" ,text2:"رفــض" },
            { value: "POSTED", text: "   تم النشر  " ,text2:'نـــشر'},
            { value: "REMOVED", text: " تمت الإزالة  ",text2:"إزالـــة" }, 
        ],
        TableHeader: [ ,
            " معلومات العميل ",
            "عنوان المدونة     ",
            "فئة الحيوان ",
            "حالة المدونة ",
            "رؤية المدونة	 ",
            "تاريخ المدونة",
            "حالة المدونة",
            'تفاصيل المدونة'
        ],  
        ExcelHeader: [ ,
            " اسم العميل ", 
            "عنوان المدونة    ",
            " محتوي المدونة",
            "لايكات المدونة",
            "تعليقات المدونة",
            "فئة الحيوان",
            "رؤية المدونة	 ",
            "حالة المدونة ",
            "تاريخ المدونة ",
            
        ], 
        filter:{  
            Category:' حدد فئة الحيوانات',
            allCategory:'كل فئات الحيوانات'
        },
        blogDetails:{
            nav1:'المدونات',nav2:'تفاصيل المدونة', 
            galleryTitle:'معرض المدونة',
            galleryBtn:'عــرض المزيد' ,
            like:'الإعجابات',
            comment:'تعليقات',
            Visibility:'الرؤية',
            nameAr:'اسم التصنيف (بالعربية)',
            nameEn:'اسم التصنيف (بالإنجليزية)',
            deleteBtn:'حذف',
            deleteTitle:'حذف تعليق ',
            cancel:'رجــوع',
            toast:'تــم حــذف التعليق ',
            toastUpdate:'تـم تحديث الحالـة',


            
        },
        excelSheet: 'تصدير إلى ملف إكسل',
        filename: 'بيانات مدونات  العملاء ',

    },
    "en": {
        placeholder:   'Search by client name or email or phone.....', 
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "PENDING", text: " Pending  " },
            { value: "REJECTED", text: "Rejected" ,text2:"Rejected"},
            { value: "POSTED", text: "   Posted  " ,text2:'Post'},
            { value: "REMOVED", text: " Remove  " ,text2:"Remove"}, 
        ],
        TableHeader: [ ,
            " Client Info ",
            "Blog Title     ",
            "Animal Category",
            "Blog Status ",
            "Blog Visibility	 ",
            "Blog Date ",
            "Blog Status",
            "View"
        ],  
        ExcelHeader: [ ,
            " Client name ", 
            "Blog Title     ",
            "Blog Body",
            "Blog Likes",
            "Blog Comments",
            "Animal Category",
            "Blog Visibility	 ",
            "Blog Status ",
            "Blog Date ",
            
        ],   

        filter:{  
            Category:' Select Animal Category ',
            allCategory:'All category of animals'
        },
        blogDetails:{
            nav1:'Blogs',nav2:'Blog Details', 
            galleryTitle:'BLog Gallery',
            galleryBtn:'Show more' ,
            like:'Likes',
            comment:'Comments',
            Visibility:'Visibility',
            nameAr:'Category Name (Ar)',
            nameEn:'Category Name (En)',
            deleteBtn:'Delete',
            deleteTitle:'Delete Comment ',
            cancel:'Cancel',
            toast:'The Comment Has Been Deleted ',
            toastUpdate:'Updated Successfully',
            
        },
        excelSheet: 'Export to excel sheet',
        filename: 'Clients blogs data',
    }
}

export default initialTranslation