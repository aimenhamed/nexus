import { db } from "../modules/db";
import { teams } from "../modules/db/schema";
import { logger } from "../modules/logger";
import { NewTeam } from "../types/teams";

export default class TeamService {
  async getTeams(query: { services?: string }) {
    let options = {};
    if (query.services === "true") {
      options = {
        with: {
          services: true,
        },
      };
    }
    const teamsRes = await db.query.teams.findMany(options);
    logger.info(
      `Found ${teamsRes.length} teams` +
        `${query.services === "true" ? " with services." : "."}`
    );
    return teamsRes;
  }

  async addTeam(newTeam: NewTeam) {
    const results = await db
      .insert(teams)
      .values(newTeam)
      .returning({ insertedId: teams.id });
    const team = results[0];
    logger.info(
      `Created ${newTeam.name} team with id ${team.insertedId} successfully.`
    );
    return team;
  }
}
