import Boom from 'boom';
import Joi from 'joi';

import { createMockDb } from './db';
import mockShifts from './mockShifts';
import { delay } from './utils';

const db = createMockDb({ shifts: mockShifts });

const formatResponse = (data, operationType) => {
  // console.log('data', data)
  return {
    statusCode: 200,
    message: `${operationType || ""} successful`,
    data: data,
  };
}

export const routes = [
  {
    method: 'GET',
    path: '/',
    handler: async () => {
      await delay(500);
      return formatResponse(await db.shifts.list().then((data) => data), "Fetch all shifts");
    },
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: async ({ params }) => {
      const shift = await db.shifts.get(params.id);
      await delay(200);

      if (!shift) {
        throw Boom.notFound(`Shift not found with id ${params.id}`);
      }

      return formatResponse(shift, "Get shift");;
    },
    config: {
      validate: {
        params: {
          id: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/{id}/book',
    handler: async ({ params }) => {
      const shift = await db.shifts.get(params.id);

      if (!shift) {
        throw Boom.notFound(`Shift not found with id ${params.id}`);
      } else if (shift.booked) {
        throw Boom.badRequest(`Shift ${params.id} is already booked`);
      } else if (Date.now() >= shift.endTime) {
        throw Boom.badRequest('Shift is already finished');
      } else if (Date.now() > shift.startTime) {
        throw Boom.badRequest('Shift has already started');
      }

      const allShifts = await db.shifts.list();
      const overlappingShiftExists = !!allShifts
        .filter(s => s.booked)
        .find(s => s.startTime < shift.endTime && s.endTime > shift.startTime);

      if (overlappingShiftExists) {
        throw Boom.badRequest('Cannot book an overlapping shift');
      }

      await db.shifts.set(params.id, { booked: true });
      await delay(500);

      return formatResponse(await db.shifts.get(params.id), "Booked shift");
    },
    config: {
      validate: {
        params: {
          id: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'Post',
    path: '/{id}/cancel',
    handler: async ({ params }) => {
      const shift = await db.shifts.get(params.id);

      if (!shift) {
        throw Boom.notFound(`Shift not found with id ${params.id}`);
      } else if (!shift.booked) {
        throw Boom.badRequest('Cannot cancel shift that is not booked');
      }

      await db.shifts.set(params.id, { booked: false });
      await delay(500);

      return formatResponse(await db.shifts.get(params.id), "Canceled shift");
    },
    config: {
      validate: {
        params: {
          id: Joi.required(),
        },
      },
    },
  },
];

const plugin = {
  name: 'shifts-mock-api',
  version: '1.0.0',
  register(server) {
    server.route(routes);
  },
};

export { plugin };

