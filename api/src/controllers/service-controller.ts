import Elysia, { t } from "elysia";
import ServiceService from "../services/service-service";
import { Controller } from "../types/controller";
import { logger } from "../modules/logger";

export default class ServiceController implements Controller {
  constructor(private readonly serviceService: ServiceService) {}
  getPrefix() {
    return "/api/v1/services";
  }

  getGroup() {
    return (app: Elysia) =>
      app
        .get("", async () => {
          try {
            logger.info(`Received request for GET ${this.getPrefix()}`);
            return await this.serviceService.getServices();
          } catch (err) {
            logger.error(
              `An error occurred in GET ${this.getPrefix()}: ${err}`
            );
            throw err;
          }
        })
        .get(
          "/team/:teamId",
          async ({ params }) => {
            try {
              logger.info(
                `Received request for GET ${this.getPrefix()}/team/${
                  params.teamId
                }`
              );
              return await this.serviceService.getServicesByTeam(params.teamId);
            } catch (err) {
              logger.error(
                `An error occurred in GET ${this.getPrefix()}/team/${
                  params.teamId
                }: ${err}`
              );
              throw err;
            }
          },
          {
            params: t.Object({
              teamId: t.String(),
            }),
          }
        )
        .post(
          "",
          async ({ body }) => {
            try {
              logger.info(`Received request for POST ${this.getPrefix()}`);
              return await this.serviceService.addService(body);
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
              owner: t.Optional(t.String()),
            }),
          }
        );
  }
}
