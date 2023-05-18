import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Component from '../../../constants/Component';
import initialTranslation from './Translation';
import { VendersContext } from '../../../context/Store';

export default function ReportsUsers() {
    const [value, setValue] = React.useState('one');
    const [translate, setTranslate] = React.useState(initialTranslation)
    let { isLang } = React.useContext(VendersContext);

    const handelTranslate = () => setTranslate(initialTranslation)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="vh-100 " dir='ltr'>
            <Box sx={{ width: '100%' }}>
                <Tabs
                
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    variant='fullWidth'
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    
                >
                    <Tab style={{ textTransform: 'capitalize' }}value="one" label={ translate[isLang]?.ClientTransactions} variant={value === 'one' ? 'contained' : 'standard'} />
                    <Tab style={{ textTransform: 'capitalize' }}value="two" label={ translate[isLang]?.DoctorTransactions}  variant={value === 'two' ? 'contained' : 'standard'} />

                </Tabs>

                {value === 'one' && (
                    <Box sx={{ p: 3 }}>
                        <Component.ReportsClients />
                    </Box>
                )}

                {value === 'two' && (
                    <Box sx={{ p: 3 }}>
                        <Component.ReportsDoctors />
                    </Box>
                )}

            </Box>
        </div>
    );
}

