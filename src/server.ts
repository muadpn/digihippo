import express from "express";
// const express = require('express')
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webhook";
import nextBuild from "next/dist/build";
import path from "path";
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

export type WebhookRequest = IncomingMessage & { rawBody: Buffer };

const start = async () => {
  const webhookMiddleWare = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });
  app.post("/api/webhooks/stripe", webhookMiddleWare, stripeWebhookHandler);

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async() => {

      payload.logger.info("Next.js is building for production");

      //@ts-ignore
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });
    return;
  }

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info(`Nextjs Started`);
    app.listen(PORT, async () => {
      payload.logger.info(
        `Nextjs App URL :${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};
start();