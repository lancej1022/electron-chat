import moment from 'moment';
import { Timestamp } from '../db/firestore';

export const createTimestamp = () => Timestamp.now().toMillis().toString();

export const formatPastTime = (timestamp) => moment(parseInt(timestamp, 10)).fromNow();
