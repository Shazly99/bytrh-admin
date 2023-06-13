import { PostData, apiheader } from "../../utils/fetchData";

// Get  ContactUs Clients Service
const getAllContactUsClients = async (page,Contact) => {
    try {
        const contactes = await PostData(`${process.env.REACT_APP_API_URL}/admin/contactus`, { IDPage: page, ContactApp: Contact }, apiheader)
            .then((data) => { 
                return data;
            });
        return contactes;
    } catch (error) {
        console.log(error);
        return;
    }
};
 
export {
    getAllContactUsClients,
};


