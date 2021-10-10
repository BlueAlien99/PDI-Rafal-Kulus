import styled from 'styled-components';
import StyleSelectionForm from 'features/styles/StyleSelectionForm';
import StyleEditForm from 'features/styles/StyleEditForm';

const SidebarStyles = styled.div`
    padding: 0.5em;
`;

function Sidebar(): JSX.Element {
    return (
        <SidebarStyles>
            <StyleSelectionForm />
            <hr />
            <StyleEditForm />
        </SidebarStyles>
    );
}

export default Sidebar;
