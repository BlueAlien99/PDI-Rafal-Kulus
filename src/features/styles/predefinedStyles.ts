export type ThreeStyle = {
    name: string;
    overlayColor: string;
    clearColor: string;
    trackColor: string;
};

const dark: ThreeStyle = {
    name: 'Dark',
    overlayColor: '#FFFFFF',
    clearColor: '#13191C',
    trackColor: '#FFC107',
};

const light: ThreeStyle = {
    name: 'Light',
    overlayColor: '#000000',
    clearColor: '#ECEFF1',
    trackColor: '#4CAF50',
};

export const predefinedStyles: ThreeStyle[] = [dark, light];
