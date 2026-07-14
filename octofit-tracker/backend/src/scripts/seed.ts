import { connectToDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.create([
      {
        name: 'North Stars',
        sport: 'Cycling',
        description: 'A team focused on endurance rides and weekend challenges.',
      },
      {
        name: 'River Runners',
        sport: 'Running',
        description: 'A community of early-morning runners preparing for 10K events.',
      },
    ]);

    const users = await User.create([
      {
        username: 'maya',
        email: 'maya@example.com',
        fullName: 'Maya Chen',
        fitnessGoal: 'Improve cardio endurance',
        teamId: teams[0]._id,
      },
      {
        username: 'liam',
        email: 'liam@example.com',
        fullName: 'Liam Ortiz',
        fitnessGoal: 'Train for a half marathon',
        teamId: teams[1]._id,
      },
      {
        username: 'sofia',
        email: 'sofia@example.com',
        fullName: 'Sofia Alvarez',
        fitnessGoal: 'Build strength and mobility',
        teamId: teams[0]._id,
      },
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'Cycling',
        durationMinutes: 45,
        distanceKm: 18,
        caloriesBurned: 420,
        date: new Date('2026-07-10T06:30:00.000Z'),
      },
      {
        userId: users[1]._id,
        type: 'Running',
        durationMinutes: 35,
        distanceKm: 7.5,
        caloriesBurned: 320,
        date: new Date('2026-07-11T07:00:00.000Z'),
      },
      {
        userId: users[2]._id,
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 280,
        date: new Date('2026-07-12T18:00:00.000Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, points: 980, rank: 1 },
      { userId: users[1]._id, points: 915, rank: 2 },
      { userId: users[2]._id, points: 890, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Tempo Ride',
        focus: 'Endurance',
        durationMinutes: 40,
        difficulty: 'Intermediate',
        equipment: ['Bike', 'Heart rate monitor'],
      },
      {
        title: 'Hill Intervals',
        focus: 'Speed',
        durationMinutes: 30,
        difficulty: 'Advanced',
        equipment: ['Running shoes', 'Watch'],
      },
      {
        title: 'Core Flow',
        focus: 'Mobility',
        durationMinutes: 20,
        difficulty: 'Beginner',
        equipment: ['Yoga mat'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
