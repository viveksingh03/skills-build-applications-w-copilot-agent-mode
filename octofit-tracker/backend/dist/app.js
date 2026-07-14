import express from 'express';
import { connectToDatabase } from './config/database.js';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';
function buildPayload(resource, data) {
    return { resource, data };
}
function getApiBaseUrl(port) {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return process.env.API_URL || `http://localhost:${port}`;
}
export function createApp() {
    const app = express();
    const port = Number(process.env.PORT || 8000);
    app.use(express.json());
    app.get('/', (_req, res) => {
        res.json({ message: 'OctoFit Tracker API is running' });
    });
    app.get('/api/config', (_req, res) => {
        res.json({ apiUrl: getApiBaseUrl(port) });
    });
    const resources = [
        {
            path: '/api/users/',
            resource: 'users',
            load: async () => {
                await connectToDatabase();
                return (await User.find()).map((item) => item.toObject());
            },
            create: async (payload) => {
                await connectToDatabase();
                const created = await User.create(payload);
                return [created.toObject()];
            },
        },
        {
            path: '/api/teams/',
            resource: 'teams',
            load: async () => {
                await connectToDatabase();
                return (await Team.find()).map((item) => item.toObject());
            },
            create: async (payload) => {
                await connectToDatabase();
                const created = await Team.create(payload);
                return [created.toObject()];
            },
        },
        {
            path: '/api/activities/',
            resource: 'activities',
            load: async () => {
                await connectToDatabase();
                return (await Activity.find()).map((item) => item.toObject());
            },
            create: async (payload) => {
                await connectToDatabase();
                const created = await Activity.create(payload);
                return [created.toObject()];
            },
        },
        {
            path: '/api/leaderboard/',
            resource: 'leaderboard',
            load: async () => {
                await connectToDatabase();
                return (await LeaderboardEntry.find()).map((item) => item.toObject());
            },
            create: async (payload) => {
                await connectToDatabase();
                const created = await LeaderboardEntry.create(payload);
                return [created.toObject()];
            },
        },
        {
            path: '/api/workouts/',
            resource: 'workouts',
            load: async () => {
                await connectToDatabase();
                return (await Workout.find()).map((item) => item.toObject());
            },
            create: async (payload) => {
                await connectToDatabase();
                const created = await Workout.create(payload);
                return [created.toObject()];
            },
        },
    ];
    resources.forEach(({ path, resource, load, create }) => {
        app.get(path, async (_req, res) => {
            try {
                const data = await load();
                res.json(buildPayload(resource, data));
            }
            catch (error) {
                res.status(500).json({ error: `Unable to load ${resource}` });
            }
        });
        app.post(path, async (req, res) => {
            try {
                const payload = req.body || {};
                const data = await create(payload);
                res.status(201).json(buildPayload(resource, data));
            }
            catch (error) {
                res.status(500).json({ error: `Unable to create ${resource}` });
            }
        });
    });
    return app;
}
