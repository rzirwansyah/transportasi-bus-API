import moment from 'moment';
import dbQuery from '../db/dev/dbQuery';

import { isEmpty, empty } from '../helpers/validation';

import { errorMessage, successMessage, status, trip_statuses } from '../helpers/status';

/**
 * membuat trip
 * @param { object } req
 * @param { object } res
 * @returns { object } reflection object 
 */

const createTrip = async (req, res) => {

    const { bus_id, origin, destination, trip_date, fare } = req.body;

    const { is_admin } = req.user;

    if (!is_admin === true) {
        errorMessage.error = 'Sorry You are unauthorized to create a trip';
        return res.status(status.bad).send(errorMessage);
    }

    const created_on = moment(new Date());

    if (empty(bus_id) || isEmpty(origin) || isEmpty(destination) || empty(trip_date) || empty(fare)) {
        errorMessage.error = 'Origin, destination, trip date, and fare field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }

    const createTripQuery =
    `INSERT INTO
    trip(bus_id, origin, destination, trip_date, fare, created_on)
    VALUES($1, $2, $3, $4, $5, $6)`;
    const values = [bus_id, origin, destination, trip_date, fare, created_on];

    try {
        const { rows } = await dbQuery.query(createTripQuery, values);
        const dbResponse = rows[0];
        successMessage.data = dbResponse;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Unable to create trip';
        return res.status(status.error).send(errorMessage);
    }

};

/**
 * mendapatkan semua trip
 * @param { object } req
 * @param { object } res
 * @returns { object } trips array
 */

const getAllTrips = async (req, res) => {

    const getAllTripsQuery =
    `SELECT * FROM trip ORDER BY id DESC`;

    try {
        const { rows } = await dbQuery.query(getAllTripsQuery);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'There are no trips';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    };

};

/**
 * cancel trip
 * @param { object } req 
 * @param { object } res
 * @returns { void } return trip cancelled successfully
 */

const cancelTrip = async (req, res) => {

    const { tripId } = req.params;
    const { is_admin } = req.user;
    const { cancelled } = trip_statuses;

    if (!is_admin === true) {
        errorMessage.error = 'Sorry you are unauthorized to cancel a trip';
        return res.status(status.bad).send(errorMessage);
    }

    const cancelTripQuery =
    `UPDATE trip SET status = $1 WHERE id = $2 returning *`;
    const values = [cancelled, tripId];

    try {
        const { rows } = await dbQuery.query(cancelTripQuery, values);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'There is no trip with that id';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = {};
        successMessage.data.message = 'Trip cancelled successfully';
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }

};

/**
 * filter trip berdasarkan asal
 * @param { object } req 
 * @param { object } res
 * @returns { object } returned trips
 */

const filterTripByOrigin = async (req, res) => {

    const { origin } = req.query;
    const findTripQuery =
    `SELECT * FROM trip WHERE origin = $1 ORDR BY id DESC`;
    
    try {
        const { rows } = await dbQuery.query(findTripQuery, [origin]);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No trips with that origin';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.notfound).send(errorMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }

};

/**
 * filter trip berdasarkan tujuan
 * @param { object } req 
 * @param { object } res
 * @returns { object } returned trips
 */

const filterTripByDestination = async (req, res) => {

    const { destination } = req.query;
    const findTripQuery =
    `SELECT * FROM trip WHERE destination = $1 ORDER BY id DESC`;

    try {
        const { rows } = await dbQuery.query(findTripQuery, [destination]);
        const dbResponse = rows;
        if(!dbResponse[0]) {
            errorMessage.error = 'No trips with that destination';
            return res.status(status.notfound).send(errorMessage);
        }
        successMessage.data = dbResponse;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }

};

export { createTrip, getAllTrips, cancelTrip, filterTripByOrigin, filterTripByDestination };