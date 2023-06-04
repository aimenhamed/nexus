import Elysia, { t } from "elysia";
import TeamService from "../services/team-service";
import { Controller } from "../types/controller";
import { logger } from "../modules/logger";

export default class TeamController implements Controller {
  constructor(private readonly teamService: TeamService) {}
  getPrefix() {
    return "/api/v1/teams";
  }

  getGroup() {
    return (app: Elysia) =>
      app
        .get(
          "",
          async ({ query }) => {
            try {
              logger.info(
                `Received request for GET ${this.getPrefix()}` +
                  `${query.services === "true" ? "?services" : ""}`
              );
              return await this.teamService.getTeams(query);
            } catch (err) {
              logger.error(
                `An error occurred in GET ${this.getPrefix()}` + `${query.services === "true" ? "?services" : ""}`+`: ${err}`
              );
              throw err;
            }
          },
          {
            query: t.Object({ services: t.Optional(t.String()) }),
          }
        )
        .post(
          "",
          async ({ body }) => {
            try {
              logger.info(`Received request for POST ${this.getPrefix()}`);
              return await this.teamService.addTeam(body);
            } catch (err) {
              logger.error(
                `An error occurred in POST ${this.getPrefix()}: ${err}`
              );
              throw err;
            }
          },
          {
            body: t.Object({
              name: t.String(),
              manager: t.String(),
            }),
          }
        );
  }
}
