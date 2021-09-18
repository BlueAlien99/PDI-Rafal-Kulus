import * as R from 'ramda';
import { arrayOfType, propOfType, zip3 } from './utils/utils';
import { numberOr } from './utils/typeOr';

const singleDimensionDecoder = (prop: string) => propOfType(prop, arrayOfType(numberOr()));

const pointsDecoder = (data: unknown) =>
    zip3(
        singleDimensionDecoder('fPolyX')(data),
        singleDimensionDecoder('fPolyY')(data),
        singleDimensionDecoder('fPolyZ')(data)
    );

export const trackDecoder = R.applySpec({
    id: propOfType('fUniqueID', numberOr()),
    points: pointsDecoder,
});
