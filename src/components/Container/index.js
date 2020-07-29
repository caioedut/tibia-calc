import React from 'react';
import ContainerMUI from '@material-ui/core/Container';

import Header from '../Header';

function Container({header = true, title, children}) {
    return (
        <>
            {!!header && <Header title={title}/>}
            <ContainerMUI style={{marginTop: 24, marginBottom: 24}}>
                {children}
            </ContainerMUI>
        </>
    );
}

export default Container;