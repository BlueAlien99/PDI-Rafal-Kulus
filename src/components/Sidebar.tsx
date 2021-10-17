import styled from 'styled-components';
import StyleSelectionForm from 'features/styles/StyleSelectionForm';
import StyleEditForm from 'features/styles/StyleEditForm';
import Stats from './Stats';

const SidebarStyles = styled.div`
    padding: 0.5em;
`;

function Sidebar(): JSX.Element {
    return (
        <SidebarStyles>
            <Stats />
            <hr />
            <StyleSelectionForm />
            <hr />
            <StyleEditForm />
        </SidebarStyles>
    );
}

export default Sidebar;
