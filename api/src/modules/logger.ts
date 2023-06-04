import pino from "pino";
import { DateTime } from "luxon";

export const logger = pino({
  redact: ["DB_CONN"],
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  base: undefined,
  level: "debug",
  timestamp() {
    return `,"timestamp":"${DateTime.now()
      .setZone("Australia/Sydney", {
        keepLocalTime: true,
      })
      .toFormat("FF")}"`;
  },
});
