let initialTranslation = {
    "ar": {
        placeholder: {
            client: ' بحث عن طريق العميل .....',
            doc: ' بحث عن طريق الطبيب ....'
        },
        FilterStatus: [
            { value: "All", text: "الكل" },
            { value: "PENDING", text: " قيد الانتظار  " },
            { value: "ACCEPTED", text: " قبلت  " },
            { value: "CANCELLED", text: " الغاء  " },
            { value: "REJECTED", text: " مرفوض  " },
            { value: "ONGOING", text: "جاري التنفيذ" },
            { value: "ENDED", text: " انتهى  " }
        ],
        TableHeader: [
            "معلومات العميل",
            "معلومات المركز الطبي",
            "معلومات الطبيب",
            "سعر الزيارة",
            "نوع الزيارة",
            "حالة ",
            "تاريخ بدء الزيارة ",
            "الإجراء",
            "تفاصبل الزيارة"

        ],
        Actions: { action: "الإجراءات", vistType: 'نوع الزيارة', currency: "ريال سعودي " },
        toast: { endChat: "تم إنهاء الدردشة" },
        filterVisitType: [
            { value: "All", text: "جميع انواع الزيارات" },
            { value: "HOME", text: " منزليه  " },
            { value: "CENTER", text: " بالمركز  " },
        ],
        VisitDetails: {
            nav1: 'الزيارات',
            nav2: 'تفاصيل الزيارة',
            clientInfo: 'معلومات العميل',
            doctorInfo: 'معلومات الطبيب',
            VisitDistance: 'مسافة',
            PaymentMethod: 'طريقة الدفع   ',
            VisitPrice: ' سعر',
            VisitServicePrice: ' سعر الخدمة',
            VisitTrafficPrice: ' سعر المرور',
            VisitTotalPrice: ' السعر الكلي',
            VisitStartTime: '  وقت البدء  ',
            VisitType: '    يكتب ',
            VisitStatus: '   حالة  ',
            MedicalCenterName: '  اسم المركز الطبي  ',
            MedicalCenterPhone: '   هاتف المركز الطبي  ',
            VisitNote: 'ملاحظات الزيارة',
            ClientName: '  اسم العميل  ',
            ClientPhone: '   هاتف العميل  ',
            DoctorName: '  اسم الطبيب  ',
            DoctorPhone: 'هاتف الطبيب',
            RouteVisit:'مسار طريق الزيارة',
            currency:"ريال سعودي"

        }

    },
    "en": {
        placeholder: {
            client: 'Search by client.....',
            doc: 'Search by doctor....'
        },
        FilterStatus: [
            { value: "All", text: "All" },
            { value: "PENDING", text: " Pending  " },
            { value: "ACCEPTED", text: " Accepted  " },
            { value: "CANCELLED", text: " Cancelled  " },
            { value: "REJECTED", text: " Rejected  " },
            { value: "ONGOING", text: "Ongoing" },
            { value: "ENDED", text: " Ended  " }
        ],
        TableHeader: [
            "Client Info",
            "Medical Center Info ",
            "Doctor Info  ",
            "Visit Total Price",
            "Visit Type ",
            "Status ",
            "Start Date ",
            "Action",
            "View",
        ],
        Actions: { action: "Actions", vistType: "visit Type", currency: "SAR" },
        toast: { endChat: "Chat has been ended" },
        filterVisitType: [
            { value: "All", text: " All visits type" },
            { value: "HOME", text: " Home  " },
            { value: "CENTER", text: " Center  " },
        ],
        VisitDetails: {
            nav1: 'Visits',
            nav2: 'Visit details',
            clientInfo: 'Client Info',
            doctorInfo: 'Doctor Info', 
            VisitDistance: 'Distance',
            PaymentMethod: 'Payment Method',
            VisitPrice: ' Price',
            VisitServicePrice: ' Service Price',
            VisitTrafficPrice: ' Traffic Price',
            VisitTotalPrice: ' Total Price',
            VisitStartTime: '  Start Time  ',
            VisitType: ' Visit type  ',
            VisitStatus: '   Status  ',
            MedicalCenterName: '  Medical Center Name  ',
            MedicalCenterPhone: '  Medical Center Phone  ',
            VisitNote: 'Visit note',
            ClientName: '  Client Name  ',
            ClientPhone: '  Client Phone  ',
            DoctorName: '  Doctor Name  ',
            DoctorPhone: 'Doctor Phone',
            DoctorPhone: 'Doctor Phone',
            RouteVisit:'Route of the visit',
            currency:"SAR"
        }

    }
}

export default initialTranslation