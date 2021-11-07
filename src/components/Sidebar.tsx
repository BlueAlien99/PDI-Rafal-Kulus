import styled from 'styled-components';
import StyleSelectionForm from 'features/styles/StyleSelectionForm';
import StyleEditForm from 'features/styles/StyleEditForm';
import ScreenshotForm from 'features/screenshot/ScreenshotForm';
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
            <hr />
            <ScreenshotForm />
        </SidebarStyles>
    );
}

export default Sidebar;
