import { db } from "../modules/db";
import { services } from "../modules/db/schema";
import { logger } from "../modules/logger";
import { NewService } from "../types/services";
import { NotFoundError } from "elysia";

export default class ServiceService {
  async getServices() {
    const results = await db.query.services.findMany();
    logger.info(`Found ${results.length} services.`);
    return results;
  }

  async getServicesByTeam(teamId: string) {
    const teamWithServices = await db.query.teams.findFirst({
      with: {
        services: true,
      },
      where: (teams, { eq }) => eq(teams.id, teamId),
    });

    if (!teamWithServices) {
      logger.error(`No team with id ${teamId} found.`);
      throw new NotFoundError();
    }

    logger.info(
      `Team ${teamWithServices.name} with id ${teamId} found with ${teamWithServices.services.length} found.`
    );

    return teamWithServices;
  }

  async addService(newService: NewService) {
    const results = await db
      .insert(services)
      .values(newService)
      .returning({ insertedId: services.id });
    const service = results[0];
    logger.info(
      `Created ${newService.name} service with id ${service.insertedId} successfully.`
    );
    return service;
  }
}
