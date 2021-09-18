import * as R from 'ramda';
import { trackDecoder } from './trackDecoder';
import { numberOr, arrayOr } from './utils/typeOr';
import { propOfType } from './utils/utils';

const tracksDecoder = R.pipe(propOfType('fTracks', arrayOr()), R.map(trackDecoder));

export const eventDecoder = R.applySpec({
    id: propOfType('fUniqueID', numberOr()),
    tracks: tracksDecoder,
});

export type AliceEvent = ReturnType<typeof eventDecoder>;
