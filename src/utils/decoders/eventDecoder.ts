import * as R from 'ramda';
import { trackDecoder } from './trackDecoder';
import { numberOr, arrayOr, stringOr } from './utils/typeOr';
import { propOfType } from './utils/utils';

const workflowDateDecoder = R.pipe(
    propOfType('workflowParameters', stringOr()),
    R.split(' t:'),
    R.head,
    stringOr(),
    str => str || 'unknown'
);

const tracksDecoder = R.pipe(propOfType('mTracks', arrayOr()), R.map(trackDecoder));

export const eventDecoder = R.applySpec({
    workflowDate: workflowDateDecoder,
    trackCount: propOfType('trackCount', numberOr()),
    tracks: tracksDecoder,
});

export type AliceEvent = ReturnType<typeof eventDecoder>;
