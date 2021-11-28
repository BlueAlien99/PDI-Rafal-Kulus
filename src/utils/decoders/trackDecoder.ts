import * as R from 'ramda';
import { getSequenceGenerator } from 'utils/utils';
import { arrayOfType, propOfType, zip3 } from './utils/utils';
import { numberOr } from './utils/typeOr';

const singleDimensionDecoder = (prop: string) => propOfType(prop, arrayOfType(numberOr()));

const pointsDecoder = (data: unknown) =>
    zip3(
        singleDimensionDecoder('mPolyX')(data),
        singleDimensionDecoder('mPolyY')(data),
        singleDimensionDecoder('mPolyZ')(data)
    );

export const trackDecoder = R.applySpec({
    id: getSequenceGenerator(),
    points: pointsDecoder,
});
